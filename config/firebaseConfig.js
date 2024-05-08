const admin = require('firebase-admin');
const serviceAccount = require('./project-a8a3e-firebase-adminsdk-9w79s-8a996bc798.json');
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
 
module.exports = admin;
 