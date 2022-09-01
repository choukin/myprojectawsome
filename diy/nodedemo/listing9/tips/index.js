exports.addPercentageToEach = (prices, percentage) =>{
    return prices.map(total=>{
        total = parseFloat(total)
        return total+(total*percentage)
    })
}

// 求和
exports.sum = (prices) => {
    return prices.reduce((currentSum, currentValue)=>{
        return parseFloat(currentSum)+ parseFloat(currentValue)
    })
}
// 计算百分比
exports.percentFormat = (percentage)=>{
    return parseFloat(percentage)*100+'%'
}

// 美元格式
exports.dollarFormat = (number)=>{
    return `$${parseFloat(number).toFixed(2)}`
}