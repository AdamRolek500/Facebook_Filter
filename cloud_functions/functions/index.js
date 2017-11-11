const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.analyzePost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const text = req.body;
        res.status(200).send({data: 1});        
    })
});