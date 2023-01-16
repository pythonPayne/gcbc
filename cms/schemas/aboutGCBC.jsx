export default {
    title: 'About GCBC',
    name: 'aboutGCBC',
    type: 'document',    
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',     
        options: {
            list: [
              {title: 'Grace', value: 'Grace'},
              {title: 'Covenant', value: 'Covenant'},
              {title: 'Baptist', value: 'Baptist'},
              {title: 'Church', value: 'Church'},              
            ]
        }   
      },
      {
        name: 'pic',
        type: 'image',
        title: 'Picture',        
      },
      {
        name: 'displayText',
        type: 'text',
        title: 'Display Text',        
      },                  
      
    ] 
  }  
    
  
  