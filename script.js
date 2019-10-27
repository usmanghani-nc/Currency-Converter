const stat = {
    currencies: '',
}


async function getCurrencies() {
    try {
        const data = await axios.get("https://free.currconv.com/api/v7/currencies?apiKey=4552538fb0a8b4df4c96");
        stat.currencies = data.data.results;
        console.log(stat.currencies);
    } catch (e) {
        console.log(`${e} :< Somthing went wrong currencies`);
    }

    Array.from(stat.currencies).forEach(element => {
        console.log(element.AED);
    });
}

getCurrencies();




const markName = `<span  data-id="${currencies.id}">
                     ${currencies.currencyName}
                   </span>`;


to.insertAdjacentHTML('afterbegin', markName);
from.insertAdjacentHTML('afterbegin', markName);