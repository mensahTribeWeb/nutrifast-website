const fs = require('fs');
const environmentConfig = `
  export const environment = {
    production: true,
    apiUrl: '${process.env['API_URL']}',
    firebase: {
    projectId: 'nutrifast-716d5',
    appId: '1:883034698437:web:e387dd750a6fc388eae749',
    storageBucket: 'nutrifast-716d5.appspot.com',
    apiKey: 'AIzaSyCNfTrI00sw2V5h3aHWo9EdGHkPYuDuA2s',
    authDomain: 'nutrifast-716d5.firebaseapp.com',
    messagingSenderId: '883034698437',
    measurementId: 'G-TZ5HEBXYD5',
  },
  };
`;
fs.writeFileSync('./src/environments/environment.prod.ts', environmentConfig);
