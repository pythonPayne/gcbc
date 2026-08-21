import React from "react"
import { notFound } from "next/navigation"
import ChapterView from "@/components/beliefs/ChapterView"
import {
  getChapterNodes,
  getChapterNumbers,
  groupIntoParagraphs,
  chapterTitle,
} from "@/lib/confession"

export const revalidate = 3600
// Chapters are a fixed set; anything outside it is a 404 rather than a runtime render.
export const dynamicParams = false

export async function generateStaticParams() {
  const chapters = await getChapterNumbers()
  return chapters.map((chapter) => ({ chapter: String(chapter) }))
}

export async function generateMetadata({ params }) {
  const { chapter } = await params
  const chapterNum = Number(chapter)
  const title = chapterTitle(chapterNum)
  if (!title) return {}

  return {
    title: `Chapter ${chapterNum}. ${title} | 1689 Confession | GCBC`,
    description: `Chapter ${chapterNum} of the 1689 Baptist Confession of Faith: ${title}.`,
    alternates: { canonical: `/beliefs/${chapterNum}` },
  }
}

export default async function ChapterPage({ params }) {
  const { chapter } = await params
  const chapterNum = Number(chapter)
  if (!Number.isInteger(chapterNum)) notFound()

  const [nodes, chapters] = await Promise.all([
    getChapterNodes(chapterNum),
    getChapterNumbers(),
  ])
  if (nodes.length === 0) notFound()

  return (
    <ChapterView
      chapter={chapterNum}
      groups={groupIntoParagraphs(nodes)}
      totalChapters={Math.max(...chapters)}
    />
  )
}
