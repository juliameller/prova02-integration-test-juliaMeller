import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Dummy Json API', () => {
    const p = pactum;
    const rep = SimpleReporter;
    const baseUrl = 'https://dummyjson.com';

    beforeAll(() => p.reporter.add(rep));
    afterAll(() => p.reporter.end());

    describe('Receitas', () => {
        it('Cria nova receita', async () => {
            await p
                .spec()
                .post(`${baseUrl}/recipes/add`)
                .withJson({ name: 'Tasty Pizza' })
                .expectStatus(StatusCodes.OK)
                .expectJsonLike({
                    id: 51,
                    name: 'Tasty Pizza'
                });
        });
    });
});
