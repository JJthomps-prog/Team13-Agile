//write db function here
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs , query, where, addDoc} = require('firebase/firestore/lite');
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

async function getJobByJobName(Jobname) {
    try {
        const UsersCol = collection(db, 'jobs');
        const jobQuery = query(UsersCol, where("Jobname", "==", Jobname));// find Jobname = Jobname in jobs collection
        const jobs = await getDocs(jobQuery);
        const singlejob = jobs.docs.map(doc => doc.data());
        return singlejob;
    } catch (error) {
        console.error("Error in getUserByUserName:", error);
        throw 'No Job Found';
    }
}

async function createJob(Jobname,Location,Salary,Description,Requirement,Jobtype,Jobstatus){
    try {
        await addDoc(collection(db,"jobs"),{
            Jobname:Jobname,
            Location:Location,
            Salary:Salary,
            Description:Description,
            Requirement:Requirement,
            Jobtype:Jobtype,
            Jobstatus:Jobstatus
        })
        return {Jobname}
    } catch (error) {
        console.error("Error in createJob:", error);
        throw 'Create Job Fail';
    }
}

async function deleteJob(Jobname){
    try {
        const JobsCol = collection(db, 'jobs');
        const jobQuery = query(JobsCol, where("Jobname", "==", Jobname));
        const jobsSnapshot = await getDocs(jobQuery);
        
        if (jobsSnapshot.empty) {
            throw new Error('No Job Found');
        }

        const jobId = jobsSnapshot.docs[0].id;
        await deleteDoc(doc(db, 'jobs', jobId));
        return {Jobname};
    } catch (error) {
        console.error("Error in deleteJob:", error);
        throw error;
    }
}

//EventsFunction Example
//"YYYY-MM-DD"
function isValidDateFormat(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
}

//"HH:mm"
function isValidTimeFormat(timeString) {
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
    return timeRegex.test(timeString);
}

//determine if the event is valid
function isValidEvent(event) {
    if (
        event &&
        event.eventname &&
        event.eventdate &&
        event.eventtime &&
        event.eventlocation &&
        event.eventdescription &&
        isValidDateFormat(event.eventdate) &&
        isValidTimeFormat(event.eventtime)
    ) {
        return true;
    } else {
        return false;
    }
}

async function getEvents(){
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

async function getEventByEventName(Eventname) {
    try {
        const EventsCol = collection(db, 'events');
        const eventQuery = query(EventsCol, where("eventname", "==", Eventname));// find eventname = Eventname in events collection
        const event = await getDocs(eventQuery);
        const singleevent = event.docs.map(doc => doc.data());
        return singleevent;
    } catch (error) {
        console.error("Error in getEventByEventName:", error);
        throw 'No Event Found';
    }
}

async function createEvent(Eventname, Eventdate, Eventtime, Eventlocation, Eventdescription){
    try {
        await addDoc(collection(db,"events"),{
            eventname:Eventname,
            eventdate:Eventdate,
            eventtime:Eventtime,
            eventlocation:Eventlocation,
            eventdescription:Eventdescription
        })
        if (isValidEvent(eventObject)) {
            await addDoc(collection(db, "events"), eventObject);
            return { Eventname };
        } else {
            throw 'Invalid Event';
        }
    } catch (error) {
        console.error("Error in getEventByEventName:", error);
        throw 'Create Event Fail';
    }
}

async function deleteEvent(Eventname){
    try {
        const EventsCol = collection(db, 'events');
        const eventQuery = query(EventsCol, where("Eventname", "==", Eventname));
        const eventsSnapshot = await getDocs(eventQuery);
        
        if (eventsSnapshot.empty) {
            throw new Error('No Event Found');
        }

        const eventId = eventsSnapshot.docs[0].id;
        await deleteDoc(doc(db, 'events', eventId));
        return {Eventname};
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
    getJobByJobName,
    createJob,
    deleteJob,
    getEvents,
    getEventByEventName,
    createEvent,
    deleteEvent
}