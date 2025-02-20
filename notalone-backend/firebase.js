const admin = require('firebase-admin');
const serviceAccount = require('./notalone-d7392-firebase-adminsdk-1m78h-ade894b8c1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {admin, db};