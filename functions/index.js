// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.writeUrl = functions.storage.object().onFinalize((object) => {
  const filePath = object.name;
  const db = admin.firestore();

  db.collection('images').add({
    filePath,
  })
  .then(() => console.log('Done'))
  .catch((e)=> console.log(e)); 
});
