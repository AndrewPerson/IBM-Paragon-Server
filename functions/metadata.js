const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

global.main = get;

async function get(payload) {
    const authenticator = new IamAuthenticator({
        apikey: payload.apikey
    });

    const service = new CloudantV1({
        authenticator: authenticator
    });

    service.setServiceUrl("https://97201239-ced3-4451-bdaf-57f5a75a0cfe-bluemix.cloudantnosqldb.appdomain.cloud");

    var doc = await service.getDocument(resource.cloudant);

    var result = {};

    resource.fields.forEach(field => result[field] = doc.result[field]);

    return {
        status: 200,
        body: result
    };
}