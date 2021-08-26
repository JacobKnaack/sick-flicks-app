import { sickFlickApp } from "../../src/app";

describe('Testing notAllowed routes return appropriate error handling', () => {

  it('Login service returns error code 405 on find', async () => {
    try {
      const users = await sickFlickApp.api.service('login').find();
      expect(users).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
      expect(e.message).toEqual('Method Not Allowed');
    }
  });

  it('Login service returns error code 405 on fetch by Id', async () => {
    try {
      const users = await sickFlickApp.api.service('login').get('12345');
      expect(users).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
    }
  });

  it('Login service returns error code 405 on update', async () => {
    try {
      const users = await sickFlickApp.api.service('login').update('12345', {email: 'new email'});
      expect(users).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
    }
  });

  it('Login service returns error code 405 on patch', async () => {
    try {
      const users = await sickFlickApp.api.service('login').patch('12345', {email: 'test'});
      expect(users).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
    }
  });

  it('Login service returns error code 405 on delete', async () => {
    try {
      const user = await sickFlickApp.api.service('login').remove('12345');
      expect(user).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
    }
  });

  it('Register service returns error code 405 on find', async () => {
    try {
      const users = await sickFlickApp.api.service('register').find();
      expect(users).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
      expect(e.message).toEqual('Method Not Allowed');
    }
  });
  it('Register service returns error code 405 on fetch by Id', async () => {
    try {
      const users = await sickFlickApp.api.service('register').get('12345');
      expect(users).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
      expect(e.message).toEqual('Method Not Allowed');
    }
  });
  it('Register service returns error code 405 on update', async () => {
    try {
      const users = await sickFlickApp.api.service('register').update('12345', {email: 'test', password: 'test'});
      expect(users).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
      expect(e.message).toEqual('Method Not Allowed');
    }
  });
  it('Register service returns error code 405 on patch', async () => {
    try {
      const users = await sickFlickApp.api.service('register').patch('12345', {email: 'testing'});
      expect(users).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
      expect(e.message).toEqual('Method Not Allowed');
    }
  });
  it('Register service returns error code 405 on remove', async () => {
    try {
      const users = await sickFlickApp.api.service('register').remove('12345');
      expect(users).not.toBeDefined();
    } catch (e) {
      expect(e.code).toEqual(405);
      expect(e.message).toEqual('Method Not Allowed');
    }
  });
});
