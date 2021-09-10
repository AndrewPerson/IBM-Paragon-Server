const admin = require('firebase-admin');
const { createFunction } = require("../lib/function");

createFunction({
    get: getMetadata
});

async function getMetadata(payload) {
    if (admin.apps.length == 0) {
        admin.initializeApp({
            credential: admin.credential.cert(payload.firebase_credential)
        });
    }
    
    var firestore = admin.firestore();

    var metadataDoc = await firestore.doc("Metadata/Metadata").get();

    var data = metadataDoc.data();

    return {
        statusCode: 200,
        body: {
            version: data.Version,
            extensions: data.Extensions
        }
    };
}