import { Promise } from "es6-promise";

/**
 * This interface provides methods to send events to Tesmon.
 */
class TesmonEventClient {
  /**
   * Sends an event to Tesmon.
   *
   * @param {string} eventKey Unique event key to use for the event.
   * @param {orgJson.JSONObject} eventBody A JSON object representing the body of the event.
   * @returns {Promise<string>} A Promise that resolves with a JSON string containing the "eventId" field with the ID of the created event, or a "message" field with the error message if the event could not be created or sent.
   */
  sendEvent(eventKey, eventBody) {
    return new Promise((resolve, reject) => {
      // Code to send event to Tesmon using the eventKey and eventBody
      // Once the event is sent, call resolve with the JSON string
      // containing the eventId, or reject with the error message.
    });
  }
}