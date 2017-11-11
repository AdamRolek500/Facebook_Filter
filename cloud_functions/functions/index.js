const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.analyzePost = functions.https.onRequest((req, res) => {
    const text = req.body;
    res.status(200).send(1);
});