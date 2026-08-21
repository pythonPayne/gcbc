import { client } from '@/lib/sanity'

export const chapterTitles = [
  "The Holy Scriptures",
  "God and the Holy Trinity",
  "God's Decree",
  "Creation",
  "Divine Providence",
  "The Fall of Mankind, and Sin and Its Punishment",
  "God's Covenant",
  "Christ the Mediator",
  "Free Will",
  "Effectual Calling",
  "Justification",
  "Adoption",
  "Sanctification",
  "Saving Faith",
  "Repentance to Life and Salvation",
  "Good Works",
  "The Perseverance of the Saints",
  "Assurance of Grace and Salvation",
  "The Law of God",
  "The Gospel and the Extent of Its Grace",
  "Christian Liberty and Liberty of Conscience",
  "Religious Worship and the Sabbath Day",
  "Lawful Oaths and Vows",
  "Civil Government",
  "Marriage",
  "The Church",
  "The Communion of Saints",
  "Baptism and the Lord's Supper",
  "Baptism",
  "The Lord's Supper",
  "The State of Humanity after Death and the Resurrection of the Dead",
  "The Last Judgment",
]

export const chapterTitle = (chapter) => chapterTitles[chapter - 1]

const FIELDS = `_id, chapter, paragraph, referenceNum,
  paragraphTextModern, paragraphTextOriginal, paragraphRef`

// Ordering is load-bearing: it is the reading order of the text, and there is no other
// field that encodes it.
//
// referenceNum runs 1..n across a whole chapter rather than per paragraph, and the 99
// sentinel means "segment with no reference" -- verified across all 508 documents to be
// unique within its paragraph and always the trailing segment, and the largest real
// value is 46, so 99 always sorts last where it belongs.
//
// This previously ordered by `_id asc`, which worked only because the seed import
// created documents sequentially with time-ordered UUIDs. A document added through the
// Studio gets a random UUID that sorts arbitrarily, which put new text at the end of its
// paragraph -- or, if the id sorted low, moved the whole paragraph to the top of the
// chapter. Ordering by the semantic fields is equivalent on today's data and survives
// new documents. `_id` remains as a deterministic tiebreak.
const ORDER = `order(chapter asc, paragraph asc, referenceNum asc, _id asc)`

export async function getChapterNodes(chapter) {
  return client.fetch(
    `*[_type == "confession" && chapter == $chapter] | ${ORDER} { ${FIELDS} }`,
    { chapter }
  )
}

export async function getAllNodes() {
  return client.fetch(`*[_type == "confession"] | ${ORDER} { ${FIELDS} }`)
}

export async function getChapterNumbers() {
  const chapters = await client.fetch(
    `array::unique(*[_type == "confession"].chapter) | order(@ asc)`
  )
  return chapters.filter((n) => typeof n === 'number')
}

export async function getChapterParagraphPairs() {
  const pairs = await client.fetch(
    `*[_type == "confession"] { chapter, paragraph }`
  )
  const seen = new Set()
  const unique = []
  for (const { chapter, paragraph } of pairs) {
    const key = `${chapter}-${paragraph}`
    if (!seen.has(key)) {
      seen.add(key)
      unique.push({ chapter, paragraph })
    }
  }
  return unique.sort((a, b) => a.chapter - b.chapter || a.paragraph - b.paragraph)
}

// Collapse the flat node list into [{ chapter, paragraph, nodes }], preserving
// the incoming order.
export function groupIntoParagraphs(nodes) {
  const groups = []
  const index = new Map()
  for (const node of nodes) {
    const key = `${node.chapter}-${node.paragraph}`
    if (!index.has(key)) {
      index.set(key, groups.length)
      groups.push({ chapter: node.chapter, paragraph: node.paragraph, nodes: [] })
    }
    groups[index.get(key)].nodes.push(node)
  }
  return groups
}

export const paragraphHref = (chapter, paragraph) => `/beliefs/${chapter}/${paragraph}`
export const chapterHref = (chapter) => `/beliefs/${chapter}`
export const paragraphAnchor = (chapter, paragraph) => `p-${chapter}-${paragraph}`
