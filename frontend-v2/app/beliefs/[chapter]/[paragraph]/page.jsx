import React from "react"
import { notFound } from "next/navigation"
import ChapterView from "@/components/beliefs/ChapterView"
import {
  getChapterNodes,
  getChapterNumbers,
  getChapterParagraphPairs,
  groupIntoParagraphs,
  chapterTitle,
} from "@/lib/confession"

export const revalidate = 3600
export const dynamicParams = false

export async function generateStaticParams() {
  const pairs = await getChapterParagraphPairs()
  return pairs.map(({ chapter, paragraph }) => ({
    chapter: String(chapter),
    paragraph: String(paragraph),
  }))
}

export async function generateMetadata({ params }) {
  const { chapter, paragraph } = await params
  const chapterNum = Number(chapter)
  const paragraphNum = Number(paragraph)
  const title = chapterTitle(chapterNum)
  if (!title) return {}

  return {
    title: `${chapterNum}.${paragraphNum} ${title} | 1689 Confession | GCBC`,
    description: `Paragraph ${chapterNum}.${paragraphNum} of the 1689 Baptist Confession of Faith, from chapter ${chapterNum}: ${title}.`,
    alternates: { canonical: `/beliefs/${chapterNum}/${paragraphNum}` },
  }
}

// Renders the whole chapter, then scrolls to and highlights the requested paragraph --
// a paragraph is not readable stripped of its chapter.
export default async function ParagraphPage({ params }) {
  const { chapter, paragraph } = await params
  const chapterNum = Number(chapter)
  const paragraphNum = Number(paragraph)
  if (!Number.isInteger(chapterNum) || !Number.isInteger(paragraphNum)) notFound()

  const [nodes, chapters] = await Promise.all([
    getChapterNodes(chapterNum),
    getChapterNumbers(),
  ])
  if (nodes.length === 0) notFound()

  const groups = groupIntoParagraphs(nodes)
  if (!groups.some((group) => group.paragraph === paragraphNum)) notFound()

  return (
    <ChapterView
      chapter={chapterNum}
      groups={groups}
      totalChapters={Math.max(...chapters)}
      targetParagraph={paragraphNum}
    />
  )
}
