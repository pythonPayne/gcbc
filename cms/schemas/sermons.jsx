export default {
  name: 'sermons',
  type: 'document',
	title: 'Sermons',
  fields: [
    {
      title: 'Date',
      name: 'date',
      type: 'date' 
    },
    {
      title: 'Speaker',
      name: 'speaker',
      type: 'string',
      options: {
        list: [
          {title: 'Todd Wilson', value: 'Todd Wilson'},
          {title: 'Stephen Hyde', value: 'Stephen Hyde'},
          {title: 'Stephen Payne', value: 'Stephen Payne'},
          {title: 'Steve Cowan', value: 'Steve Cowan'}

        ],         
      }
    },
    {
      title: 'Book',
      name: 'book',
      type: 'string',
      options: {
        list: [
          {title: 'Genesis', value: 'Genesis'},
          {title: 'Exodus', value: 'Exodus'},
          {title: 'Leviticus', value: 'Leviticus'},
          {title: 'Numbers', value: 'Numbers'},
          {title: 'Deuteronomy', value: 'Deuteronomy'},
          {title: 'Joshua', value: 'Joshua'},
          {title: 'Judges', value: 'Judges'},
          {title: 'Ruth', value: 'Ruth'},
          {title: '1 Samuel', value: '1 Samuel'},
          {title: '2 Samuel', value: '2 Samuel'},
          {title: '1 Kings', value: '1 Kings'},
          {title: '2 Kings', value: '2 Kings'},
          {title: '1 Chronicles', value: '1 Chronciles'},
          {title: '2 Chronicles', value: '2 Chronicles'},
          {title: 'Ezra', value: 'Ezra'},
          {title: 'Nehemiah', value: 'Nehemiah'},
          {title: 'Esther', value: 'Esther'},
          {title: 'Job', value: 'Job'},
          {title: 'Psalms', value: 'Psalms'},
          {title: 'Proverbs', value: 'Proverbs'},
          {title: 'Ecclesiastes', value: 'Ecclesiastes'},
          {title: 'Song of Solomon', value: 'Song of Solomon'},
          {title: 'Isaiah', value: 'Isaiah'},
          {title: 'Jeremiah', value: 'Jeremiah'},
          {title: 'Lamentations', value: 'Lamentations'},
          {title: 'Ezekiel', value: 'Ezekiel'},
          {title: 'Daniel', value: 'Daniel'},
          {title: 'Hosea', value: 'Hosea'},
          {title: 'Joel', value: 'Joel'},
          {title: 'Amos', value: 'Amos'},
          {title: 'Obadiah', value: 'Obadiah'},
          {title: 'Jonah', value: 'Jonah'},
          {title: 'Micah', value: 'Micah'},
          {title: 'Nahum', value: 'Nahum'},
          {title: 'Habakkuk', value: 'Habakkuk'},
          {title: 'Zephaniah', value: 'Zephaniah'},
          {title: 'Haggai', value: 'Haggai'},
          {title: 'Zechariah', value: 'Zechariah'},
          {title: 'Malachi', value: 'Malachia'},
          {title: 'Matthew', value: 'Matthew'},
          {title: 'Mark', value: 'Mark'},
          {title: 'Luke', value: 'Luke'},
          {title: 'John', value: 'John'},
          {title: 'Acts', value: 'Acts'},
          {title: 'Romans', value: 'Romans'},
          {title: '1 Corinthians', value: '1 Corinthians'},
          {title: '2 Corinthians', value: '2 Corinthians'},
          {title: 'Galatians', value: 'Galatians'},
          {title: 'Ephesians', value: 'Ephesians'},
          {title: 'Philippians', value: 'Philippians'},
          {title: 'Colossians', value: 'Colossians'},
          {title: '1 Thessalonians', value: '1 Thessalonians'},
          {title: '2 Thessalonians', value: '2 Thessalonians'},
          {title: '1 Timothy', value: '1 Timothy'},
          {title: '2 Timothy', value: '2 Timothy'},
          {title: 'Titus', value: 'Titus'},
          {title: 'Philemon', value: 'Philemon'},
          {title: 'Hebrews', value: 'Hebrews'},
          {title: 'James', value: 'James'},
          {title: '1 Peter', value: '1 Peter'},
          {title: '2 Peter', value: '2 Peter'},
          {title: '1 John', value: '1 John'},
          {title: '2 John', value: '2 John'},
          {title: '3 John', value: '3 John'},
          {title: 'Jude', value: 'Jude'},
          {title: 'Revelation', value: 'Revelation'}
        ],         
      }
    },    
    {
      title: 'Passage',
      name: 'passage',
      type: 'string',
      description: 'Examples: 3:16-23, 1:18-2:9'      
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string'      
    },    
    {
      title: 'Sermon Series',
      name: 'sermonSeries',
      type: 'string',      
    },    
    {
      title: 'Audio Link',
      name: 'audioLink',
      type: 'url',      
    },    
  ],
  preview: {
    select: {
      title: 'title',
      book: 'book',
      passage: 'passage',
      date: 'date'
    },
    prepare(selection) {
      const {title, book, passage, date} = selection
      return {
        title: title,
        subtitle: `${book} ${passage}`,        
        media: <span style={{}}></span>
      }
    }
  }
}
