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

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const { MessagingResponse } = require('twilio').twiml;
const { WebClient } = require('@slack/client');

const slackToken = process.env.SLACK_TOKEN;

const web = new WebClient(slackToken);

exports.smsReceive = async (req, res) => {
  const body = req.body.Body;

  console.log(`received sms message: ${body}`);

  const twiml = new MessagingResponse();
  
  try {
    await web.chat.postMessage({
      channel: process.env.SLACK_REPORTER,
      text: `<!channel> report received\n\n${body}`,
    });

    console.log('message forwarded to team');

    twiml.message('Our team has been notified of your anonymous report. If you feel comfortable please approach core team directly for follow up.');
  }
  catch (e) {
    console.error('message not forwarded to team');
    console.error(e);
    twiml.message('There was an error sending your message, please try again later.');
  }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};
