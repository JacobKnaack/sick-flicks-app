import { UserModel, ProfileModel, MovieModel, ReviewModel, CommentModel } from '../src/mongo';
import { connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { startConnection, stopConnection } from '../src/mongo/lib'; 

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

describe('testing the mongo interface', () => {

  const testUser = {
    email: 'test@test.com',
    password: 'test',
  }
  let testUserId: string | null;

  const testProfile: {
    username: string, user_id: null | string
  } = {
    username: 'test name',
    user_id: null,
  }
  let testProfileId: string | null;

  const testMovie: {
    title: string, release: Date, movie_db_id: string, image: string
  } = {
    title: 'test',
    release: new Date(),
    movie_db_id: '1234567890',
    image: 'test.png'
  }
  let testMovieId: string | null;

  const testReview: {
    title: string, html: string, image: string, movie_id: string | null, profile_id: string | null
  } = {
    title: 'Test Review',
    html: '<p>Test</p>',
    image: 'review.png',
    movie_id: null,
    profile_id: null,
  }
  let testReviewId: string | null;

  const testComment: {
    review_id: string | null, profile_id: string | null, content: string
  } = {
    review_id: null,
    profile_id: null,
    content: 'Test test',
  }
  let testCommentId: string | null;

  it('should be able to create a User', async () => {

    const user = await UserModel.create(testUser);
    
    expect(user.email).toBeTruthy();
    expect(user.password).toBeTruthy();
    expect(user.password).not.toEqual(testUser.password);
    expect(user.token).toBeTruthy();

    testUserId = user._id;
    testProfile.user_id = user._id;
  });

  it('should be able to authenticate an email and password', async () => {
    const user = await UserModel.authenticateBasic(testUser.email, testUser.password);

    expect(user.email).toEqual(testUser.email);
  });

  it('should be able to create a Profile', async () => {
    const profile = await ProfileModel.create(testProfile);

    expect(profile.username).toEqual(testProfile.username);
    expect(profile.user_id).toBeTruthy();
    expect(profile.likes).toBe(0);
    expect(profile.dislikes).toBe(0);
    expect(profile.image).toBe(null);

    testProfileId = profile._id;
    testReview.profile_id = profile._id;
    testComment.profile_id = profile._id;
  });

  it('Should fetch a User and include their Profile if one exists', async () => {

    const user1 = await UserModel.findOne({_id: testUserId }).populate('profile');

    expect(user1).toBeDefined;
    expect(user1).toBeTruthy();
    expect(user1?._id).toBeTruthy();
    expect(user1?.profile?.username).toEqual(testProfile.username);    
    
  });

  it('Should create a Movie', async () => {
    const movie = await MovieModel.create(testMovie);

    expect(movie).toBeDefined();
    expect(movie?._id).toBeTruthy();
    expect(movie?.title).toEqual(testMovie.title);
    expect(movie?.release).toEqual(testMovie.release);
    expect(movie?.image).toEqual(testMovie.image);

    testMovieId = movie._id;
    testReview.movie_id = movie._id;
  });

  it('Should create a Review', async () => {
    const review = await ReviewModel.create(testReview);

    expect(review).toBeDefined();
    expect(review?._id).toBeTruthy();
    expect(review?.html).toEqual(testReview.html);
    expect(review?.movie_id).toEqual(testMovieId);
    expect(review?.profile_id).toEqual(testProfileId);

    testReviewId = review?._id;
    testComment.review_id = review?._id;
  });

  it('Should fetch a Profile and include any reviews', async () => {
    const profile = await ProfileModel.findOne({_id: testProfileId}).populate('reviews');

    expect(profile).toBeDefined();
    expect(profile?._id).toEqual(testProfileId);
    expect(profile?.reviews).toBeTruthy();
  })

  it('Should fetch a Movie and include any reviews', async () => {
    const movie = await MovieModel.findOne({_id: testMovieId}).populate('reviews');

    expect(movie).toBeDefined()
    expect(movie?._id).toEqual(testMovieId);
    expect(movie?.reviews).toBeTruthy();
  });

  it('should fetch all movies', async () => {
    const movies = await MovieModel.find({}).populate('reviews');

    expect(movies).toBeDefined();
    expect(movies?.length).toBe(1);
    expect(movies[0]?.reviews?.length).toBe(1);
  })

  it('should fetch a Review and include the Movie', async () => {
    const review = await ReviewModel.findOne({_id: testReviewId}).populate('movie');

    expect(review).toBeDefined();
    expect(review?._id).toEqual(testReviewId);
    expect(review?.movie?._id).toEqual(testMovieId);
  });

  it('Should create a Comment', async () => {
    const comment = await CommentModel.create(testComment);

    expect(comment._id).toBeTruthy();
    expect(comment.content).toEqual(testComment.content);
    expect(comment.review_id).toEqual(testReviewId);
    testCommentId = comment._id;
  });

  it('Should fetch a Review and include Comments', async () => {
    const review = await ReviewModel.findOne({_id: testReviewId}).populate('comments');

    expect(review).toBeDefined();
    expect(review?._id).toEqual(testReviewId);
    expect(review?.comments).toBeTruthy();
  });
});
