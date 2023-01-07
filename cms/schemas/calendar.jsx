export default {
    name: 'calendar',
    type: 'document',
    title: 'Calendar',
    fields: [
      {
        title: 'Title',
        name: 'title',
        type: 'string' 
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
        title: 'End Date & Time',
        name: 'endDateTime',
        type: 'datetime',
        options: {
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'HH:mm',
            timeStep: 15,
            calendarTodayLabel: 'Today'
          } 
      },      
      {
        title: 'Contact',
        name: 'contact',
        type: 'string',
        description: 'name or email'
      },
      {
        title: 'Link to a website',
        name: 'url',
        type: 'url',
        description: "This is optional. You can leave it blank."
      },
      {
        title: 'Description',
        name: 'description',
        type: 'text',        
        description: "This is optional. You can leave it blank."
      },         
         

    ],
    
  }  