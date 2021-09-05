const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const { createFunction } = require("../lib/function");

createFunction({
    get: getMetadata
});

async function getMetadata(payload) {
    const authenticator = new IamAuthenticator({
        apikey: payload.apikey
    });

    const service = new CloudantV1({
        authenticator: authenticator
    });

    service.setServiceUrl("https://97201239-ced3-4451-bdaf-57f5a75a0cfe-bluemix.cloudantnosqldb.appdomain.cloud");

    var doc = await service.getDocument({
        db: "metadata",
        docId: "metadata"
    });

    return {
        status: 200,
        body: {
            version: doc.result.version,
            extensions: doc.result.extensions
        }
    };
}