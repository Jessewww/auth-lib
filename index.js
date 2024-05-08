
const { handler }= require('./src/controller/AuthController');

const event = (process.env.Authorization) 
  ? {
      headers: {
        Authorization: process.env.Authorization // Postavite token koji želite da testirate
      },
      requestContext: {
        resourcePath: '/your/resource/path',
        httpMethod: 'GET'
      }
    }
  : {
      headers: {
        Authorization: 'token' // Postavite token koji želite da testirate
      },
      requestContext: {
        resourcePath: '/your/resource/path',
        httpMethod: 'GET'
      }
    };

console.log(event);

handler(event, null, (error, response) => {
  if (error) {
    console.error('error:', error);
  } else {
    console.log('response:', response);
  }
});