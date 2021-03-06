const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const LanguageServiceClient = require('@google-cloud/language').LanguageServiceClient;
const language = new LanguageServiceClient();
const Vision = require('@google-cloud/vision');
const vision = new Vision();
const firestore = require('@google-cloud/firestore');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const div = req.body.toString().indexOf(' : ');
        var uid = req.body.toString().substring(0, div);
        var name = req.body.toString().substring(div + 3);
        
        if (req.body.toString().indexOf(' : ') < 0) {
            console.log(req.body.toString());
            uid = req.body['userid']
            name = req.body['name']
        }
        
        admin.firestore().collection('users').doc(uid).get().then(doc => {
            if (!doc.exists) {
                
                admin.firestore().collection('users').doc(uid).set({name: name, numOfPosts: 0, positivity: 0}); 
            }
            
            res.status(200).send(); 
        })      
    });
});

exports.updatePositivity = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const div = req.body.toString().indexOf(' : ');
        const uid = req.body.toString().substring(0, div);
        const pos = req.body.toString().substring(div + 3);
                
        admin.firestore().collection('users').doc(uid).get().then(doc => {
            var numOfPosts = doc.data()['numOfPosts'];
            var positivity = doc.data()['positivity'];
            var newPos = ((positivity * numOfPosts) + parseFloat(pos)) / (numOfPosts + 1);  
            admin.firestore().collection('users').doc(uid).update({positivity: newPos, numOfPosts: numOfPosts + 1});
        });
        
        res.status(200).send();        
    });
});

exports.analyzeTextSentiment = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
      const document = {
        content: req.body,
        type: 'PLAIN_TEXT',
      };

      language.analyzeSentiment({document: document}).then(results => {
        const sentiment = results[0].documentSentiment;
        var score = sentiment.score;
        res.status(200).send(score.toString());
      });
  });
});

exports.analyzeImage = functions.https.onRequest((req, res) => {
        cors(req,res, () => {
            const request = {
                source: {
                    imageUri: `https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/22886288_1711257755571945_1288761193480795461_n.jpg?oh=ef8c0d1053cb89ff9907a2c94ee83a21&oe=5AAB2347`
                }
            };
        vision.safeSearchDetection(request).then((results) => {

        const detections = results[0].safeSearchAnnotation;
        res.status(200).send('[{ "adult" : "' + detections.adult + '",  "violence" : "' + detections.violence + '" }]');
      })
    });
});