<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

# Room Reset Function 
## Overview
The Room Reset Function is a Lambda script designed to reset unit settings and endpoint configurations to desired values, adaptable for various vertical including hospitality, senior living, and healthcare. Recognizing the importance of maintaining a standardized environment across different property types, this function automates the process of resetting various settings and configurations associated with an Alexa device in a room. By resetting these settings to default or predetermined values, it ensures a clean, standardized, and personalized-free environment for each new guest or resident, contributing to an enhanced experience and operational efficiency across different sectors

#### Why We need it 
In various environments where guests or users interact with smart devices, customization of settings such as alarms, reminders, volume levels, language preferences, and more is common. However, if these custom settings were to remain unchanged for the next user, they could negatively impact their experience. For instance, the next user might encounter alarms or reminders set by the previous user, causing disruption and inconvenience. Therefore, the Room Reset Function plays a crucial role in ensuring a seamless transition between users by resetting these settings to default or predetermined values, creating a clean and personalized-free environment for each new interaction.

The Room Reset Lambda Function addresses this challenge by automating the reset process for the following functions:
1. Delete Alarms: Clears any existing alarms set by the previous guest.
2. Delete Reminders: Removes reminders set by the previous guest.
3. Delete Timers: Clears timers set by the previous guest.
4. Set Volume: Adjusts the volume level to default settings.
5. Set Do Not Disturb: Disables Do Not Disturb mode to ensure the new guest receives notifications.
6. Set Locales: Resets language preferences to default settings.
7. Set Wake Words: Resets wake word preferences to default settings.
8. Set Time Zone: Adjusts the time zone to the hotel's location.
9. Set Temperature Unit: Resets temperature units to default settings.
10. Set Distance Units: Resets distance units to default settings.
11. Delete Notifications: Clears any notifications left from the previous guest.
12. Unpair Bluetooth: Removes any Bluetooth pairings from the device.

The Room Reset Lambda Function plays a crucial role in enhancing guest satisfaction, optimizing property operations, and providing a seamless experience for both guests and staff. Property owners can integrate this function with their Property Management System (PMS) to automate essential tasks. By automatically running this function upon guest checkout, the Room Reset Lambda Function ensures that room settings are reset to default or predetermined values, contributing to enhanced guest satisfaction and operational efficiency.

#### Room Reset Architecture Diagram
![image](https://github.com/alexa-smart-properties/script-sample-nodejs-unit-reset/assets/152776243/11c71332-3b04-4989-9157-15424b84c8f9)

## Pre-Requisites
Before using this Lambda function, ensure the following prerequisites are met:
1. AWS Account: Developer must have an AWS account to deploy and manage Lambda functions.
2. AWS CLI: Install and configure the AWS Command Line Interface (CLI) to interact with AWS services from the command line.
3. Node.js: Install Node.js and npm (Node Package Manager) on local machine.
4. Alexa Developer Account: Obtain an Alexa Developer account to access the Alexa API.
5. Access Token: Acquire an access token from the Login with Amazon (LWA) service for authorization to access the Alexa API.

## Install and Configuration
Follow these steps to install and configure the Room Reset Lambda Function:
1.	Clone the Repository: Clone or download this repository to local machine.
2.	Install Dependencies: Navigate to the project directory and run npm install to install the required dependencies.
3.	Secrets Manager Configuration : Set up a secret in AWS Secrets Manager containing the necessary OAuth credentials. The secret should include the following keys:
    * lwa-refresh-token: Refresh token for OAuth.
    * lwa-client-id: Client ID for OAuth.
    * lwa-client-secret: Client secret for OAuth.
    * lwa-auth-scope: OAuth scope.
4.	Lambda Deployment: Deploy the Lambda function to AWS Lambda using the AWS CLI or AWS Management Console. Ensure that the execution role for the Lambda function has permissions to access AWS Secrets Manager.

## Files
1.	index.js:
    * Lambda function handler.
    * Retrieves the unitId from the incoming event, obtains the access token using accessTokenHelper.js, and triggers the reset process using alexaResetApi.js.
2.	alexaResetApi.js:
    * Functions for interacting with the Alexa API to reset alarms, reminders, and timers associated with a specific unit (room).
    * Exported function resetUnit is used to perform the reset operation.
3.	accessTokenHelper.js:
    * Functions for retrieving OAuth credentials and obtaining the access token required for authorization.
    * Exported function getAspAccessToken is used to fetch the access token.
4. Configuration.js :
    * This configuration object sets default values for various parameters used in the application. Customers can adjust these values as needed for their specific requirements.
    * For additional options and values, please refer to the documentation at https://developer.amazon.com/en-US/docs/alexa/alexa-smart-properties/endpoint-api.html#api-endpoint.

## Input Parameter
The Lambda function can be invoked with the necessary parameters to reset the Alexa device in a room.
Input parameter:
1. unitId: The ID of the Alexa device for which the reset should be performed.

Invoke the Lambda function with the required parameters. The function expects the unitId to be passed as input

## Uploading code to lambda
1.	Zip the entire project directory, ensuring that the node_modules directory and package.json file are included.
2.	Go to the AWS Lambda console.
3.	Click on "Create function" and select "Author from scratch".
4.	Enter a name for function, choose Node.js as the runtime, and select an appropriate execution role.
5.	Click on "Create function".
6.	Scroll down to the "Function code" section, and select "Upload a .zip file" in the "Code entry type" dropdown.
7.	Upload the zip file containing Lambda function code.
8.	Set the handler to index.handler (assuming main handler function is in index.js).
9.	Click on "Save" to upload the code.

## Creating a test event in lambda
To test the Lambda function, create a test event in the AWS Lambda console and provide unit id (room id) as JSON data:
{
  "unitId": "amzn1.alexa.unit.did.XXXXX"
}

## Intergration with Property Checkout event 
The integration of the Room Reset Lambda Function with the Property Management System (PMS) is vital for automating room reset tasks, although specifics may vary based on the PMS used by each property. However, overall integration typically involves the following steps:
1.	Identify Event Triggers: Determine the appropriate event trigger within your PMS that indicates a guest checkout event. This trigger will initiate the room reset process. If your PMS supports event notifications or webhooks, configure these to notify the Room Reset Lambda Function whenever a guest checks out.
2.	Handle Event Payloads: Parse and extract relevant information from the payload sent by the PMS upon a guest checkout event. This information should include room IDs, only data needed for the room reset process.
3.	Invoke Room Reset Function: Upon receiving the event payload, invoke the room reset function within your Lambda Function. Pass along the necessary parameters retrieved from the PMS payload to execute the reset operation.
## License
This library is licensed under the MIT-0 License. See the LICENSE file.
## Security
See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.
