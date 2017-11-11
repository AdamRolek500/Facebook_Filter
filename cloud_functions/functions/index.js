const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const firestore = require('@google-cloud/firestore');
const document = firestore.doc('posts/intro-to-firestore');
admin.initializeApp(functions.config().firebase);

exports.analyzePost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const text = req.body;
        res.status(200).send({data: 1});        
    })
});



const firestore = new Firestore({
  projectId: 'facebook_filter',
  keyFilename: 'E:\Hackital2017\Facebook Filter-9777f0aec3cc.json',
});



// Enter new data into the document.
document.set({
  title: 'Welcome to Firestore',
  body: 'Hello World',
}).then(() => {
  // Document created successfully.
});

// Update an existing document.
document.update({
  body: 'My first Firestore app',
}).then(() => {
  // Document updated successfully.
});

// Read the document.
document.get().then(doc => {
  // Document read successfully.
});

// Delete the document.
document.delete().then(() => {
  // Document deleted successfully.
});