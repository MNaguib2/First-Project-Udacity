import supertest from 'supertest';
import { app, getFullNameFile } from "../app";

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api/images?filename=fjord&width=50&height=dfsdf');
        expect(response.status).toBe(200);
    }),
    it('gets the api endpoint with Image', async () => {
        const response = await request.get('/assets/fjord.jpg');
        expect(response.status).toBe(200);
    }),
    it('gets the api endpoint with fail Image', async () => {
        const response = await request.get('/api/images?filename=sdhf jksd&width=50&height=dfsdf');
        expect(response.status).toBe(200);
    }),
    it('gets the api endpoin with fack url', async () => {
        const response = await request.get('/aplksdj f/lsjkdf kl');
        expect(response.status).toBe(200);
    })
});
it('test get full name file', async () => {
    await expectAsync(getFullNameFile('sjkdhfuisf')).toBeRejected();
})