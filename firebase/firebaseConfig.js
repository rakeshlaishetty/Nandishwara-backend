const admin = require('firebase-admin');


const firebaseConfig = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

console.log("-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDJymsLxB6JGi3W\naxtRt653WCZtmqhAl3SbEZmcz877XPThorwo5Clk8idTHJgw3+4dZyeA+ocTcrKI\ne7rAxGM9EcItSQJDGUUj9q+GvdMN2BsUYGIuCvg0Mr78Fbb36SkVMlw+e+KbXTLA\nafCuK/rPL6a23/FXswnGMhlD0/FrRfSknhq0M95CJScEa9758r4xTTMZInhsHZFs\nW7Ek+tQopOmbkVLYqirjWUpJCkDsxn4FNHNSFUWnxrnw702iVSSi6y0gH/dQ+Zyt\noK68CKxAVTI/Xm7JvkLQE2ZOe9PbiUZM6xuwJx4bDDwVGSD0DRqJwgcKlsX+oSbR\n/9J3nd2RAgMBAAECggEABy0Gpx6mfZaHzWOGD18QYiv5Q13r6G6eYd6Ti3AYJqgS\nyQSZC3z4JB/oojfuyVOoR4VF4kw+chSKyOfZ/32IYClF0geR8BYJp3aP/cMZupj+\nFwiZqzSeiJgqoqMozFp/OJLPtRThnUfoXG90BLSZjOU/WOrgLa/HK+Q3ken7QIbW\nWoeuTBOYFW2fl8zKORRu2xgpXAbN71SKaKZRDcWVM/ts4BVLg3GLqO+2OyQ/VojX\n5ACI+4gN5fMlXa3VbuIhEojPotFgYe894MSivqLGbQGn4O9fMe62uZFm/WkE4gAO\nHcp2w4psMDbiV24+FzagjnYqo7Gan4oyvYauO1heYQKBgQDmJBPSO/PZtaoZefgW\nOF9pLdBivYFPkIlUk26MXzEsgX70EdBU25RevGNW1ghjasufyOPGB32YXWOSixXe\nfsjNVmUBVDgIVCKO0lfZEZjhei8p2/qiM/SLwPyYSgMwkQAVaxW7yK6lYTFsVifm\nA95Hwk+B9YysSnRVOea4eOGs8QKBgQDgdts3aJ2ynamQHQoJGSjYPaC5dkwDeaJz\nNpzkuTILYoI5SK38OboIDAkQ8CS1eQH32nAboUUIiWmpbpnsuPNmnHSv4mU0AvGB\nkC06VgoYuBfcl2a5JLvBHrbZWiDoi8+i/I7h8/VsGXItoqlqubsdDUU2J0uE8cwH\nSlmz/pm6oQKBgQDV9Zqb7PMDZ7pxnwx/k/9YKKjA89ABqa2TfNHdHS75Ypcl0F3w\nVoh1Hw34EFqSGxqePcVNOW+RtNk6x6YYSaTkCjszZhoF3DqYr4POomaQ0eiBMSut\nm0HyoAP2jXCzuUrrnrgA8k00Ic0yHFNRrCz+Z+9FMoWLNFk9VuxierfM8QKBgQCg\n0ieQFGFgNvvk6BlnmWIdRFJibrJZjw1oNMnGSjXj2ElrF3qoiweRemYIf7YdWzyg\nwx2tfidCzYkpvreD1qN1ckVcOv29fRphdNYixMBpI4TdJJCRuBLZc9MX+S44zusO\nYJtSooLFV5npvnBZqga48ugSu6as8rz2wDty7chg4QKBgQCy1Hp9VLUwh3xDzGN5\nzibFbqDz4p6J7L8YofpDKb2gWPAJRMcck10Eo9lKZuZSSYv5KRM8C9RJwpacLEca\npZVzUXZiXitnm8U6nHji5Wfvdl6ECR5o2DtMUJUwOX06oRWduhXW1SqG7oyIzhBj\nJ2lB4tZtgBO5DqSVRDakgYd46w==\n-----END PRIVATE KEY-----\n")
console.log(process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),)
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: 'nandishwara-9695d.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
