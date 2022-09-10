const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const mockProducts = require('./mocks/productsService.mock');

describe('Testando camada Service', () => { 
  
  beforeEach(sinon.restore);

  describe("testando função getAll", () => {
    it("retorna todos os produtos", async () => {
      sinon.stub(productsModel, "getProducts").resolves(mockProducts);
      const response = await productsService.getProducts();
      expect(response).to.be.deep.equal(mockProducts);
    });
    it("retorna undefined", async () => {
      sinon.stub(productsModel, "getProducts").resolves();
      const response = await productsService.getProducts();
      expect(response).to.equal(undefined);
    });
  });

  describe('teste de getById', () => {
    describe('ao achar produto com id informado', () => {
      it('retorna um objeto com chave id e name', async () => {
        const query = { "id": 1, "name": "Machado do Thor Stormbreaker" }
        sinon.stub(productsModel, 'getProductId').resolves(query);
        const product = await productsService.getProductId(1);
        expect(product).to.be.a('object');
        expect(product).to.be.all.keys('id','name');
      })
    })

    describe('não acha produto com id informado', () => {
      it('retorna null ', async () => {
        sinon.stub(productsModel, 'getProductId').resolves();
        const product = await productsService.getProductId(9);
        expect(product).to.equal(null);
      })
    })
  })

  describe('testando a função create', () => {
    describe('produto criado com sucesso', () => {
      it('retorna o id do novo produto', async () => {
        const execute = [{ insertId: 4 }];
        sinon.stub(productsModel, "insertProduct").resolves(execute);
        const product = await productsService.insertProduct("ProdutoX");
        expect(product).to.be.an('object');
        expect(product).to.be.all.keys('id', 'name');
      })
    })
  })
});