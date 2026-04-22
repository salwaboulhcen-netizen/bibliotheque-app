const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    
    image:
      "https://covers.openlibrary.org/b/id/8108691-L.jpg",
    genre: "informatique",
    available: true,
  },
  {
    id: 2,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    image:
      "https://covers.openlibrary.org/b/id/5546156-L.jpg",
    genre: "informatique",
    available: false,
  },
  {
    id: 3,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    image:
      "https://covers.openlibrary.org/b/id/10523334-L.jpg",
    genre: "informatique",
    available: true,
  },
  {
    id: 4,
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    image:
      "https://eloquentjavascript.net/img/cover.jpg",
    genre: "informatique",
    available: true,
  },
  {
    id: 5,
    title: "React Up & Running",
    author: "Stoyan Stefanov",
    image:
      "https://covers.openlibrary.org/b/id/10594725-L.jpg",
    genre: "informatique",
    available: false,
  },
  {
    id: 6,
    title: "HTML & CSS Design",
    author: "Jon Duckett",
    image:
      "https://covers.openlibrary.org/b/id/8231996-L.jpg",
    genre: "informatique",
    available: true,
  },
  {
    id: 7,
    title: "Python Crash Course",
    author: "Eric Matthes",
    image:
      "https://covers.openlibrary.org/b/id/10527858-L.jpg",
    genre: "informatique",
    available: true,
  },
  {
    id: 8,
    title: "Design Patterns",
    author: "Erich Gamma",
    image:
      "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    genre: "informatique",
    available: true,
  },
  {
    id: 9,
    title: "Refactoring",
    author: "Martin Fowler",
    image:
      "https://covers.openlibrary.org/b/id/8226191-L.jpg",
    genre: "informatique",
    available: false,
  },
  {
    id: 10,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    image:
      "https://covers.openlibrary.org/b/id/8099256-L.jpg",
    genre: "informatique",
    available: true,
  },

  {
    id: 11,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image:
      "https://covers.openlibrary.org/b/id/8370226-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 12,
    title: "A People's History",
    author: "Howard Zinn",
    image:
      "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    genre: "histoire",
    available: false,
  },

  {
    id: 13,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 14,
    title: "Cosmos",
    author: "Carl Sagan",
    image:
      "https://covers.openlibrary.org/b/id/8231990-L.jpg",
    genre: "science",
    available: true,
  },

  {
    id: 15,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 16,
    title: "Madame Bovary",
    author: "Gustave Flaubert",
    image:
      "https://covers.openlibrary.org/b/id/8225266-L.jpg",
    genre: "littérature",
    available: true,
  },

  {
    id: 17,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image:
      "https://covers.openlibrary.org/b/id/10545133-L.jpg",
    genre: "economie",
    available: true,
  },
  {
    id: 18,
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    image:
      "https://covers.openlibrary.org/b/id/8231857-L.jpg",
    genre: "economie",
    available: false,
  },

  {
    id: 19,
    title: "Harry Potter",
    author: "J.K. Rowling",
    image:
      "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    genre: "fiction",
    available: true,
  },
  {
    id: 20,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image:
      "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    genre: "fiction",
    available: true,
  },

    {
    id: 21,
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://covers.openlibrary.org/b/id/10594765-L.jpg",
    genre: "economie",
    available: true,
  },
  {
    id: 22,
    title: "Deep Work",
    author: "Cal Newport",
    image: "https://covers.openlibrary.org/b/id/8377896-L.jpg",
    genre: "economie",
    available: true,
  },
  {
    id: 23,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    image: "https://covers.openlibrary.org/b/id/7222276-L.jpg",
    genre: "economie",
    available: false,
  },
  {
    id: 24,
    title: "Zero to One",
    author: "Peter Thiel",
    image: "https://covers.openlibrary.org/b/id/10594780-L.jpg",
    genre: "economie",
    available: true,
  },
  {
    id: 25,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://covers.openlibrary.org/b/id/8108699-L.jpg",
    genre: "fiction",
    available: true,
  },
  {
    id: 26,
    title: "1984",
    author: "George Orwell",
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    genre: "fiction",
    available: false,
  },
  {
    id: 27,
    title: "Brave New World",
    author: "Aldous Huxley",
    image: "https://covers.openlibrary.org/b/id/8775111-L.jpg",
    genre: "fiction",
    available: true,
  },
  {
    id: 28,
    title: "Animal Farm",
    author: "George Orwell",
    image: "https://covers.openlibrary.org/b/id/7222247-L.jpg",
    genre: "fiction",
    available: true,
  },
  {
    id: 29,
    title: "World War II History",
    author: "Unknown",
    image: "https://covers.openlibrary.org/b/id/8231995-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 30,
    title: "Ancient Egypt",
    author: "Historian Author",
    image: "https://covers.openlibrary.org/b/id/8231996-L.jpg",
    genre: "histoire",
    available: false,
  },
  {
    id: 31,
    title: "Islamic Civilization",
    author: "Scholar",
    image: "https://covers.openlibrary.org/b/id/8231997-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 32,
    title: "Modern Physics",
    author: "Science Author",
    image: "https://covers.openlibrary.org/b/id/240727-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 33,
    title: "Quantum Mechanics",
    author: "Physics Author",
    image: "https://covers.openlibrary.org/b/id/240728-L.jpg",
    genre: "science",
    available: false,
  },
  {
    id: 34,
    title: "Biology Basics",
    author: "Dr. Smith",
    image: "https://covers.openlibrary.org/b/id/240729-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 35,
    title: "French Literature Classics",
    author: "Various",
    image: "https://covers.openlibrary.org/b/id/8225267-L.jpg",
    genre: "littérature",
    available: true,
  },
  {
    id: 36,
    title: "Shakespeare Works",
    author: "William Shakespeare",
    image: "https://covers.openlibrary.org/b/id/8230001-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 37,
    title: "Web Development Guide",
    author: "Dev Author",
    image: "https://covers.openlibrary.org/b/id/10594790-L.jpg",
    genre: "informatique",
    available: true,
  },
  {
    id: 38,
    title: "Advanced JavaScript",
    author: "JS Expert",
    image: "https://covers.openlibrary.org/b/id/10594791-L.jpg",
    genre: "informatique",
    available: true,
  },
  {
    id: 39,
    title: "System Design Basics",
    author: "Tech Author",
    image: "https://covers.openlibrary.org/b/id/10594792-L.jpg",
    genre: "informatique",
    available: false,
  },
  {
    id: 40,
    title: "Clean Architecture",
    author: "Robert C. Martin",
    image: "https://covers.openlibrary.org/b/id/10594793-L.jpg",
    genre: "informatique",
    available: true,
  },
  {
    id: 41,
    title: "Madame Bovary",
    author: "Gustave Flaubert",
    image:
      "https://covers.openlibrary.org/b/id/8225266-L.jpg",
    genre: "littérature",
    available: true,
  },
  {
    id: 42,
    title: "Madame Bovary",
    author: "Gustave Flaubert",
    image:
      "https://covers.openlibrary.org/b/id/8225266-L.jpg",
    genre: "littérature",
    available: true,
  },
  {
    id: 43,
    title: "Madame Bovary",
    author: "Gustave Flaubert",
    image:
      "https://covers.openlibrary.org/b/id/8225266-L.jpg",
    genre: "littérature",
    available: true,
  },
  {
    id: 44,
    title: "Madame Bovary",
    author: "Gustave Flaubert",
    image:
      "https://covers.openlibrary.org/b/id/8225266-L.jpg",
    genre: "littérature",
    available: true,
  },
  {
    id: 45,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image:
      "https://covers.openlibrary.org/b/id/8370226-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 46,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image:
      "https://covers.openlibrary.org/b/id/8370226-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 47,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image:
      "https://covers.openlibrary.org/b/id/8370226-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 48,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image:
      "https://covers.openlibrary.org/b/id/8370226-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 49,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image:
      "https://covers.openlibrary.org/b/id/8370226-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 50,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image:
      "https://covers.openlibrary.org/b/id/8370226-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 51,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image:
      "https://covers.openlibrary.org/b/id/8370226-L.jpg",
    genre: "histoire",
    available: true,
  },
  {
    id: 52,
    title: "Harry Potter",
    author: "J.K. Rowling",
    image:
      "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    genre: "fiction",
    available: true,
  },
  {
    id: 53,
    title: "Harry Potter",
    author: "J.K. Rowling",
    image:
      "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    genre: "fiction",
    available: true,
  },

  {
    id: 54,
    title: "Harry Potter",
    author: "J.K. Rowling",
    image:
      "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    genre: "fiction",
    available: true,
  },
  
  {
    id: 55,
    title: "Harry Potter",
    author: "J.K. Rowling",
    image:
      "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    genre: "fiction",
    available: true,
  },
  {
    id: 56,
    title: "Harry Potter",
    author: "J.K. Rowling",
    image:
      "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    genre: "fiction",
    available: true,
  },
  {
    id: 57,
    title: "Harry Potter",
    author: "J.K. Rowling",
    image:
      "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    genre: "fiction",
    available: true,
  },
  {
    id: 58,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 59,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 60,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 61,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 62,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 63,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 64,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 65,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 66,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    image:
      "https://covers.openlibrary.org/b/id/240726-L.jpg",
    genre: "science",
    available: true,
  },
  {
    id: 67,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 68,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 69,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 70,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 71,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 72,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 73,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 74,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
  {
    id: 75,
    title: "Les Misérables",
    author: "Victor Hugo",
    image:
      "https://covers.openlibrary.org/b/id/8406781-L.jpg",
    genre: "littérature",
    available: false,
  },
];

export default books;