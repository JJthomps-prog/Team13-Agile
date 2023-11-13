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
<<<<<<< HEAD
  //console.log(await allData.getNewsReview(""));
  //console.log(await allData.getReviewByNewsId("ua4jLSiqRTS5lyP2H6X3"));
  //await allData.deleteNewsReview("Qjfn81DA1pHZEV10MeGN")
=======
  const eventR = await allData.createEventReview("h0lxQf8XYIzzOfWMgjIG","l2COFudTIAull2MkbUw8","asdasdasdasdasdasdasdasd");
  // console.log(await allData.getNewsReview(""));
  // await allData.deleteNewsReview("")
>>>>>>> 67abdb0b9d0bc79428ed2a918fd14be29793abca
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
      req.session.id = user[1];
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

module.exports = router;
