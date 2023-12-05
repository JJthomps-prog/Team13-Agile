//write db function here
const { initializeApp } = require("firebase/app");
const {
  doc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} = require("firebase/firestore/lite");
const admin = require("firebase-admin");
const express = require("express");

const firebaseConfig = {
  apiKey: "AIzaSyBWvUWjDfRKcmtdFz5PPIDP1spi2kzBIzM",
  authDomain: "team13-project-9f21a.firebaseapp.com",
  databaseURL: "https://team13-project-9f21a-default-rtdb.firebaseio.com",
  projectId: "team13-project-9f21a",
  storageBucket: "team13-project-9f21a.appspot.com",
  messagingSenderId: "252976729081",
  appId: "1:252976729081:web:6930d910c5e7fe60cf8b28",
  measurementId: "G-WYRF7N33SS",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function getUserById(id) {
  try {
    const UsersCol = collection(db, "users");
    const userQuery = query(UsersCol, where("id", "==", id));
    const user = await getDocs(userQuery);
    const singleuser = user.docs.map((doc) => doc.data());
    return singleuser;
  } catch (error) {
    console.error("Error in getEventById:", error);
    throw "No Event Found";
  }
}

async function getUserByEmail(Username,Password) {
  try {
    const UsersCol = collection(db, "users");
    const userQuery = query(UsersCol, where("email", "==", Username)); // find username = Username in users collection
    const user = await getDocs(userQuery);
    const singleuser = user.docs.map((doc) => doc.data());
    if(!singleuser[0]){
      const AdminCol = collection(db, "admins");
      const adminQuery = query(AdminCol,where("email","==",Username));
      const admin = await getDocs(adminQuery);
      const singleadmin = admin.docs.map((doc) => doc.data());
      if (singleadmin[0].password == Password){
        return [singleadmin[0].adminname,singleadmin[0].id,'admin'];
      }
      throw 'wrong password';
    }else if (singleuser[0].password == Password){
      return [singleuser[0].username,singleuser[0].id,'user'];
    }else{
      throw 'wrong password';
    }
  } catch (error) {
    if (error == 'wrong password'){
      throw 'wrong password';
    }
    throw 'No User Found';
  }
}

async function createUser(Username, Email ,Password ,Question, Answer) {
  try {
    const UsersCol = collection(db, "users");
    const userQuery = query(UsersCol, where("email", "==", Email));
    const user = await getDocs(userQuery);
    const singleuser = user.docs.map((doc) => doc.data());
    if (singleuser[0]){
      throw 'email exists'
    }
    const docRef = await addDoc(collection(db, "users"), {
      username: Username,
      email:Email,
      password: Password,
      SecurityQuestion: Question,
      SecurityAnswer: Answer,
      id: ""
    });
    const newDocId = docRef.id;
    await updateDoc(doc(db, "users", newDocId), {
      id: newDocId,
    });
    return { Username };
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
}

async function getJobs() {
  try {
    const JobsCol = collection(db, "jobs"); //get users collection
    const jobs = await getDocs(JobsCol);
    const joblist = jobs.docs.map((doc) => doc.data()); //convert to list type
    const filteredJobs = joblist.filter((item) => item.status === 1);
    return filteredJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw "No jobs Found";
  }
}

async function getJobById(id) {
  try {
    if (typeof id !== "string" && id.trim() === "") {
      throw "invalid id";
    }
    const Col = collection(db, "jobs");
    const Query = query(Col, where("id", "==", id)); // find eventname = Eventname in events collection
    const job = await getDocs(Query);
    const singlejob = job.docs.map((doc) => doc.data());
    return singlejob;
  } catch (error) {
    console.error("Error in getJobById:", error);
    throw "No Job Found";
  }
}

async function createJob(
  Jobname,
  Location,
  Salary,
  Description,
  Requirement,
  Jobtype,
  Jobstatus
) {
  try {
    if (
      typeof Jobname !== "string" ||
      typeof Location !== "string" ||
      typeof Salary !== "string" ||
      typeof Description !== "string" ||
      typeof Requirement !== "string" ||
      typeof Jobtype !== "string" ||
      typeof Jobstatus !== "string"
    ) {
      throw "Must be strings";
    }
    if (
      Jobname.trim() === "" ||
      Location.trim() === "" ||
      Salary.trim() === "" ||
      Description.trim() === "" ||
      Requirement.trim() === "" ||
      Jobtype.trim() === "" ||
      Jobstatus.trim() === ""
    ) {
      throw "Must not be empty";
    }
    const docRef = await addDoc(collection(db, "jobs"), {
      Jobname: Jobname,
      Location: Location,
      Salary: Salary,
      Description: Description,
      Requirement: Requirement,
      Jobtype: Jobtype,
      Jobstatus: Jobstatus,
      status: 0,
      id: "",
    });
    const newDocId = docRef.id;
    await updateDoc(doc(db, "jobs", newDocId), {
      id: newDocId,
    });
    return {
      id: newDocId,
      Jobname: Jobname,
      Location: Location,
      Salary: Salary,
      Description: Description,
      Requirement: Requirement,
      Jobtype: Jobtype,
      Jobstatus: Jobstatus,
    };
  } catch (error) {
    console.error("Error in createJob:", error);
    throw "Create Job Fail";
  }
}

async function deleteJobById(id) {
  try {
    const Col = collection(db, "jobs");
    const Query = query(Col, where("id", "==", id));
    const Snapshot = await getDocs(Query);

    if (Snapshot.empty) {
      throw new Error("No job Found");
    }
    await deleteDoc(doc(db, "jobs", id));
    return "delete success";
  } catch (error) {
    console.error("Error in deleteJob:", error);
    throw error;
  }
}

//EventsFunction Example
//"MM-DD-YYYY"
function isValidDateFormat(dateString) {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  return dateRegex.test(dateString);
}

//"HH:mm-HH:mm"
function isValidTimeFormat(timeString) {
  const timeRegex =
    /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]-(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
}

async function getEvent() {
  try {
    const EventsCol = collection(db, "events"); //get events collection
    const events = await getDocs(EventsCol);
    const eventlist = events.docs.map((doc) => doc.data()); //convert to list type
    const filteredEvent = eventlist.filter((item) => item.status === 1);
    return filteredEvent;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw "No Events Found";
  }
}

async function getEventById(id) {
  try {
    const EventsCol = collection(db, "events");
    const eventQuery = query(EventsCol, where("id", "==", id)); // find eventname = Eventname in events collection
    const event = await getDocs(eventQuery);
    const singleevent = event.docs.map((doc) => doc.data());
    return singleevent;
  } catch (error) {
    console.error("Error in getEventById:", error);
    throw "No Event Found";
  }
}

async function createEvent(
  Eventname,
  Eventdate,
  Eventtime,
  Eventlocation,
  Eventdescription
) {
  try {
    if (!isValidDateFormat(Eventdate)) {
      throw "Date must be MM-DD-YYYY";
    }
    if (
      typeof Eventname !== "string" ||
      typeof Eventlocation !== "string" ||
      typeof Eventdescription !== "string"
    ) {
      throw "Must be strings";
    }
    if (
      typeof Eventname === "" ||
      typeof Eventlocation === "" ||
      typeof Eventdescription === ""
    ) {
      throw "Must be strings";
    }

    const docRef = await addDoc(collection(db, "events"), {
      eventname: Eventname,
      eventdate: Eventdate,
      eventtime: Eventtime,
      eventlocation: Eventlocation,
      eventdescription: Eventdescription,
      status: 0,
      id: "",
    });
    const newDocId = docRef.id;

    await updateDoc(doc(db, "events", newDocId), {
      id: newDocId,
    });
    return {
      id: newDocId,
      eventname: Eventname,
      eventdate: Eventdate,
      eventtime: Eventtime,
      eventlocation: Eventlocation,
      eventdescription: Eventdescription,
    };
  } catch (error) {
    console.error("Error in CreateEvent:", error);
    throw "Create Event Fail";
  }
}

async function deleteEventById(id) {
  try {
    const EventsCol = collection(db, "events");
    const eventQuery = query(EventsCol, where("id", "==", id));
    const eventsSnapshot = await getDocs(eventQuery);

    if (eventsSnapshot.empty) {
      throw new Error("No Eventid Found");
    }

    await deleteDoc(doc(db, "events", id));
    return "delete success";
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    throw error;
  }
}
async function getAdminEvent() {
  try {
    const EventCol = collection(db, "events"); //get users collection
    const event = await getDocs(EventCol);
    const newlist = event.docs.map((doc) => doc.data()); //convert to list type
    return newlist
  } catch (error) {
    throw "No event found";
  }
}

async function changeEventStatusById(id,Status) {
  try {
    if (typeof id !== "string" && id.trim() === "") {
      throw new Error("Invalid id");
    }
    if (Status !== 1 && Status !== 0){
      throw new Error('Status should be 0 or 1. 0 means not published. 1 means published.')
    }
    await updateDoc(doc(db, "events", id), {
      status:Status
    });
    return getEventById(id);
  } catch (error) {
    console.error("Error in changeEventStatusById:", error);
    throw error;
  }
}


//eventsReview
async function getEventReview(Id){
  try {
    if (typeof Id !== "string" && tId.trim() === "") {
      throw "invalid id";
    }
    const EventCol = collection(db, "eventreview");
    const newQuery = query(EventCol, where("id", "==", Id)); // find eventname = Eventname in events collection
    const event = await getDocs(newQuery);
    const singleevent = event.docs.map((doc) => doc.data());
    return singleevent;
  } catch (error) {
    console.error("Error in get Event Review:", error);
    throw error;
  }
}
async function createEventReview(UserId,EventId,Content){
  try {
    if (
      typeof UserId !== "string" ||
      typeof EventId !== "string" ||
      typeof Content !== "string"
    ) {
      throw "Must be strings";
    }
    if (
      UserId.trim() === "" ||
      EventId.trim() === "" ||
      Content.trim() === ""
    ) {
      throw "Must not be empty";
    }
    user = await getUserById(UserId);
    if (user.length == 0){
      throw 'no such user'
    }
    events = await getEventById(EventId);
    if (events.length == 0){
      throw 'no such event'
    }
    const docRef = await addDoc(collection(db, "eventreview"), {
      userid: UserId,
      username: user[0].username,
      eventid: EventId,
      content: Content,
      id: ""
    });
    const newDocId = docRef.id;

    await updateDoc(doc(db, "eventreview", newDocId), {
      id: newDocId,
    });
    return {
      id: newDocId,
      userid: UserId,
      eventid:EventId,
      username: user[0].username,
      content: Content
    };
  } catch (error) {
    console.error("Error in create Event Review:", error);
    throw error;
  }
}
async function deleteEventReview(Id){
  try {
    const EventCol = collection(db, "eventreview");
    const newQuery = query(EventCol, where("id", "==", Id));
    const eventSnapshot = await getDocs(newQuery);

    if (eventSnapshot.empty) {
      throw new Error("No EventReview Found");
    }
    await deleteDoc(doc(db, "eventreview", Id));
    return "delete success";
  } catch (error) {
    console.error("Error in delete Event Review:", error);
    throw error;
  }
}
async function getReviewByEventId(EventId){
  try {
    if (typeof EventId !== "string" && EventId.trim() === "") {
      throw "invalid id";
    }
    const EventCol = collection(db, "eventreview");
    const newQuery = query(EventCol, where("eventid", "==", EventId)); // find eventname = Eventname in events collection
    const event = await getDocs(newQuery);
    const eventreviews = event.docs.map((doc) => doc.data());
    return eventreviews;
  } catch (error) {
    console.error("Error in get Event Review:", error);
    throw error;
  }
}

//job review

async function getJobReview(Id){
  try {
    if (typeof Id !== "string" && tId.trim() === "") {
      throw "invalid id";
    }
    const JobCol = collection(db, "jobreview");
    const newQuery = query(JobCol, where("id", "==", Id));
    const job = await getDocs(newQuery);
    const singlejob = job.docs.map((doc) => doc.data());
    return singlejob;
  } catch (error) {
    console.error("Error in get Job Review:", error);
    throw error;
  }
}
async function createJobReview(UserId,JobId,Content){
  try {
    if (
      typeof UserId !== "string" ||
      typeof JobId !== "string" ||
      typeof Content !== "string"
    ) {
      throw "Must be strings";
    }
    if (
      UserId.trim() === "" ||
      JobId.trim() === "" ||
      Content.trim() === ""
    ) {
      throw "Must not be empty";
    }
    user = await getUserById(UserId);
    if (user.length == 0){
      throw 'no such user'
    }
    job = await getJobById(JobId);
    if (job.length == 0){
      throw 'no such job'
    }
    const docRef = await addDoc(collection(db, "jobreview"), {
      userid: UserId,
      username: user[0].username,
      jobid: JobId,
      content: Content,
      id: ""
    });
    const newDocId = docRef.id;

    await updateDoc(doc(db, "jobreview", newDocId), {
      id: newDocId,
    });
    return {
      id: newDocId,
      userid: UserId,
      jobid: JobId,
      username: user[0].username,
      content: Content
    };
  } catch (error) {
    console.error("Error in create Job Review:", error);
    throw error;
  }
}
async function deleteJobReview(Id){
  try {
    const JobCol = collection(db, "jobreview");
    const newQuery = query(JobCol, where("id", "==", Id));
    const eventSnapshot = await getDocs(newQuery);

    if (eventSnapshot.empty) {
      throw new Error("No JobReview Found");
    }
    await deleteDoc(doc(db, "jobreview", Id));
    return "delete jobreview success";
  } catch (error) {
    console.error("Error in delete Job Review:", error);
    throw error;
  }
}
async function getReviewByJobId(JobId){
  try {
    if (typeof JobId !== "string" && JobId.trim() === "") {
      throw "invalid id";
    }
    const JobCol = collection(db, "jobreview");
    const newQuery = query(JobCol, where("jobid", "==", JobId)); 
    const job = await getDocs(newQuery);
    const jobreviews = job.docs.map((doc) => doc.data());
    return jobreviews;
  } catch (error) {
    console.error("Error in get Job Review:", error);
    throw error;
  }
}


//news data
async function getNews() {
  try {
    const NewsCol = collection(db, "news"); //get users collection
    const news = await getDocs(NewsCol);
    const newlist = news.docs.map((doc) => doc.data()); //convert to list type
    const filteredNews = newlist.filter((item) => item.status === 1);
    return filteredNews;
  } catch (error) {
    throw "No news found";
  }
}

async function getNewsById(id) {
  try {
    if (typeof id !== "string" && id.trim() === "") {
      throw "invalid id";
    }
    const NewsCol = collection(db, "news");
    const newQuery = query(NewsCol, where("id", "==", id)); // find eventname = Eventname in events collection
    const news = await getDocs(newQuery);
    const singlenews = news.docs.map((doc) => doc.data());
    return singlenews;
  } catch (error) {
    console.error("Error in getNewsById:", error);
    throw error;
  }
}

async function createNews(Title, Description, Region) {
  try {
    if (
      typeof Title !== "string" ||
      typeof Description !== "string" ||
      typeof Region !== "string"
    ) {
      throw "Must be strings";
    }
    if (
      Title.trim() === "" ||
      Description.trim() === "" ||
      typeof Region !== "string"
    ) {
      throw "Must not be empty";
    }
    const docRef = await addDoc(collection(db, "news"), {
      title: Title,
      description: Description,
      region: Region,
      status: 0,
      id: "",
    });
    const newDocId = docRef.id;

    await updateDoc(doc(db, "news", newDocId), {
      id: newDocId,
    });
    return {
      id: newDocId,
      title: Title,
      description: Description,
      region: Region,
    };
  } catch (error) {
    console.error("Error in create News:", error);
    throw "Create News Fail";
  }
}

async function deleteNewsById(id) {
  try {
    const NewsCol = collection(db, "news");
    const newQuery = query(NewsCol, where("id", "==", id));
    const newsSnapshot = await getDocs(newQuery);

    if (newsSnapshot.empty) {
      throw new Error("No Event Found");
    }
    await deleteDoc(doc(db, "news", id));
    return "delete success";
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    throw error;
  }
}

//newsReview
async function getNewsReview(Id){
  try {
    if (typeof Id !== "string" && Id.trim() === "") {
      throw "invalid id";
    }
    const NewsCol = collection(db, "newsreview");
    const newQuery = query(NewsCol, where("id", "==", Id)); // find eventname = Eventname in events collection
    const news = await getDocs(newQuery);
    const singlenews = news.docs.map((doc) => doc.data());
    return singlenews;
  } catch (error) {
    console.error("Error in get News Review:", error);
    throw error;
  }
}
async function createNewsReview(UserId,NewsId,Content){
  try {
    if (
      typeof UserId !== "string" ||
      typeof NewsId !== "string" ||
      typeof Content !== "string"
    ) {
      throw "Must be strings";
    }
    if (
      UserId.trim() === "" ||
      Content.trim() === ""||
      NewsId.trim() === ""
    ) {
      throw "Must not be empty";
    }
    user = await getUserById(UserId);
    if (user.length == 0){
      throw 'no such user'
    }
    news = await getNewsById(NewsId);
    if (news.length == 0){
      throw 'no such news'
    }
    const docRef = await addDoc(collection(db, "newsreview"), {
      userid: UserId,
      username: user[0].username,
      newsid: NewsId,
      content: Content,
      id: ""
    });
    const newDocId = docRef.id;

    await updateDoc(doc(db, "newsreview", newDocId), {
      id: newDocId,
    });
    return {
      id: newDocId,
      userid: UserId,
      newsid: NewsId,
      username: user[0].username,
      content: Content
    };
  } catch (error) {
    console.logerror("Error in create News Review:", error);
    throw error;
  }
}
async function deleteNewsReview(Id){
  try {
    const NewsCol = collection(db, "newsreview");
    const newQuery = query(NewsCol, where("id", "==", Id));
    const newsSnapshot = await getDocs(newQuery);

    if (newsSnapshot.empty) {
      throw new Error("No NewsReview Found");
    }
    await deleteDoc(doc(db, "newsreview", Id));
    return "delete success";
  } catch (error) {
    console.error("Error in delete News Review:", error);
    throw error;
  }
}

async function getReviewByNewsId(NewsId){
  try {
    if (typeof NewsId !== "string" && NewsId.trim() === "") {
      throw "invalid id";
    }
    const NewsCol = collection(db, "newsreview");
    const newQuery = query(NewsCol, where("newsid", "==", NewsId)); // find eventname = Eventname in events collection
    const news = await getDocs(newQuery);
    const newsreviews = news.docs.map((doc) => doc.data());
    return newsreviews;
  } catch (error) {
    console.error("Error in get News Review:", error);
    throw error;
  }
}

async function getAdminNews() {
  try {
    const NewsCol = collection(db, "news"); //get users collection
    const news = await getDocs(NewsCol);
    const newlist = news.docs.map((doc) => doc.data()); //convert to list type
    return newlist
  } catch (error) {
    throw "No news found";
  }
}

async function changeNewsStatusById(id,Status) {
  try {
    if (typeof id !== "string" && id.trim() === "") {
      throw new Error("Invalid id");
    }
    if (Status !== 1 && Status !== 0){
      throw new Error('Status should be 0 or 1. 0 means not published. 1 means published.')
    }
    await updateDoc(doc(db, "news", id), {
      status:Status
    });
    return getNewsById(id);
  } catch (error) {
    console.error("Error in changeNewsStatusById:", error);
    throw error;
  }
}

async function getAdminJobs(){
  try {
    const JobsCol = collection(db, "jobs"); //get users collection
    const jobs = await getDocs(JobsCol);
    const joblist = jobs.docs.map((doc) => doc.data()); //convert to list type
    return joblist
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw "No jobs Found";
  }
}

async function changeJobStatusById(id,Status) {
  try {
    if (typeof id !== "string" && id.trim() === "") {
      throw new Error("Invalid id");
    }
    if (Status !== 1 && Status !== 0){
      throw new Error('Status should be 0 or 1. 0 means not published. 1 means published.')
    }
    await updateDoc(doc(db, "jobs", id), {
      status:Status
    });
    return getJobById(id);
  } catch (error) {
    console.error("Error in changeJobStatusById:", error);
    throw error;
  }
}



module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getJobs,
  getJobById,
  createJob,
  deleteJobById,
  getEvent,
  getEventById,
  createEvent,
  deleteEventById,
  getEventReview,
  createEventReview,
  deleteEventReview,
  getReviewByEventId,
  getAdminEvent,
  changeEventStatusById,
  getJobReview,
  createJobReview,
  deleteJobReview,
  getReviewByJobId,
  getNews,
  getNewsById,
  createNews,
  deleteNewsById,
  getNewsReview,
  createNewsReview,
  deleteNewsReview,
  getReviewByNewsId,
  getAdminNews,
  changeNewsStatusById,
  getAdminJobs,
  changeJobStatusById
};
