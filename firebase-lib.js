const admin = require('./config/firebaseConfig');

async function verifyToken(clientToken) {
     return await admin.auth().verifyIdToken(clientToken);
}

module.exports = verifyToken;
