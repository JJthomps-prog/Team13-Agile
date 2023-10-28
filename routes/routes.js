const express = require('express');
const router = express.Router();
const allData = require('../data/alldata');

router.get('/', (req, res) => {
    res.render('homepage');
  });

router.get('/categories/events', (req, res) => {
  const eventData = [
    { title: 'Event Title 1', date: 'January 1, 2024', time: '6:00 PM - 9:00 PM', location: 'Venue ABC', description: 'Lorem ipsum...' },
    { title: 'Event Title 2', date: 'February 15, 2024', time: '2:00 PM - 5:00 PM', location: 'Venue XYZ', description: 'Duis aute...' },
  ];

  res.render('events', { events: eventData });
});

router.get('/latest-topic', (req, res) => {
  const topicsData = [
    { title: 'Topic Title 1', author: 'John Doe', replies: 5, content: 'That sounds like a fun event to attend!' },
    { title: 'Topic Title 2', author: 'Jane Smith', replies: 8, content: 'I tried the new restaurant last week, and it was fantastic!' },
    // Add more topics here
  ];

  res.render('latest-topic', { topics: topicsData });
});

router.get('/latest-topic/popular-topics', (req, res) => {
  // Fetch and render popular topics here
});

router.get('/categories/posts', (req, res) => {
  res.render('posts');
});

router.get('/categories/landmarks', (req, res) => {
  res.render('landmarks');
});

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;
