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

const REGION = 'your-region';
const PROJECT_NAME = 'your-project-name';
const FUNCTION_NAME = 'deployed-function-name'

fetch(`https://${REGION}-${PROJECT_NAME}.cloudfunctions.net/${FUNCTION_NAME}`, {
  method: "POST",
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => {
    return response.text();
  })
  .then(text => {
    console.log(text);
  })
  .catch(error => {
    console.log(error)
  });