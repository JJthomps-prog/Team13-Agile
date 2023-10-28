const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('homepage');
});

app.get('/categories/events', (req, res) => {
  const eventData = [
    { title: 'Event Title 1', date: 'January 1, 2024', time: '6:00 PM - 9:00 PM', location: 'Venue ABC', description: 'Lorem ipsum...' },
    { title: 'Event Title 2', date: 'February 15, 2024', time: '2:00 PM - 5:00 PM', location: 'Venue XYZ', description: 'Duis aute...' },
  ];

  res.render('events', { events: eventData });
});

app.get('/latest-topic', (req, res) => {
  const topicsData = [
    { title: 'Topic Title 1', author: 'John Doe', replies: 5, content: 'That sounds like a fun event to attend!' },
    { title: 'Topic Title 2', author: 'Jane Smith', replies: 8, content: 'I tried the new restaurant last week, and it was fantastic!' },
    // Add more topics here
  ];

  res.render('latest-topic', { topics: topicsData });
});

app.get('/latest-topic/popular-topics', (req, res) => {
  // Fetch and render popular topics here
});

app.get('/categories/posts', (req, res) => {
    res.render('posts')
  });

  app.get('/categories/landmarks', (req, res) => {
    res.render('landmarks')
  });

  app.get('/login', (req, res) => {
    res.render('login')
  });

  app.get('/register', (req, res) => {
    res.render('register')
  });
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
