import { ClientAppModel, ApiKeyModel } from "../../src/mongo";
import uuidApiKey from 'uuid-apikey';

describe('Testing the Client App and Api Key Models', () => {

  const testApp = {
    name: 'Test App',
    domains: ['http://localhost:3000']
  }
  let testAppId : string;
  let testKey : string;

  describe('Client App Modules', () => {

    it('Should be able to create a new Client Application', async () => {
      const app = await ClientAppModel.create(testApp);
  
      expect(app).toBeDefined();
      expect(app.name).toEqual(testApp.name);
      expect(app.domains).toBeTruthy();
      expect(app.domains[0]).toEqual(testApp.domains[0]);
      testAppId = app._id;
    });
  
    it('Should be able to update Client Instance', async () => {
  
      // options: { new: true} - returns the result of the update.
      const app = await ClientAppModel.findByIdAndUpdate(testAppId, {
        name: 'My Super Sweet App'
      }, { 
        new: true 
      });
  
      expect(app).toBeDefined();
      if (app) {
        expect(app.name).toEqual('My Super Sweet App');
      }
    });
  });

  describe('Api Key Modules', () => {
    
    it('Should be able to generate an Api Key from a Client Id', async () => {
      const key = await ApiKeyModel.generateKey(testAppId);

      expect(key).toBeDefined();
      expect(uuidApiKey.isAPIKey(key)).toBeTruthy();
      testKey = key;
    });

    it('Client model should query included Hashed API keys', async () => {
      const client  = await ClientAppModel.findOne({ _id: testAppId }).populate('api_key');

      expect(client).toBeTruthy();
      if(client) {
        expect(client.api_key).toBeDefined();
        expect(client.api_key._id).toBeDefined();
      }
    });

    // it('API Key should be able to authenticate When Client ID and Key are presented', async () => {
    //   const isValidClient = await ApiKeyModel.authenticateKey(testAppId, testKey);

    //   expect(isValidClient).toBeTruthy();
    // });
  });
});
