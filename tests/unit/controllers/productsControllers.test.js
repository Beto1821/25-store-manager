const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;


const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

const mockProducts = require('./mocks/productsController.mock');

describe('testando produtos_controller', function () {
  const expected = {
  id: 1,
  name: "Martelo de Thor",
  };
  
  afterEach(function () {
    sinon.restore();
  });

  it('lista de produtos', async function () {
    const req = {};
    const res = {};

    sinon.stub(productsService, 'getProducts').resolves(mockProducts);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    await productsController.getProducts(req, res);

    expect(res.json.calledWith(mockProducts)).to.be.true;
  });

  it('testando a função getProductId', async function () {
    const req = {};
    const res = {};

    req.params = { id: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    sinon.stub(productsService, 'getProductId').resolves([expected]);

    await productsController.getProductId(req, res);
  
    expect(res.status.calledWith(200)).to.be.true;
  });
});
