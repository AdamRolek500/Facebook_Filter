const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const firestore = require('@google-cloud/firestore');
admin.initializeApp(functions.config().firebase);

exports.analyzePost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const text = req.body;
        res.status(200).send("1");        
    });
});

exports.testingFirestore = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        admin.firestore().collection('users').doc('Adam Rolek').update({testing: 'test'});
        res.status(200).send();        
    });
});