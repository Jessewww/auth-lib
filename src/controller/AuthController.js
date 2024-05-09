const verifyToken = require('./../../firebase-lib');

/**
 * @description The controller.
 */
module.exports.handler = async (event) => {
  const clientToken = event.headers.Authorization;

  try {
    const decodedToken = await verifyToken(clientToken);
    console.log("##### USER #####");
    console.log(decodedToken.email);
    let active = '';

     active = true; // Do something to check if user is active or similar

    const policy = active ? 'Allow' : 'Deny';
    const response = JSON.stringify({
      user: decodedToken.email
    });

    return generatePolicy('user', policy, event.methodArn, response);
  } catch (error) {
    return generatePolicy('user', 'Deny', event.methodArn, JSON.stringify({
      something: "unathorized"
    }));
  }
};

/**
 * @description Creates the IAM policy for the response.
 */
const generatePolicy = (principalId, effect, resource, data) => {
  const authResponse = {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: [
          'execute-api:Invoke',
          'lambda:InvokeFunction',
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
        ],
        Effect: effect,
        //todo restrict policy
        Resource: '*'
      }]
    },
    context: {
      stringKey: JSON.stringify(data)
    }
  };

  console.log(authResponse.policyDocument.Statement)
  // console.log('authResponse', authResponse);

  return authResponse;  
};