const { StreamPermission } = require('streamr-client');
const StreamrClient = require('streamr-client');

// run this script in your console like this:
// npm install
// node create-stream.js

const STREAM_ID = '/foo/bar';
const PRIVATE_KEY = 'your-private-key-with-MATIC';
// addresses you want to allow to *write* data to your stream
// the public address of your private key has this permission automatically
const PUBLISH_PERMISSIONS = [
  {
    user: '0x2f81Af...',
    permissions: [StreamPermission.PUBLISH],
  },
  {
    user: '0xF3B4f4...',
    permissions: [StreamPermission.PUBLISH],
  },
];

// Addresses you want to allow to *read* data from your stream
// The public address of your private key has this permission automatically
const SUBSCRIBE_PERMISSIONS = [
  {
    user: '0x2f81Af...',
    permissions: [StreamPermission.SUBSCRIBE],
  },
  {
    user: '0xF3B4f4...',
    permissions: [StreamPermission.SUBSCRIBE],
  },
];

const main = async () => {
  // the streamr client will sign messages with the provided private key
  const streamr = new StreamrClient({
    auth: { privateKey: PRIVATE_KEY },
  });

  try {
    // here we create a stream you can read and write messages from/to
    const stream = await streamr.getOrCreateStream({ id: STREAM_ID });

    // to be able to read and write we need to set permissions.
    // you can change this at any time with the admin address (the private key you provided)
    await streamr.setPermissions({
      streamId: STREAM_ID,
      assignments: PUBLISH_PERMISSIONS.concat(SUBSCRIBE_PERMISSIONS),
    });
    console.log('success. StreamID:', stream.id);
    console.log('Save the stream id somewhere. You will need it later.');
  } catch (e) {
    console.error(e);
    console.log('failed');
  }
};

main();
