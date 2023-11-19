import mongoose from 'mongoose';
require('dotenv').config();

import { app } from './app';

async function start() {
  try {
    const requiredVariables = ['MONGODB_PASSWORD'];
    const missingVariables = [];
    for (const variable of requiredVariables) {
      if (!process.env[variable]) {
        missingVariables.push(variable);
      }
    }

    if (missingVariables.length > 0) {
      console.warn(
        `Warning: The following required environment variables are missing or undefined: ${missingVariables.join(
          ', '
        )}`
      );
    }

    try {
      await mongoose.connect(
        `mongodb+srv://ritikbheda:${process.env.MONGODB_PASSWORD}@cluster0.xts4n4t.mongodb.net/database?retryWrites=true&w=majority`
      );
      console.log('connected to mongoDB');
    } catch (err) {
      console.error(err);
    }

    app.listen(3001, () => {
      console.log('app listening to 3001');
    });
  } catch {}
}

start().catch(console.dir);
