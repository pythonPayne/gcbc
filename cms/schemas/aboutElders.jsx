export default {
    title: 'About Elders',
    name: 'aboutElders',
    type: 'document',    
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',     
        options: {
            list: [
              {title: 'Todd Wilson', value: 'Todd Wilson'},
              {title: 'Stephen Hyde', value: 'Stephen Hyde'},              
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
    
  
  