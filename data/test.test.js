// news.test.js
const allData = require('./alldata'); // Update with the actual path to your module
const { initializeApp} = require("firebase/app");
const {getFirestore,terminate } = require("firebase/firestore/lite")
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

beforeAll(async () => {
  // Set up a Firestore emulator for testing
  const testApp = initializeApp(firebaseConfig);
  db = getFirestore(testApp);
});

afterAll(async () => {

});

// test('getNewsById should retrieve news by ID', async () => {
//     const id = 'ua4jLSiqRTS5lyP2H6X3'; // Replace with a valid news ID from your test data
  
//     try {
//       const result = await allData.getNewsById(id);
//       const expectedData = {
//         description: "Drug becomes a serious problem",
//         id: "ua4jLSiqRTS5lyP2H6X3",
//         region: "New York",
//         title: "Drugs Problem"
//       };
  
//       expect(result[0]).toEqual(expectedData);
//     } catch (error) {
//       throw new Error(`getNewsById failed with error: ${error}`);
//     }
//   });

//   test('getNewsReview should retrieve news review by ID',async () => {
//     const id = "6DdenNa2T0Htw8BGKlwO";
//     try {
//       const result = await allData.getNewsReview(id);
//       const expectedData = {
//         content: "asdaiushdiaushdihuasidhiausd",
//         id: "Njn8Xg5kD1zEEm5iury6",
//         newsid: "6DdenNa2T0Htw8BGKlwO",
//         userid: "h0lxQf8XYIzzOfWMgjIG",
//         username: "1"
//       };
  
//       expect(result[0]).toEqual(expectedData);
//     } catch (error) {
//       throw new Error(`getNewsById failed with error: ${error}`);
//     }
//   });

//   test('deleteNewsReview should delete a news review by ID', async () => {
//     const idToDelete = "dpqJiWPIACslWULpqo50";
//     try {
//       const result = await allData.deleteNewsReview(idToDelete);
//       expect(result).toEqual("delete success");
//     } catch (error) {
//       throw new Error(`deleteNewsReview failed with error: ${error}`);
//     }
//   });

//   test('createNewsReview should create a new news review', async () => {
//   const userId = "h0lxQf8XYIzzOfWMgjIG";
//   const newsId = "ua4jLSiqRTS5lyP2H6X3";
//   const content = "This is a test news review";

//   try {
//     const result = await allData.createNewsReview(userId, newsId, content);

//     expect(result).toEqual({
//       id: expect.any(String),
//       userid: userId,
//       newsid: newsId,
//       username: expect.any(String),
//       content: content,
//     });

//     const createdNewsReview = await allData.getNewsReview(result.id);
//     expect(createdNewsReview[0]).toEqual(result);

//   } catch (error) {
//     throw new Error(`createNewsReview failed with error: ${error}`);
//   }
// });

// test('getJobReview should retrieve job review by ID', async () => {
//   const id = "6QCCxXoMUAW7aGeCjpVg";
//   try {
//     const result = await allData.getJobReview(id);
//     const expectedData = {
//       id:"6QCCxXoMUAW7aGeCjpVg",
//       userid: "4xWB5GgImbSAqbqDP33r",
//       jobid: "RSFymg3pxydGVTK6RISI",
//       username: "12334",
//       content: "3",
//     };

//     expect(result[0]).toEqual(expectedData);
//   } catch (error) {
//     throw new Error(`getJobReview failed with error: ${error}`);
//   }
// });

// test('deleteJobReview should delete a job review by ID', async () => {
//   const idToDelete = "dHtBn9iQ9SW3TMbnY1Dd";
//   try {
//     const result = await allData.deleteJobReview(idToDelete);
//     expect(result).toEqual("delete jobreview success");
//   } catch (error) {
//     throw new Error(`deleteJobReview failed with error: ${error}`);
//   }
// });

// test('createJobReview should create a new job review', async () => {
//   const userId = "h0lxQf8XYIzzOfWMgjIG";
//   const jobId = "l72ljQzVMgjkBasvtsb5";
//   const content = "This is a test news review";

//   try {
//     const result = await allData.createJobReview(userId, jobId, content);

//     expect(result).toEqual({
//       id: expect.any(String),
//       userid: userId,
//       jobid: jobId,
//       username: expect.any(String),
//       content: content,
//     });

//     const createdNewsReview = await allData.getJobReview(result.id);
//     expect(createdNewsReview[0]).toEqual(result);

//   } catch (error) {
//     throw new Error(`createNewsReview failed with error: ${error}`);
//   }
// });

// test('getEventReview should retrieve news review by ID',async () => {
//   const id = "2djfU34jbfRkrAnv7gK9";
//   try {
//     const result = await allData.getEventReview(id);
//     const expectedData = {
//       content: "asdasdasdasdasdasdasdasdasd",
//       id: "2djfU34jbfRkrAnv7gK9",
//       eventid: "l2COFudTIAull2MkbUw8",
//       userid: "h0lxQf8XYIzzOfWMgjIG",
//       username: "1"
//     };

//     expect(result[0]).toEqual(expectedData);
//   } catch (error) {
//     throw new Error(`getEventById failed with error: ${error}`);
//   }
// });

// test('deleteEventReview should delete an event review by ID', async () => {
//   const idToDelete = "OhVVM4tRmEDyULwmRlzx";
//   try {
//     const result = await allData.deleteEventReview(idToDelete);
//     expect(result).toEqual("delete success");
//   } catch (error) {
//     throw new Error(`deleteEventReview failed with error: ${error}`);
//   }
// });

// test('createEventReview should create a new event review', async () => {
// const userId = "h0lxQf8XYIzzOfWMgjIG";
// const eventId = "zNdPAhJo0qt3fqFby2vs";
// const content = "This is a test news review";

// try {
//   const result = await allData.createEventReview(userId, eventId, content);

//   expect(result).toEqual({
//     id: expect.any(String),
//     userid: userId,
//     eventid: eventId,
//     username: expect.any(String),
//     content: content,
//   });

//   const createdEventReview = await allData.getEventReview(result.id);
//   expect(createdEventReview[0]).toEqual(result);

// } catch (error) {
//   throw new Error(`createEventReview failed with error: ${error}`);
// }
// });

test('changeNewsStatusById should retrieve news by ID', async () => {
  const id = 'ua4jLSiqRTS5lyP2H6X3'; // Replace with a valid news ID from your test data

  try {
    const result = await allData.changeNewsStatusById(id,0);
    const expectedData = {
      description: "Drug becomes a serious problem",
      id: "ua4jLSiqRTS5lyP2H6X3",
      region: "New York",
      status: 0,
      title: "Drugs Problem"
    };

    expect(result[0]).toEqual(expectedData);
  } catch (error) {
    throw new Error(`getNewsById failed with error: ${error}`);
  }
});