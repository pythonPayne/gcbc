export default {
  name: 'confession',
  type: 'document',
	title: '1689 LB Confession',
  fields: [
    // chapter, paragraph and referenceNum are what order the text on the site
    // (see frontend-v2/lib/confession.js) -- a document missing any of them renders
    // in the wrong place, so they are required rather than optional.
    {
      title: 'Chapter',
      name: 'chapter',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
    },
    {
      title: 'Paragraph',
      name: 'paragraph',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
    },
    {
      title: 'Reference Number',
      name: 'referenceNum',
      type: 'number',
      description:
        'Position of this segment within the chapter, counting from 1. Numbering runs across the whole chapter, not per paragraph, and is shown as the superscript next to the text. Use 99 for a segment with no scripture reference.',
      validation: (Rule) => Rule.required().integer().min(1),
    },
    {
      title: 'Paragraph Reference Text Modern',
      name: 'paragraphTextModern',
      type: 'text' 
    },    
    {
      title: 'Paragraph Reference Text Original',
      name: 'paragraphTextOriginal',
      type: 'text' 
    },        
    {
      title: 'Paragraph Ref',
      name: 'paragraphRef',
      type: 'array',
      of: [{type: 'string'}]
    },        
    
  ],
  preview: {
    select: {
      chapter: 'chapter',
      paragraph: 'paragraph',
      referenceNum: 'referenceNum',
      paragraphTextOriginal: 'paragraphTextOriginal'
    },
    prepare(selection) {
      const {chapter, paragraph, referenceNum, paragraphTextOriginal} = selection
      return {
        title: `${chapter}.${paragraph}.${referenceNum}`,
        subtitle: `${paragraphTextOriginal}`,        
        media: <span style={{}}></span>
      }
    }
  }
}  
  

