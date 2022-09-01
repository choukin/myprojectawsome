const tips = require('..')

const should = require('should')
const tax = 0.12; // 税率
const tip = 0.15; // 小费比率

const prices = [10, 20] //账单

const pricesWidthTipAndTax = tips.addPercentageToEach(prices, tip+tax)

pricesWidthTipAndTax[0].should.equal(12.7)
pricesWidthTipAndTax[1].should.equal(25.4)

const totalAmount = tips.sum(pricesWidthTipAndTax).toFixed(2)

totalAmount.should.equal('38.10')

const totalAmountAsCurrent = tips.dollarFormat(totalAmount)
totalAmountAsCurrent.should.equal('$38.10')

const tipsAsPercent = tips.percentFormat(tip)

tipsAsPercent.should.equal('15%')