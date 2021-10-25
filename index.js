const axios = require('axios');

// Get exchange ratelimit
const getExchangeRate = async (fromCurrency, toCurrency) => {
    
    const response = await axios.get("http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1")

    const raqte = response.data.rates.rates;
    const euro = 1/rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    if(isNan(exchangeRate)){
        throw new Error (`Unable to get currency ${fromCurrency} and ${toCurrency} `);
    }
}


// 2nd function will get the countries of the
const getCountries = async (toCurrency) => {

    try{
        const response = await axios.get("http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1")
        return response.data.map(country => country.name)
    }catch(error){
        throw new Error (`Unable to get counries that use ${toCurrency}` )
    }
}


// 2nd function will get the countries of the
const convertCurrency = async (fromCurrency, toCurrency, amount) => {

    const countries = await getCountries(toCurrency)
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency)
    const convertedAmount = (amount * exchangeRate).toFixed(2)

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spent these in the following countries: ${countries}`

}

// 
convertCurrency("USDD", "CAD", 30)
    .then((message) => {
        console.log(message)
    }).catch((error) => {
        console.log(error.message)
    })

