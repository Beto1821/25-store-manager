const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

const mockProducts = require('./mocks/productsController.mock');

describe('testando camada Controller', () => {
  afterEach(sinon.restore);

    it('retorna a lista', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "getProducts").resolves(mockProducts);

      await productsController.getProducts(req, res)
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockProducts)).to.be.true;
    })
  
    it("buscando pelo id", async () => {
      const productObj = { id: mockProducts[0].id, name: mockProducts[0].name}
      sinon.stub(productsService, 'getProductId').resolves(productObj);

      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productsController.getProductId(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(productObj)).to.be.true;
    });

    it('id inexistente', async () => {
      sinon.stub(productsService, 'getProductId').resolves(null);

      const req = {};
      const res = {};

      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productsController.getProductId(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found'})).to.be.true;
    })

  describe("testando função Insert", () => {
    it("criando o produto", async () => {
      const productObj = { id: 4, name: 'New Product'};
      
      sinon
        .stub(productsService, 'insertProduct')
        .resolves(productObj.id);
      
      const req = {};
      const res = {};

      req.body = { name: 'New Product' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await productsController.insertProduct(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      // expect(res.json.calledWith(productObj)).to.be.true;
    });
  });
});
