// https://dummyjson.com/docs

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
        it('Lista receitas', async () => {
            await p
                .spec()
                .get(`${baseUrl}/recipes`)
                .expectStatus(StatusCodes.OK)
                .expectJsonLike({
                    recipes: [
                        {
                            id: 1,
                            name: 'Classic Margherita Pizza'
                        }
                    ]
                })
                .expectHeaderContains('content-type', 'application/json');
        });

        it('Busca uma receita com ID válido', async () => {
            await p
                .spec()
                .get(`${baseUrl}/recipes/1`)
                .expectStatus(StatusCodes.OK)
                .expectJsonLike({
                    id: 1,
                    name: 'Classic Margherita Pizza'
                })
                .expectHeaderContains('content-type', 'application/json');
        });

        it('Busca uma receita com ID inválido', async () => {
            await p
                .spec()
                .get(`${baseUrl}/recipes/99999`)
                .expectStatus(StatusCodes.NOT_FOUND)
        });

        it('Busca uma receita por tipo de refeição', async () => {
            await p
                .spec()
                .get(`${baseUrl}/recipes/meal-type/snack`)
                .expectStatus(StatusCodes.OK)
                .expectJsonLike({
                    recipes: [{
                        id: 3,
                        name: 'Chocolate Chip Cookies'
                    }]
                })
                .expectHeaderContains('content-type', 'application/json');
        });

        it('Lista tags de receitas', async () => {
            await p
                .spec()
                .get(`${baseUrl}/recipes/tags`)
                .expectStatus(StatusCodes.OK)
                .expectHeaderContains('content-type', 'application/json');
        });

        it('Busca uma receita por tag', async () => {
            await p
                .spec()
                .get(`${baseUrl}/recipes/tag/Dessert`)
                .expectStatus(StatusCodes.OK)
                .expectJsonLike({
                    recipes: [{
                        id: 3,
                        name: 'Chocolate Chip Cookies'
                    }]
                })
                .expectHeaderContains('content-type', 'application/json');
        });



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

        it('Atualiza receita', async () => {
            await p
                .spec()
                .put(`${baseUrl}/recipes/1`)
                .withJson({ name: 'Receita atualizada' })
                .expectStatus(StatusCodes.OK)
                .expectJsonLike({
                    id: 1,
                    name: 'Receita atualizada'
                });
        });

        it('Atualiza receita com ID inválido', async () => {
            await p
                .spec()
                .put(`${baseUrl}/recipes/9999999`)
                .withJson({ name: 'Receita atualizada' })
                .expectStatus(StatusCodes.NOT_FOUND)
        });

        it('Deleta receita com ID válido', async () => {
            await p
                .spec()
                .delete(`${baseUrl}/recipes/1`)
                .expectStatus(StatusCodes.OK)
                .expectJsonLike({
                    id: 1,
                    isDeleted: true
                });
        });

        it('Deleta receita com ID inválido', async () => {
            await p
                .spec()
                .delete(`${baseUrl}/recipes/99999`)
                .expectStatus(StatusCodes.NOT_FOUND)
        });


    });
});


