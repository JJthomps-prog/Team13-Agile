const express = require('express');
const router = express.Router();
const allData = require('../data/alldata');

router.get('/', (req, res) => {
    res.render('homepage');
  });

router.get('/categories/events',  async (req, res) => {
  const eventData = await allData.getEvent();
  res.render('events', { eventData });
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
router.get('/login', async (req, res) => {
  // await allData.createNews('asdasdasd','asdasdasdasd','Hoboken');
  // res.render('login');
  data = await allData.getEvent(asdasd)
  console.log(data)
  res.render('events')
});

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/jobs/createJob', (req, res) => {
  allData.createJob('SDE','Hoboken','80000','full stack','1 yr experience', 'full time', 'open');
  res.render('jobs');
});
 router

module.exports = router;
