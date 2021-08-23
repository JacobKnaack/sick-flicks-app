import { sickFlickApp } from '../src/app';
import { connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { startConnection, stopConnection } from '../src/mongo/lib';
import * as base64 from 'base-64';

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const uri: string = server.getUri();
  await startConnection(uri);
});
afterAll(async () => {
  if (connection.readyState === 1) {
    await server.stop();
  }
  
  await stopConnection();
});

describe('Testing Sick Flicks Web Services', () => {

  const testUser = {
    "email": "test@test.com",
    "password": "testing"
  }

  const testProfile = {
    "username": "tester",
    "user_id": null,
  }
  let testProfileId: string;

  const testMovie = {
    "title": "test",
    "image": "https://miro.medium.com/max/1584/1*D65gXrmIGWTHJ8RMCsSjHA.jpeg",
    "release": new Date(),
    "movie_db_id": "1234567"
  }
  let testMovieId: string;

  const testReview = {
    "title": "test review",
    "profile_id": null,
    "movie_id": null,
    "html": "<h2>There is a heading here</h2><p>There is some text here</p>"
  }
  // let testReviewId: string;

  it('Movie service should be registered', () => {
    const movieService = sickFlickApp.api.service('movies');

    expect(movieService).toBeTruthy();
  });

  it('Movie service should fetch movies from Mongo', async () => {
    const movies = await sickFlickApp.api.service('movies').find();
  
    expect(movies).toBeTruthy();
    expect(movies.total).toBe(0);
  });

  it('Movie service should be able to create a new Movie', async () => {
    const movie = await sickFlickApp.api.service('movies').create(testMovie);
    
    expect(movie).toBeTruthy();
    expect(movie.title).toEqual(testMovie.title);
    expect(movie.release).toEqual(testMovie.release);
    expect(movie.image).toEqual(testMovie.image);

    testMovieId = movie._id;
    testReview.movie_id = movie._id;
  });

  it('Review service should be registered', async () => {
    const reviewService = sickFlickApp.api.service('reviews');

    expect(reviewService).toBeTruthy();
  });
  it('Should fetch all Reviews', async () => {
    const reviews = await sickFlickApp.api.service('reviews').find()

    expect(reviews).toBeTruthy();
    expect(reviews.total).toBe(0);
  });

  it ('should be able to register a User and Create a Profile', async () => {
    const profile = await sickFlickApp.api.service('register').create(testUser);

    expect(profile.username).toEqual(testUser.email);
    expect(profile.image).toEqual(null);
    testProfile.user_id = profile.user_id;
    testProfileId = profile._id;
    testReview.profile_id = profile._id;
  });

  it ('A User should be able to sign into their profile', async () => {
    const basicAuthString = base64.encode(`${testUser.email}:${testUser.password}`);
    const profile= await sickFlickApp.api.service('login').create({}, { 
      headers: { 
        Authorization: `Basic ${basicAuthString}`
      }
    });

    expect(profile.username).toEqual(testUser.email);
  });

  it('A User with a Profile should be able to create a Review', async () => {
    const basicAuthString = base64.encode(`${testUser.email}:${testUser.password}`);

    const review = await sickFlickApp.api.service('reviews').create(testReview, {
      headers: {
        Authorization: `Basic ${basicAuthString}`
      }
    });

    expect(review.title).toEqual(testReview.title);
    expect(review.html).toEqual(testReview.html);
  });
});

