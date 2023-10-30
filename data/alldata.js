//write db function here
const { initializeApp } = require('firebase/app');
const { doc,getFirestore, collection, getDocs , query, where, addDoc, deleteDoc, updateDoc, getDoc} = require('firebase/firestore/lite');
const admin = require('firebase-admin');
const express = require('express');

const firebaseConfig = {
    apiKey: "AIzaSyBWvUWjDfRKcmtdFz5PPIDP1spi2kzBIzM",
    authDomain: "team13-project-9f21a.firebaseapp.com",
    databaseURL: "https://team13-project-9f21a-default-rtdb.firebaseio.com",
    projectId: "team13-project-9f21a",
    storageBucket: "team13-project-9f21a.appspot.com",
    messagingSenderId: "252976729081",
    appId: "1:252976729081:web:6930d910c5e7fe60cf8b28",
    measurementId: "G-WYRF7N33SS"
  };
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


//UserFunction Example
async function getUsers(){
    try {
        const UsersCol = collection(db, 'users');//get users collection
        const users = await getDocs(UsersCol);
        const userlist = users.docs.map(doc => doc.data());//convert to list type
        return userlist; // return a list contain all users
    } catch (error) {
        console.error("Error fetching users:", error);
        throw 'No Users Found';
    }
}

async function getUserByUserName(Username) {
    try {
        const UsersCol = collection(db, 'users');
        const userQuery = query(UsersCol, where("username", "==", Username));// find username = Username in users collection
        const user = await getDocs(userQuery);
        const singleuser = user.docs.map(doc => doc.data());
        return singleuser;
    } catch (error) {
        console.error("Error in getUserByUserName:", error);
        throw 'No User Found';
    }
}

async function createUser(Username,Password){
    try {
        await addDoc(collection(db,"users"),{
            username:Username,
            password:Password
        })
        return {Username}
    } catch (error) {
        console.error("Error in getUserByUserName:", error);
        throw 'Create User Fail';
    }
}


async function getJobs(){
    try {
        const JobsCol = collection(db, 'jobs');//get users collection
        const jobs = await getDocs(JobsCol);
        const joblist = jobs.docs.map(doc => doc.data());//convert to list type
        return joblist; // return a list contain all users
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw 'No jobs Found';
    }
}

async function getJobById(id) {
    try {
        if(typeof(id)!=='string' && id.trim() === ''){
            throw 'invalid id';
        }
        const Col = collection(db, 'news');
        const Query = query(Col, where("id", "==", id));// find eventname = Eventname in events collection
        const job = await getDocs(Query);
        const singlejob= job.docs.map(doc => doc.data());
        return singlejob;
    } catch (error) {
        console.error("Error in getJobById:", error);
        throw 'No Job Found';
    }
}



async function createJob(Jobname,Location,Salary,Description,Requirement,Jobtype,Jobstatus){
    try {
        if(typeof(Jobname) !== 'string' || typeof(Location)!=='string' || typeof(Salary)!=='string' || typeof(Description)!=='string' || typeof(Requirement)!=='string' || typeof(Jobtype)!=='string' || typeof(Jobstatus)!=='string'){
            throw 'Must be strings'
        }
        if(Jobname.trim() === '' || Location.trim() === ''|| Salary.trim() === ''|| Description.trim() === ''|| Requirement.trim() === ''|| Jobtype.trim() === ''|| Jobstatus.trim() === ''){
            throw 'Must not be empty'
        }
        const docRef = await addDoc(collection(db,"jobs"),{
            Jobname:Jobname,
            Location:Location,
            Salary:Salary,
            Description:Description,
            Requirement:Requirement,
            Jobtype:Jobtype,
            Jobstatus:Jobstatus,
            id: ''
        })
        const newDocId = docRef.id;
        await updateDoc(doc(db, 'jobs', newDocId), {
            id: newDocId
        });
        return {id: newDocId, Jobname:Jobname, Location:Location, Salary:Salary, Description:Description, Requirement:Requirement, Jobtype:Jobtype, Jobstatus:Jobstatus};
    } catch (error) {
        console.error("Error in createJob:", error);
        throw 'Create Job Fail';
    }
}


async function deleteJobById(id){
    try {

        const Col = collection(db, 'jobs');
        const Query = query(Col, where("id", "==", id));
        const Snapshot = await getDocs(Query);
        
        if (Snapshot.empty) {
            throw new Error('No job Found');
        }
        await deleteDoc(doc(db, 'jobs', id));
        return 'delete success';
        
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
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]-(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(timeString);
}

async function getEvent(){
    try {
        const EventsCol = collection(db, 'events');//get events collection
        const events = await getDocs(EventsCol);
        const eventlist = events.docs.map(doc => doc.data());//convert to list type
        return eventlist; // return a list contain all events
    } catch (error) {
        console.error("Error fetching events:", error);
        throw 'No Events Found';
    }
}

async function getEventById(id) {
    try {
        const EventsCol = collection(db, 'events');
        const eventQuery = query(EventsCol, where("id", "==", id));// find eventname = Eventname in events collection
        const event = await getDocs(eventQuery);
        const singleevent = event.docs.map(doc => doc.data());
        return singleevent;
    } catch (error) {
        console.error("Error in getEventById:", error);
        throw 'No Event Found';
    }
}

async function createEvent(Eventname, Eventdate, Eventtime, Eventlocation, Eventdescription){
    try {
        if (!isValidDateFormat(Eventdate)){
            throw 'Date must be MM-DD-YYYY'
        }
        if (!isValidTimeFormat(Eventtime)){
            throw 'Time must be HH:mm-HH:mm'
        }
        if (typeof(Eventname) !== 'string' || typeof(Eventlocation)!== 'string' || typeof(Eventdescription)!== 'string'){
            throw 'Must be strings'
        }
        if (typeof(Eventname) === '' || typeof(Eventlocation)=== '' || typeof(Eventdescription)=== ''){
            throw 'Must be strings'
        }
        
        const docRef = await addDoc(collection(db,"events"),{
            eventname:Eventname,
            eventdate:Eventdate,
            eventtime:Eventtime,
            eventlocation:Eventlocation,
            eventdescription:Eventdescription,
            id: ''
        })
        const newDocId = docRef.id;

        await updateDoc(doc(db, 'events', newDocId), {
            id: newDocId
        });
        return { id: newDocId, 
            eventname:Eventname,
            eventdate:Eventdate,
            eventtime:Eventtime,
            eventlocation:Eventlocation,
            eventdescription:Eventdescription};
              
    } catch (error) {
        console.error("Error in CreateEvent:", error);
        throw 'Create Event Fail';
    }
}

async function deleteEventById(id){
    try {
        const EventsCol = collection(db, 'events');
        const eventQuery = query(EventsCol, where("id", "==", id));
        const eventsSnapshot = await getDocs(eventQuery);
        
        if (eventsSnapshot.empty) {
            throw new Error('No Eventid Found');
        }

        await deleteDoc(doc(db, 'events', id));
        return 'delete success';
    } catch (error) {
        console.error("Error in deleteEvent:", error);
        throw error;
    }
}

//news data
async function getNews(){
    try {
        const NewsCol = collection(db, 'news');//get users collection
        const news = await getDocs(NewsCol);
        const newlist = news.docs.map(doc => doc.data());//convert to list type
        return newlist; // return a list contain all users
    } catch (error) {
        throw 'No news found'
    }
}

async function getNewsById(id){
    try{
        if(typeof(id)!=='string' && id.trim() === ''){
            throw 'invalid id';
        }
        const NewsCol = collection(db, 'news');
        const newQuery = query(NewsCol, where("id", "==", id));// find eventname = Eventname in events collection
        const news = await getDocs(newQuery);
        const singlenews= news.docs.map(doc => doc.data());
        return singlenews;
    } catch (error) {
        console.error("Error in getNewsById:", error);
        throw error;
    }
}

async function createNews(Title,Description){
    try {
        if(typeof(Title) !== 'string' || typeof(Description)!=='string'){
            throw 'Must be strings'
        }
        if(Title.trim() === '' || Description.trim() === ''){
            throw 'Must not be empty'
        }
        const docRef = await addDoc(collection(db,"news"),{
            title:Title,
            description:Description,
            id: ''
        })
        const newDocId = docRef.id;

        await updateDoc(doc(db, 'news', newDocId), {
            id: newDocId
        });
        return { id: newDocId, title: Title, description: Description };
    } catch (error) {
        console.error("Error in create News:", error);
        throw 'Create News Fail';
    }
}

async function deleteNewsById(id){
    try {
        const NewsCol = collection(db, 'news');
        const newQuery = query(NewsCol, where("id", "==", id));
        const newsSnapshot = await getDocs(newQuery);
        
        if (newsSnapshot.empty) {
            throw new Error('No Event Found');
        }
        await deleteDoc(doc(db, 'news', id));
        return 'delete success';
    } catch (error) {
        console.error("Error in deleteEvent:", error);
        throw error;
    }
}

module.exports = {
    getUsers,
    getUserByUserName,
    createUser,
    getJobs,
    getJobById,
    createJob,
    deleteJobById,
    getEvent,
    getEventById,
    createEvent,
    deleteEventById,
    getNews,
    getNewsById,
    createNews,
    deleteNewsById
}