/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

const Twilio = require('twilio');
const { accountSid, authToken } = require('./config.json');

// console.log(accountSid, authToken)

const client = new Twilio(accountSid, authToken);

// can't wait for Top-Level Await
(async function main() {
  try {
    const message = await client.messages.create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: process.env.FROM_NUMBER,
      to: process.env.TO_NUMBER
    });
    console.log(message.sid)
  }
  catch (e) {
    console.error(e);
  }
}());
