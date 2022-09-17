const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { findByIdBefore, saleAllMock } = require('./mocks/productModels.mock');
const salesModel = require('../../../src/models/sales.models');

describe('testa salesModel', () => {
  beforeEach(sinon.restore);
  afterEach(sinon.restore);

  describe('teste de createSale ', () => {
    describe('quando criado sale com sucesso', () => {
      it('retorna um objeto', async () => {
        sinon.stub(connection, 'execute').resolves([{id: 4}]);
      
        const sale = await salesModel.insertSales();
        expect(sale).to.be.an('object');
        expect(sale).to.have.key('id');
      })
    })
  })

  describe('teste de insertSalesProduct', () => {
    describe('quando criado uma sale com sucesso', () => {
      it('retorna um objeto', async () => {
        sinon.stub(connection, 'execute').resolves([{ productId: 4, quantity: 5 }]);
        
        const saleInfo = { saleId: 1, productId: 4, quantity: 5 }
        const sale = await salesModel.insertSalesProduct(saleInfo);
        expect(sale).to.be.an('object');
        expect(sale).to.have.all.keys('productId','quantity')
      })
    })
  })

  describe('teste de getSales ', () => {
    describe('quando acha uma sale com sucesso', () => {
      it('retorna um array', async () => {
        sinon.stub(connection, 'execute').resolves([saleAllMock]);
      
        const sale = await salesModel.getSales();
        expect(sale).to.be.an('array');
        expect(sale).to.be.equal(saleAllMock)
      })
    })
  })

  describe('teste de getSalesId ', () => {
    describe('quando acha uma sale pelo id com sucesso', () => {
      it('retorna um objeto', async () => {
        sinon.stub(connection, 'execute').resolves([saleAllMock[0]]);
        const sale = await salesModel.getSalesId(1);
        expect(sale).to.be.an('object');
        expect(sale).to.be.equal(saleAllMock[0]);
        
      })
    describe('quando nao acha uma sale pelo id', () => {
      it('retorna null', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);

        const sale = await salesModel.getSalesIdcode .
        (9);
        expect(sale).to.be.equal(null);
        })
      })
    })
  })
})