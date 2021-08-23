'use strict';

const app = require('./lib/app.js');

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

