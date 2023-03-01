export default {
  name: 'confession',
  type: 'document',
	title: '1689 LB Confession',
  fields: [
    {
      title: 'Chapter',
      name: 'chapter',
      type: 'number' 
    },
    {
      title: 'Paragraph',
      name: 'paragraph',
      type: 'number' 
    },
    {
      title: 'Reference Number',
      name: 'referenceNum',
      type: 'number' 
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
  

