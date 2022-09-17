const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require("../../../src/models/sales.models");
const salesService = require("../../../src/services/sales.services");
const { mockProducts, saleAllMock, saleMock }  = require('./mocks/productsService.mock');

describe('Teste salesService', () => {
  beforeEach(sinon.restore)
   
  describe('teste de createSale', () => {
    it('retorna um objeto sale', async () => {
      sinon.stub(salesModel, 'insertSales').resolves([{ id: 3 }]);
      sinon.stub(salesModel, 'insertSalesProduct').resolves({ productId: 4, quantity: 5 });
      
      const sale = await salesService.insertSales([{ id: 3, productId: 4, quantity: 5 }]);
      expect(sale).to.be.an('object');
      expect(sale).to.have.all.keys('id', 'itemsSold');
    })
  });

  describe('teste de getAll', () => {
    it('retorna todoas as sales', async () => {
      sinon.stub(salesModel, 'getSales').resolves(saleAllMock);
  
      const sale = await salesService.getSales();
      expect(sale).to.be.an('array');
      expect(sale).to.be.deep.equal(saleAllMock);
    })
  })
  
  describe('teste de getById', () => {
    it('retorna o objeto sale pelo id', async () => {
      sinon.stub(salesModel, 'getSalesId').resolves(saleAllMock[2]);
  
      const sale = await salesService.getSalesId(2);
      expect(sale).to.be.an('object');
      expect(sale).to.be.deep.equal(saleAllMock[2]);
    })
    it('retorn null ao não achar o id', async () => {
      sinon.stub(salesModel, 'getSalesId').resolves();
  
      const sale = await salesService.getSalesId();
      expect(sale).to.be.equal(null);
    })
  })

});