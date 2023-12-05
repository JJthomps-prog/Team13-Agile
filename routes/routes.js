const express = require("express");
const session = require("express-session");
const router = express.Router();
const allData = require("../data/alldata");
router.use(
  session({
    secret: "Team13",
    resave: false,
    saveUninitialized: true,
  })
);
router.get("/", async (req, res) => {
  if (req.session.username) {
    const eventData = await allData.getEvent();
    const newsData = await allData.getNews();
    const jobData = await allData.getJobs();
    res.render("homepage",{eventData,newsData,jobData});
  }else if (req.session.adminname){
    const adminevent = await allData.getAdminEvent();
    const adminnews = await allData.getAdminNews();
    const adminjob = await allData.getAdminJobs();
    res.render("admin",{adminevent,adminnews,adminjob});
  } else {
    res.redirect("/login");
  }
});

router.get("/categories/events", async (req, res) => {
  if (req.session.username) {
    const eventData = await allData.getEvent();
    res.render("events", { eventData });
  } else {
    res.redirect("/login");
  }
});

router.get("/categories/news", async (req, res) => {
  if (req.session.username) {
    const newsData = await allData.getNews();
    res.render("news", { newsData });
  } else {
    res.redirect("/login");
  }
});

router.get("/categories/jobs", async (req, res) => {
  if (req.session.username) {
    const jobData = await allData.getJobs();
    res.render("jobs", { jobData });
  } else {
    res.redirect("/login");
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
  console.log(userid, jobid, review);
  console.log(typeof userid, typeof jobid, typeof review);
  const jobData = await allData.createJobReview(userid, jobid, review);
  //res.render("jobs", { jobData });
  return res.json(jobData);
});

router.post("/admins/changestatue", async (req, res) => {
  const data = req.body;
  const type = data.type
  let datastatus = parseInt(data.status,10)
  if (datastatus==1){
    datastatus = 0
  }else{
    datastatus = 1
  }
  if(type == 'job'){
    const jobid = data.jobid
    jobs = await allData.changeJobStatusById(jobid,datastatus)
  }else if (type == 'news'){
    const newsid = data.newsid
    news = await allData.changeNewsStatusById(newsid,datastatus)
  }else if (type == 'event'){
    const eventid = data.eventid
    events = await allData.changeEventStatusById(eventid,datastatus)
  }
  res.redirect("/");
});

// Login Page
router.get("/login", async (req, res) => {
  if (req.session.username) {
    res.redirect("/");
  } else if (req.session.adminname){
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await allData.getUserByEmail(username, password);
    if (user&&user[2]=='user') {
      req.session.username = user[0];
      req.session.userid = user[1];
    }
    if (user&&user[2]=='admin'){
      req.session.adminname = user[0];
      req.session.adminid = user[1];
    }
    res.redirect("/");
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    res.status(500).send(error);
  }
});

// Register Page
router.get("/register", (req, res) => {
  if (req.session.username) {
    res.redirect("/");
  } else {
    res.render("register");
  }
});

router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      security_question,
      security_question_answer,
    } = req.body;
    const Username = await allData.createUser(
      username,
      email,
      password,
      security_question,
      security_question_answer
    );
    res.render("login");
  } catch (error) {
    console.error("Error in Register:", error);
    res.status(500).send(error);
  }
});

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

router.post("/categories/news/delete", async (req, res) => {
  try {
    const newsId = req.body.newsId;
    await allData.deleteNewsById(newsId);
    res.redirect("/categories/news");
  } catch (error) {
    console.error("Error in DeleteNews:", error.message);
    res.status(500).send("Error deleting news. Please try again.");
  }
});

router.post("/categories/jobs", async (req, res) => {
  try {
    const {
      jobName,
      jobSalary,
      jobLocation,
      jobDescription,
      jobRequirement,
      jobType,
      jobStatus,
    } = req.body;

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

function checkLoggedIn(req, res, next) {
  if (req.session && req.session.userid) {
    next();
  } else {
    res.redirect("/login");
  }
}

// Job Review
router.get(
  "/categories/jobs/:jobId/reviews",
  checkLoggedIn,
  async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const existingReviews = await allData.getReviewByJobId(jobId);
      const jobDetails = await allData.getJobById(jobId); // Fetch job details

      res.render("jobReview", { existingReviews, jobDetails });
    } catch (error) {
      console.error("Error fetching job reviews:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/createJobReview", checkLoggedIn, async (req, res) => {
  try {
    const { jobId, content, userId } = req.body;
    const newReview = await allData.createJobReview(
      req.session.userid,
      jobId,
      content,
      userId
    );

    // Redirect to the job review page after creating a new review
    res.redirect(`/categories/jobs/${jobId}/reviews`);
  } catch (error) {
    console.error("Error creating job review:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/deleteJobReview/:reviewId", checkLoggedIn, async (req, res) => {
  try {
    const { jobid } = req.body;
    const reviewId = req.params.reviewId;
    const review = await allData.getJobReview(reviewId); // Fetch the review

    if (!review) {
      res.status(404).send("Review not found");
    } else {
      // Check if the user is the owner of the review
      if (req.session.userid !== review[0].userid) {
        res.status(403).send("Forbidden: You can only delete your own reviews");
      } else {
        await allData.deleteJobReview(reviewId);
        res.redirect(`/categories/jobs/${jobid}/reviews`); // Redirect to the job review page after deleting the review
      }
    }
  } catch (error) {
    console.error("Error deleting job review:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Event Review
router.get(
  "/categories/events/:eventId/reviews",
  checkLoggedIn,
  async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const existingReviews = await allData.getReviewByEventId(eventId);
      const eventDetails = await allData.getEventById(eventId); // Fetch job details

      res.render("eventReview", { existingReviews, eventDetails });
    } catch (error) {
      console.error("Error fetching event reviews:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/createEventReview", checkLoggedIn, async (req, res) => {
  try {
    const { eventId, content, userId } = req.body;
    const newReview = await allData.createEventReview(
      req.session.userid,
      eventId,
      content,
      userId
    );

    // Redirect to the event review page after creating a new review
    res.redirect(`/categories/events/${eventId}/reviews`);
  } catch (error) {
    console.error("Error creating event review:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/deleteEventReview/:reviewId", checkLoggedIn, async (req, res) => {
  try {
    const { eventid } = req.body;
    const reviewId = req.params.reviewId;
    const review = await allData.getEventReview(reviewId); // Fetch the review

    if (!review) {
      res.status(404).send("Review not found");
    } else {
      // Check if the user is the owner of the review
      if (req.session.userid !== review[0].userid) {
        res.status(403).send("Forbidden: You can only delete your own reviews");
      } else {
        await allData.deleteEventReview(reviewId);
        res.redirect(`/categories/events/${eventid}/reviews`); // Redirect to the event review page after deleting the review
      }
    }
  } catch (error) {
    console.error("Error deleting event review:", error);
    res.status(500).send("Internal Server Error");
  }
});

// News Review
router.get(
  "/categories/news/:newsId/reviews",
  checkLoggedIn,
  async (req, res) => {
    try {
      const newsId = req.params.newsId;
      const existingReviews = await allData.getReviewByNewsId(newsId);
      const newsDetails = await allData.getNewsById(newsId); // Fetch job details

      res.render("newsReview", { existingReviews, newsDetails });
    } catch (error) {
      console.error("Error fetching news reviews:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/createNewsReview", checkLoggedIn, async (req, res) => {
  try {
    const { newsId, content} = req.body;
    const newReview = await allData.createNewsReview(
      req.session.userid,
      newsId,
      content
    );

    // Redirect to the event review page after creating a new review
    res.redirect(`/categories/news/${newsId}/reviews`);
  } catch (error) {
    console.error("Error creating news review:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/deleteNewsReview/:reviewId", checkLoggedIn, async (req, res) => {
  try {
    const { newsid } = req.body;
    const reviewId = req.params.reviewId;
    const review = await allData.getNewsReview(reviewId); // Fetch the review

    if (!review) {
      res.status(404).send("Review not found");
    } else {
      // Check if the user is the owner of the review
      if (req.session.userid !== review[0].userid) {
        res.status(403).send("Forbidden: You can only delete your own reviews");
      } else {
        await allData.deleteNewsReview(reviewId);
        res.redirect(`/categories/news/${newsid}/reviews`); // Redirect to the news review page after deleting the review
      }
    }
  } catch (error) {
    console.error("Error deleting news review:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
