const app = require('../server'); 
const request = require('supertest');
const db = require('../models');
const bcrypt = require('bcryptjs');

let server;


beforeEach(async () => {
    server = await app.listen(3001); 
  });

 afterEach(async () => {
    if (server) {
      await server.close();
    }
  }); 

describe('Authentication Routes', () => {
  it('should return an OK status when signing up with valid data', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  it('should return an OK status when signing up with valid data', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'password123' });
      console.log('Response received:', response.body);
    expect(response.body).toHaveProperty('message', 'Email is already in use!');
  });

  it('should return a 400 Bad Request status when signing up with invalid data', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'valid@email.com', password: '' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should return a 500 Bad Request status when signing up with invalid data', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'invalid_email', password: 'password123' });

    expect(response.status).toBe(500);
  });

const User = db.user;
jest.spyOn(User, 'findOne');

it('should return a 200 OK status when signing in with valid credentials', async () => {
 
  User.findOne.mockResolvedValue({
    id: 1,
    email: 'test@example.com',
    password: bcrypt.hashSync('password123', 8), 
  });

  const response = await request(app)
    .post('/api/auth/signin')
    .send({ email: 'test@example.com', password: 'password123' });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('id');
  expect(response.body).toHaveProperty('email', 'test@example.com');
  expect(response.body).toHaveProperty('accessToken');
});

it('should return a 404 Not Found status when signing in with an unknown email', async () => {
 
  User.findOne.mockResolvedValue(null);

  const response = await request(app)
    .post('/api/auth/signin')
    .send({ email: 'unknown@example.com', password: 'password123' });

  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('message', 'User Not found.');
});

it('should return a 401 Unauthorized status when signing in with an invalid password', async () => {
  
  User.findOne.mockResolvedValue({
    id: 2,
    email: 'test@example.com',
    password: bcrypt.hashSync('differentpassword', 8), 
  });

  const response = await request(app)
    .post('/api/auth/signin')
    .send({ email: 'test@example.com', password: 'password123' });

  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty('message', 'Invalid Password!');
});


});


afterAll(async () => {
    if (server) {
      await server.close();
    }
  });