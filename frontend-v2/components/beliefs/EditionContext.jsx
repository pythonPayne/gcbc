'use client'
import React, { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react"

const STORAGE_KEY = "gcbc-confession-edition"
const ORIGINAL = "paragraphTextOriginal"
const MODERN = "paragraphTextModern"

// The Original/Modern choice deliberately stays out of the URL, so it lives in
// localStorage instead. The provider sits in app/beliefs/layout.jsx, which does not
// remount when navigating between chapters, and localStorage carries the choice across
// a full page load (someone opening a deep link in a new tab).
//
// localStorage is an external store, so it is read through useSyncExternalStore rather
// than copied into state in an effect: that keeps the server render and hydration
// consistent (both start at ORIGINAL) without a cascading re-render.

const listeners = new Set()
// Fallback for private browsing, where writes to localStorage throw.
let memoryValue = null

const emit = () => listeners.forEach((listener) => listener())

function subscribe(listener) {
  listeners.add(listener)
  // Keep two tabs of the confession in step.
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function getSnapshot() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === ORIGINAL || stored === MODERN) return stored
  } catch {
    // fall through to the in-memory value
  }
  return memoryValue ?? ORIGINAL
}

const getServerSnapshot = () => ORIGINAL

const EditionContext = createContext(null)

export function EditionProvider({ children }) {
  const edition = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setEdition = useCallback((next) => {
    memoryValue = next
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage disabled -- the choice still applies for this visit
    }
    emit()
  }, [])

  const value = useMemo(() => ({ edition, setEdition }), [edition, setEdition])

  return <EditionContext.Provider value={value}>{children}</EditionContext.Provider>
}

export function useEdition() {
  const context = useContext(EditionContext)
  if (!context) throw new Error("useEdition must be used inside an EditionProvider")
  return context
}

export { ORIGINAL, MODERN }
