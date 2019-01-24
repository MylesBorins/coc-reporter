# COC Reporter

> Twilio -> GCF -> Slack

## Instructions

This is all assuming you have the following setup:

* git
* A Google Cloud Project
* `gcloud` cli team properly configured
* Node.js + npm setup locally
* A slack app
* A twilio app and phone number

If you need help getting started with Google Cloud please consult [this tutorial](https://cloud.google.com/functions/docs/quickstart)

if you need help getting started with the Twilio api please consult [this tutorial](https://www.twilio.com/docs/sms/quickstart/node)

If you need help getting start with a Slack APP please consult [this tutorial]()

You can download Node.js from [the projects website](https://nodejs.org/en/download/), although you may want to consider using a version manager such as [nvm](https://github.com/creationix/nvm)

```sh
$ git clone https://github.com/mylesborins/coc-reporter
$ npm install
$ cp .env-example.yaml .env.yaml
# put your slack API token into the yaml
$ gcloud functions deploy sms-receive --env-vars-file .env.yaml --runtime=nodejs10 --project=$PROJECT_ID --trigger-http
# you now will want to put the resulting URL into the Twilio console as the POST endpoint for the webhook
# the url will look something like https://$REGION-$PROJECT.cloudfunctions.net/sms-receive 
```

Send a text and test that it works. There is a bit of wiring that is neccessary between the Twilio Console and the Slack Console to get these things wired up. Please feel to open issues if you are stuck, but hopefully the above tutorials should be sufficient. Prehaps I should make a blog post about this
