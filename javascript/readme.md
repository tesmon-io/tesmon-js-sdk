DefaultTesmonEventClient SDK
The DefaultTesmonEventClient SDK provides a class to send events to Tesmon Test Run Engine (Tre).

Installation
To use the SDK, you need to have Node.js installed. Once you have Node.js installed, you can install the SDK using npm.

npm install tesmon-event-client

Usage
To use the SDK, you need to create an instance of the DefaultTesmonEventClient class and call its sendEvent method. The sendEvent method takes two parameters: the eventKey parameter, which is a unique identifier for the event, and the eventBody parameter, which is an object representing the body of the event. The sendEvent method returns a Promise that resolves with a JSON string containing the "eventId" field with the ID of the created event, or a "message" field with the error message if the event could not be created or sent.

Sample usage

const DefaultTesmonEventClient = require('tesmon-event-client').default;

const tesmonTreBaseUrl = 'http://tesmon-tre-url.com';
const tesmonEventClient = new DefaultTesmonEventClient(tesmonTreBaseUrl);

const eventKey = 'my-event-key';
const eventBody = { key1: 'value1', key2: 'value2' };

tesmonEventClient.sendEvent(eventKey, eventBody)
    .then(response => {
        console.log(`Event sent successfully. Response: ${response}`);
    })
    .catch(error => {
        console.error(`Error sending event: ${error}`);
    });


Constructor Parameters
The constructor of the DefaultTesmonEventClient class takes one optional parameter: tesmonTreBaseUrl. This parameter is the base URL of the Tesmon Test Run Engine (Tre) to which the events will be sent. If this parameter is not provided, the SDK will look for the TESMON_TRE_BASE_URL environment variable and use its value as the base URL.

If neither the tesmonTreBaseUrl parameter nor the TESMON_TRE_BASE_URL environment variable is provided, an error will be thrown.

Event Payload
The sendEvent method creates an event payload with the following fields:

eventKey: The unique identifier for the event.
eventBody: The object representing the body of the event.
createdAt: The timestamp at which the event was created.
The event payload is then sent to Tesmon Test Run Engine (Tre) using an HTTP POST request.

Error Handling
If an error occurs while sending the event, the sendEvent method returns a Promise that is rejected with an error message. The error message provides information about the cause of the error.

Common errors that can occur are:

Tesmon Test Run Engine base URL is null or empty: This error is thrown if the tesmonTreBaseUrl parameter is not provided and the TESMON_TRE_BASE_URL environment variable is not set.
Failed to send event. HTTP status code: <status_code>: This error is thrown if the Tesmon Test Run Engine (Tre) returns an HTTP status code other than 200.
Failed to send event. Error: <error_message>: This error is thrown if an error occurs while making the HTTP request to Tesmon Test Run Engine (Tre).
Failed to send event. Request timed out after <timeout>ms: This error is thrown if the HTTP request to Tesmon Test Run Engine (Tre) times out.

Timeout
The sendEvent method has a default timeout of 5000ms. If the HTTP request to Tesmon Test Run Engine