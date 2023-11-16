const express = require("express");
const session = require('express-session');
const router = express.Router();
const allData = require("../data/alldata");
router.use(session({
  secret: 'Team13',
  resave: false,
  saveUninitialized: true,
}));
router.get("/backendtest",async (req,res)=>{
  const newsR = await allData.createNewsReview("h0lxQf8XYIzzOfWMgjIG","ua4jLSiqRTS5lyP2H6X3","asdaiushdiaushdihuasidhiausd");
  const eventR = await allData.createEventReview("h0lxQf8XYIzzOfWMgjIG","l2COFudTIAull2MkbUw8","asdasdasdasdasdasdasdasdasd");
})
router.get("/", (req, res) => {
  if(req.session.username){
    res.render('homepage');
  }else{
    res.redirect('/login')
  }
});

router.get("/categories/events", async (req, res) => {
  if(req.session.username){
    const eventData = await allData.getEvent();
    res.render("events", { eventData });
  }else{
    res.redirect('/login')
  }
});

router.get("/categories/news", async (req, res) => {
  if(req.session.username){
    const newsData = await allData.getNews();
    res.render("news", { newsData });
  }else{
    res.redirect('/login')
  }
});

router.get("/categories/jobs", async (req, res) => {
  if(req.session.username){
    const jobData = await allData.getJobs();
    res.render("jobs", { jobData });
  }else{
    res.redirect('/login')
  }
});

router.get("/categories/getjobreview/:id", async (req, res) => {
    const id = req.params.id;
    const jobData = await allData.getJobReview(id);
    //res.render("jobs", { jobData });
    return res.json(jobData);
});

router.get("/categories/getreviewbyjobid/:id", async (req, res) => {
  const id = req.params.id;
  const jobData = await allData.getReviewByJobId(id);
 // res.render("jobs", { jobData });
  return res.json(jobData);
});

router.get("/categories/deletejobreview/:id", async (req, res) => {
  const id = req.params.id;
  const jobData = await allData.deleteJobReview(id);
  //res.render("jobs", { jobData });
  return res.json(jobData);
});

router.post("/categories/jobreview", async (req, res) => {
  const data = req.body;
  console.log(data);
  const userid = data.userid;
  const jobid = data.jobid;
  const review = data.review;
  console.log(userid,jobid,review);
  console.log(typeof(userid),typeof(jobid),typeof(review));
  const jobData = await allData.createJobReview(userid, jobid, review);
  //res.render("jobs", { jobData });
  return res.json(jobData);
});


// Login Page
router.get("/login", async (req, res) => {
  if(req.session.username){
    res.redirect('/')
  }else{
    res.render('login')
  }
});

router.post("/login",async(req,res) =>{
  try {
    const {username,password} = req.body;
    const user = await allData.getUserByEmail(username,password);
    if(user){
      req.session.username = user[0];
      req.session.userid = user[1];
    }
    res.redirect('/')
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    res.status(500).send(error);
  }
})

// Register Page
router.get("/register", (req, res) => {
  if(req.session.username){
    res.redirect('/')
  }else{
    res.render('register');
  }
});

router.post("/register",async(req,res) =>{
  try {
    const {username,email,password,security_question,security_question_answer} = req.body;
    const Username = await allData.createUser(username,email,password,security_question,security_question_answer);
    res.render('login')
  } catch (error) {
    console.error("Error in Register:", error);
    res.status(500).send(error);
  }
})

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).send("Error logging out. Please try again.");
      }
      res.redirect("/login");
  });
});


router.post("/categories/events", async (req, res) => {
  try {
    const { eventName, Eventdate, Eventtime, eventLocation, eventDescription } =
      req.body;
    const [year, month, day] = Eventdate.split("-");
    const formattedDate = `${month}-${day}-${year}`;

    await allData.createEvent(
      eventName,
      formattedDate,
      Eventtime,
      eventLocation,
      eventDescription
    );
    res.redirect("/categories/events");
  } catch (error) {
    console.error("Error in CreateEvent:", error.message);
    res.status(500).send("Error creating event. Please try again.");
  }
});

router.post("/categories/events/delete", async (req, res) => {
  try {
    const eventId = req.body.eventId;
    await allData.deleteEventById(eventId);
    res.redirect("/categories/events");
  } catch (error) {
    console.error("Error in DeleteEvent:", error.message);
    res.status(500).send("Error deleting event. Please try again.");
  }
});

router.post("/categories/news", async (req, res) => {
  try {
    const { Title, Description, Region } = req.body;
    await allData.createNews(Title, Description, Region);
    res.redirect("/categories/news");
  } catch (error) {
    console.error("Error in CreateNews:", error.message);
    res.status(500).send("Error creating news. Please try again.");
  }
});

router.post("/categories/jobs", async (req, res) => {
  try {
    const { jobName, jobSalary, jobLocation, jobDescription, jobRequirement, jobType, jobStatus } =
      req.body;

    await allData.createJob(
      jobName, 
      jobSalary, 
      jobLocation, 
      jobDescription, 
      jobRequirement, 
      jobType, 
      jobStatus
    );
    res.redirect("/categories/jobs");
  } catch (error) {
    console.error("Error in CreateJob:", error.message);
    res.status(500).send("Error creating job. Please try again.");
  }
});

router.post("/categories/jobs/delete", async (req, res) => {
  try {
    const jobId = req.body.jobId;
    await allData.deleteJobById(jobId);
    res.redirect("/categories/jobs");
  } catch (error) {
    console.error("Error in DeleteJob:", error.message);
    res.status(500).send("Error deleting job. Please try again.");
  }
});

// Job Review
router.get('/categories/jobs/:jobId/reviews', async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const existingReviews = await allData.getReviewByJobId(jobId);
    const jobDetails = await allData.getJobById(jobId); // Fetch job details

    res.render('jobReview', { existingReviews, jobDetails });
  } catch (error) {
    console.error('Error fetching job reviews:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/createJobReview', async (req, res) => {
  try {
    const {jobId, content } = req.body;
    const newReview = await allData.createJobReview(req.session.userid, jobId, content);

    // Redirect to the job review page after creating a new review
    res.redirect(`/categories/jobs/${jobId}/reviews`);
  } catch (error) {
    console.error('Error creating job review:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/deleteJobReview/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    await allData.deleteJobReview(reviewId);

    // Redirect to the job review page after deleting the review
    res.redirect('/categories/jobs/:jobId/reviews');
  } catch (error) {
    console.error('Error deleting job review:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
