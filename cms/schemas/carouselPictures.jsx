export default {
    title: 'Carousel Pictures',
    name: 'carouselPictures',
    type: 'document',    
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Text Displayed Over Picture',        
      },            
      {
        name: 'page',
        type: 'string',
        title: 'Page to Link to',        
        options: {
            list: [
              {title: 'Livestream', value: 'livestream'},
              {title: 'Current Sermon Series', value: 'sermons'},
              {title: "Current Men's and Women's Studies", value: 'book-studies'},
              {title: "Outreach/Missions Page", value: 'outreach'},              
            ]
        }   
      },      
      {
        name: 'pic',
        type: 'image',
        title: 'Picture',        
      },
      {
        name: 'sortOrder',
        type: 'number',
        title: 'Sort Order',   
        description: 'Lowest number will be shown first when page loads.'     
      },                  
      
    ] 
  }  
    
  
  