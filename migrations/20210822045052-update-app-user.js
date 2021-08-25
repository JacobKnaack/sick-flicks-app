'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    const users = await db.collection.get('users').find({}).toArray();
    const operations = users.map(async user => {
      let tempPass = await bcrypt.hash(process.env.TEMP_PASSWORD, 10);
      return db.collection('users').updateOne({_id: user._id}, {
        $unset: {
          tokenSeed: null,
          passwordHash: null,
          username: null,
          isNitPicker: null
        },
        $set: {
          password: tempPass,
        }
      });
    });
    return Promise.all(operations);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return Promise.resolve('Unable to revert Users');
  }
};
