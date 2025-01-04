const crypto = require('crypto');

const username = 'roland';
const passwordString = 'rhinos';

// hash the password
const password = crypto.createHash('sha256').update(passwordString).digest('hex');
const auth = Buffer.from(`${username}:${password}`).toString('base64');

// request a token
const body = JSON.stringify({
  auth
});

fetch('http://localhost:3000/auth', {
  method: 'POST',
  body,
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let evalString = '';
    evalString += `export TOKEN=${data.data.token};`;
    evalString += 'echo "set TOKEN successfully";';
    evalString += `export HEADERS="Authorization: Bearer ${data.data.token}";`;
    evalString += 'echo "set HEADERS successfully";';
    process.stdout.write(evalString);
  })
  .catch(() => {
    process.stdout.write('export TOKEN=1; echo "failed to set token"');
  });
