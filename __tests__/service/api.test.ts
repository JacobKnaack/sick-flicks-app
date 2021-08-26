import { sickFlickApp } from '../../src/app';
import * as base64 from 'base-64';
import jwt from 'jsonwebtoken';

const API_SECRET: string = process.env.API_SECRET || 'SECRET_STRING_FOR_TESTING';

describe('Testing Sick Flicks Web Services', () => {

  const testUser = {
    "email": "test@test.com",
    "password": "testing"
  }

  const testProfile = {
    "username": "tester",
    "user_id": null,
  }

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

  const testComment = {
    "review_id": null,
    "profile_id": null,
    "content": "Here is some content"
  }

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
    testReview.profile_id = profile._id;
    testComment.profile_id = profile._id;
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
    testComment.review_id = review._id;
  });

  it('A User should be able to to create a review using a Bearer token', async () => {
    const token = jwt.sign({ email: testUser.email}, API_SECRET);

    const review = await sickFlickApp.api.service('reviews').create(testReview, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(review._id).toBeTruthy();
    expect(review.title).toEqual(testReview.title);
  });

  it('Movie service shuold be able to review Reviews associated with Movie', async () => {
    const movie = await sickFlickApp.api.service('movies').get(testMovieId, {
      query: { $populate: 'reviews'} 
    });

    expect(movie).toBeDefined();
    expect(movie.reviews).toBeDefined();
    expect(movie.reviews.length).toBe(2);
  });

  it('A User should be able to create a comment', async () => {
    const token = jwt.sign({ email: testUser.email}, API_SECRET);
    const comment = await sickFlickApp.api.service('comments').create(testComment, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    expect(comment).toBeDefined();
    expect(comment.content).toEqual(testComment.content);
  });

  it('Reviews should bbe able to retrieve associated comments', async () => {
    const reviews = await sickFlickApp.api.service('reviews').find({
      query: {$populate: 'comments'}
    });

    expect(reviews).toBeDefined();
    expect(reviews.total).toBe(2);
    expect(reviews.data[0].comments).toBeDefined();
  });
});

