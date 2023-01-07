export default {
    title: 'Pictures',
    name: 'pictures',
    type: 'document',    
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',        
      },
      {
        name: 'pic',
        type: 'image',
        title: 'Picture',        
      },
      {
        name: 'pageAndFunction',
        type: 'string',
        title: 'Page and Function',      
        options: {
          list: [
            {title: 'Homepage - Carousel', value: 'homepageCarousel'},            
            {title: 'GCBC - Logo', value: 'gcbcLogo'},
            {title: 'GCBC - Emblem', value: 'gcbcEmblem'},
          ],         
        }  
      },
      {
        name: 'sortOrder',
        type: 'number',
        title: 'Sort Order',
        description: "If used in array of images, is used for default ordering. Example: homepage carousel.",
      },                  
      
    ] 
  }  
    
  
  