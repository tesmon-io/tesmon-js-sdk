const http = require('http');
const https = require('https');

const DEFAULT_TIMEOUT = 5000;

/**
 * This class provides methods to send events to Tesmon.
 */

class DefaultTesmonEventClient  {
    constructor(tesmonTreBaseUrl = process.env.TESMON_TRE_BASE_URL) {
        if (!tesmonTreBaseUrl) {
          throw new Error('Tesmon Test Run Engine base URL is null or empty');
        }
        this.tesmonTreBaseUrl = tesmonTreBaseUrl;
      }
  
   /**
   * Sends an event to Tesmon.
   *
   * @param {string} eventKey Unique event key to use for the event.
   * @param {JSONObject} eventBody An object representing the body of the event.
   * @returns {Promise<string>} A Promise that resolves with a JSON string containing the "eventId" field with the ID of the created event, or a "message" field with the error message if the event could not be created or sent.
   */

    sendEvent(eventKey, eventBody) {
      return new Promise((resolve, reject) => {
        const url = `${this.tesmonTreBaseUrl}/v1/events`;
  
        const event = {
          eventKey: eventKey,
          eventBody: eventBody,
          createdAt: Date.now(),
        };
  
        const payload = JSON.stringify(event);
  
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
          timeout: DEFAULT_TIMEOUT,
        };
        
        const httpModule = url.startsWith('https') ? https : http;
  
        const req = httpModule.request(url, options, (res) => {
          let responseBody  = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            responseBody  += chunk;
          });

          res.on('end', () => {
            if (res.statusCode !== 200) {
              console.error(`Failed to send event. HTTP status code: ${res.statusCode}, body: ${responseBody}`);
              reject(new Error(`Failed to send event. HTTP status code: ${res.statusCode}`));
              return;
            }
  
            resolve(responseBody);
          });
        });
  
        req.on('error', (err) => {
            console.error(`Failed to send event. Error: ${error.message}`);
            reject(err);
        });

        req.on('timeout', () => {
            console.error(`Failed to send event. Request timed out after ${DEFAULT_TIMEOUT}ms`);
            req.destroy();
            reject(new Error(`Failed to send event. Request timed out after ${DEFAULT_TIMEOUT}ms`));
          });
  
        req.write(payload);
        req.end();
      });
    }
  }
  
  module.exports = DefaultTesmonEventClient;
  