import React from "react"
import ChapterMenu from "@/components/beliefs/ChapterMenu"
import { getChapterNumbers } from "@/lib/confession"

// Prerendered at build time; refetched at most hourly so Sanity edits appear without a
// redeploy.
export const revalidate = 3600

export const metadata = {
  title: "The 1689 Baptist Confession of Faith | GCBC",
  description:
    "The 1689 London Baptist Confession of Faith, in both the original and a modern rendering, with scripture proofs.",
  alternates: { canonical: "/beliefs" },
}

export default async function BeliefsPage() {
  const chapterNumbers = await getChapterNumbers()

  return <ChapterMenu chapterNumbers={chapterNumbers} />
}
