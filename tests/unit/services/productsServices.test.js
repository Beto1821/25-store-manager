const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const mockProducts = require('./mocks/productsService.mock');

describe('testando product_services', function () {
  beforeEach(function () {
    sinon.stub(productsModel, 'getProducts').resolves(mockProducts);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('A lista de produtos é um array', async function () {
    const result = await productsService.getProducts();
    
    expect(result instanceof Array).to.equal(true);
  });

  it('Retorna a lista de produtos com sucesso', async function () {
    const result = await productsService.getProducts();

    expect(result).to.deep.equal(mockProducts);
  });
});
