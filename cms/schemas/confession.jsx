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
      title: 'Paragraph Reference Text',
      name: 'paragraphText',
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
      paragraphText: 'paragraphText'
    },
    prepare(selection) {
      const {chapter, paragraph, referenceNum, paragraphText} = selection
      return {
        title: `${chapter}.${paragraph}.${referenceNum}`,
        subtitle: `${paragraphText}`,        
        media: <span style={{}}></span>
      }
    }
  }
}  
  

