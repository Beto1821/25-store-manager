const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { mockProducts } = require('./mocks/productModels.mock');
const productModel = require('../../../src/models/products.model')

describe('Testando camada Model', () => {
  afterEach(sinon.restore);

  describe('testando função getAll', () => {
    it('retorna todos os produtos em um array', async () => {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      const result = await productModel.getProducts();
      expect(result).to.be.deep.equal(mockProducts);
    })

    it('testando se retorna null', async () => {
      sinon.stub(connection, 'execute').resolves([]);
      const product = await productModel.getProducts(99);
      expect(product).to.be.equal(undefined); 
    })
  });

  describe("testando a função getByID", () => {
     
      it("não acha produto com id informado retorna null ", async () => {
        sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);
        const result = await productModel.getProductId(1);
        expect(result).to.deep.equal(mockProducts[0]);
      });
  });

  describe("testando a função create", () => {
      it("retorna undefined", async () => {
        const execute = [[]];
        sinon.stub(connection, "execute").resolves(execute);
        const { product } = await productModel.insertProduct();
        expect(product).to.equal(undefined);
      });
  });
});
