import supertest from 'supertest';
import app from '../app';
import ProcessImage from '../SharpFunction';
import fs from 'fs';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=50&height=dfsdf'
    );
    expect(response.status).toBe(404);
  }),
    it('gets the api endpoint with Image', async () => {
      const response = await request.get('/assets/fjord.jpg');
      expect(response.status).toBe(200);
    }),
    it('gets the api endpoint with fail height -1', async () => {
      const response = await request.get(
        '/api/images?filename=download&width=50&height=-1'
      );
      expect(response.status).toBe(404);
    }),
    it('gets the api endpoin with fack url', async () => {
      await ProcessImage('download.png', 300, 300);
      expectAsync(
        fs.readFileSync(
          process.cwd() +
            '/assets/thumbnail/filename=download&width=300&height=300.png'
        )
      ).toBeResolvedTo;
    });
});
