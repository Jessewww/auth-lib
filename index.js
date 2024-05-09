
const { handler }= require('./src/controller/AuthController');

const event = (process.env.Authorization) 
  ? {
      headers: {
        Authorization: process.env.Authorization
      },
      requestContext: {
        resourcePath: '/your/resource/path',
        httpMethod: 'GET'
      }
    }
  : {
      headers: {
        Authorization: 'token'
      },
      requestContext: {
        resourcePath: '/your/resource/path',
        httpMethod: 'GET'
      }
    };


handler(event, null, (error, response) => {
  if (error) {
    console.error('error:', error);
  } else {
    console.log('response:', response);
  }
});