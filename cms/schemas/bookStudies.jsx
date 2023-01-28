export default {
    title: 'Book Studies',
    name: 'bookStudies',
    type: 'document',    
    fields: [
      {
        name: 'menOrWomen',
        type: 'string',
        title: "Men's or Women's Study?",
        options: {
            list: [
              {title: "Men", value: 'men'},
              {title: "Women", value: 'women'},
            ]
        }   
      },
      {
        name: 'location',
        type: 'string',
        title: 'Meeting Location',        
      },        
      {
        title: 'Start Date & Time',
        name: 'startDateTime',
        type: 'datetime',
        options: {
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'HH:mm',
            timeStep: 15,
            calendarTodayLabel: 'Today'
          }
      },            
      {
        name: 'bookType',
        type: 'string',
        title: 'Type of Book',        
        options: {
          list: [
            {title: "Book of the Bible", value: 'bibleBook'},
            {title: "Other Book", value: 'otherBook'},            
          ]
      }           
      },
      {
        name: 'title',
        type: 'string',
        title: 'Book Title',        
      },             
      {
        name: 'author',
        type: 'string',
        title: 'Book Author',        
      },             
      {
        name: 'cover',
        type: 'image',
        title: 'Book Cover',        
      },            
      {
        name: 'linkToPurchase',
        type: 'string',
        title: 'Link to Purchase',        
      },                               
      
    ] 
  }  
    
  
  