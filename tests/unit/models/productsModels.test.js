const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const mockProducts = require('./mocks/productModels.mock');
const productModel = require('../../../src/models/products.model')

describe('testando product_models', () => {
     afterEach(function () {
     sinon.restore();
  });  
    it('retorna todos os produtos em um array', async () => {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      const result = await productModel.getProducts();
      expect(result).to.be.deep.equal(mockProducts);
    })

  it('testando se retorna o objeto com o id correto', async function () {
    sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);

    const result = await productModel.getProductId(1);

    expect(result).to.deep.equal(mockProducts[0]);
  });

});
