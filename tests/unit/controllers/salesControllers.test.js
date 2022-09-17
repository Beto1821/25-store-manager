const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.services');

const { mockProducts, saleAllMock, saleUpdatedMock, saleCreateMock }  = require('./mocks/productsController.mock');


describe('teste de salesController', () => {
  beforeEach(sinon.restore);
  
  describe("teste de createSale", () => {
    it('caso OK', async () => {
      const saleObj = { id: saleCreateMock.id, itemsSold: saleCreateMock.itemsSold };
      sinon.stub(salesService, 'insertSales').resolves(saleObj);

      const req = {};
      const res = {};
      req.body = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.insertSales(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(saleObj)).to.be.true;
    })
  })

      describe("teste de getAll", () => {
    it('caso OK', async () => {
      sinon.stub(salesService, 'getSales').resolves(saleAllMock);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.getSales(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(saleAllMock)).to.be.true;
    })
    it('caso NAO OK', async () => {
      sinon.stub(salesService, 'getSalesId').resolves(null);
      
      const req = {};
      const res = {};
      
      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await salesController.getSalesId(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
    })      
  })

});