const DefaultTesmonEventClient = require('../src/DefaultTesmonEventClient');

describe('DefaultTesmonEventClient', () => {
  describe('sendEvent', () => {
    const tesmonTreBaseUrl = 'http://tesmon-tre-url.com';
    let tesmonEventClient;
    let sendEventSpy;

    beforeEach(() => {
      tesmonEventClient = new DefaultTesmonEventClient(tesmonTreBaseUrl);
      sendEventSpy = jest.spyOn(tesmonEventClient, 'sendEvent');
    });

    afterEach(() => {
      sendEventSpy.mockRestore();
    });

    it('should send an event to Tesmon', async () => {
      const eventKey = 'my-event-key';
      const eventBody = { key1: 'value1', key2: 'value2' };

      const expectedResponse = { eventId: '12345' };
      sendEventSpy.mockResolvedValue(JSON.stringify(expectedResponse));

      const response = await tesmonEventClient.sendEvent(eventKey, eventBody);

      expect(sendEventSpy).toHaveBeenCalledWith(eventKey, eventBody);
      expect(response).toEqual(JSON.stringify(expectedResponse));
    });

    it('should handle errors when sending an event', async () => {
      const eventKey = 'my-event-key';
      const eventBody = { key1: 'value1', key2: 'value2' };
      const errorMessage = 'Failed to send event';

      sendEventSpy.mockRejectedValue(new Error(errorMessage));

      try {
        await tesmonEventClient.sendEvent(eventKey, eventBody);
      } catch (error) {
        expect(sendEventSpy).toHaveBeenCalledWith(eventKey, eventBody);
        expect(error.message).toEqual(errorMessage);
      }
    });
  });
});
