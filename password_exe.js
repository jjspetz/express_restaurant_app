function creat_hash (password) {
  const pbkdf2 = require('pbkdf2');
const crypto = require('crypto');
var salt = crypto.randomBytes(20).toString('hex');
var key = pbkdf2.pbkdf2Sync(
  password, salt, 36000, 256, 'sha256'
);
var hash = key.toString('hex')

return[hash, salt];
}

var stuff = creat_hash('narf');
var hash = stuff[0];
var salt = stuff[1];
var stored_pass = pbkdf2_sha256$36000$${salt}$${hash}`;

function (stored_pass, password) {
// checking a password
  var pass_parts = stored_pass.split('$');
  var key = pbkdf2.pbkdf2Sync(
    'some-password',
    pass_parts[2],
    parseInt(pass_parts[1]),
    256, 'sha256'
  );
  var hash = key.toString('hex');
  if (hash === pass_parts[3]) {
    console.log('Passwords Matched!');
  }
}
