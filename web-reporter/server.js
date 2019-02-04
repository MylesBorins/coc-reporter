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

const { WebClient } = require('@slack/client');

const slackToken = process.env.SLACK_TOKEN;
const channel = process.env.SLACK_CHANNEL;

const web = new WebClient(slackToken);

function corsOptions(req, res) {
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');
  res.status(204).send('');
}

exports.websiteReceive = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    console.log('received options request');
    corsOptions(req, res);
    console.log('options response sent');
    return;
  }

  const {report} = req.body;

  let response;

  console.log(`received sms message: ${report}`);

  try {
    await web.chat.postMessage({
      channel: channel,
      text: `<!channel> report received from web form\n\n${report}`,
    });

    console.log('message forwarded to team');

    response = 'Our team has been notified of your anonymous report. If you feel comfortable please approach core team directly for follow up.';
  }
  catch (e) {
    console.error('message not forwarded to team');
    console.error(e);
    response = 'There was an error sending your message, please try again later.';
  }
  res.status(200);
  res.end(response);
};
