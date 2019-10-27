/**
 * Model
 */
class Getdata {
    constructor(to, from, amount) {
        this.to = to;
        this.from = from;
        this.currencies;
        this.convertCurrencies;
        this.amount = amount;
        this.result;
    }

    // get Currency
    async getCurrencies() {
        try {
            const data = await axios.get("https://free.currconv.com/api/v7/currencies?apiKey=4552538fb0a8b4df4c96");
            this.currencies = data.data.results;
            // console.log(this.currencies)
        } catch (e) {
            console.log(`${e} :< Somthing went wrong currencies`);
        }
    }

    // covert currency
    async convertCurrencies() {
        const key = '4552538fb0a8b4df4c96';
        // https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=

        const query = `${this.to}_${this.from}`;
        try {
            const converCur = await axios.get(`https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${key}`);
            this.result = converCur.data;

        } catch (e) {
            console.log(`${e} :< Somthing went wrong convert currnecy`);
        }
    }

    calculatedResult() {
        const query = `${this.to}_${this.from}`;
        const Obj = this.result[query];
        const calculated = (Obj * this.amount).toFixed(3);

        return calculated;
    }
}


// Global stat

const stat = {
    currencies: '',
    currenciesConvert: ''
}


// creating new object for getting contry lists asyncoursly//
const contrlerViewGetCur = async () => {

    // creaing new instance of obj
    const cur = new Getdata();

    try {
        // wait for response
        await cur.getCurrencies();
        stat.currencies = cur.currencies;

        // render country list on ui 
        const val = Object.values(stat.currencies);
        val.forEach(el => {
            getCurrenciesView(el);
        });

    } catch (e) {
        console.log(e);
    }
}

// creating new object for calculat currencies /
const contrlerViewConCur = async () => {

    //call obj
    let cur = new Getdata(stat.val, stat.val2, stat.amount);

    try {
        //wait for response
        await cur.convertCurrencies();

        // call Calutated fucntion
        stat.res = cur.calculatedResult();

        // render ui
        resultVal(stat.res);

    } catch (e) {
        console.log(e);
    }
}


/**
 * View
 */

// Country Rendring on html page //
const getCurrenciesView = (currencies) => {
    const currenciesListTo = document.querySelector('#to')
    const currenciesListFrom = document.querySelector('#from')

    const markup = `
        <option data-id="${currencies.id}">
         ${currencies.currencyName}
        </option> 
 `;

    currenciesListTo.insertAdjacentHTML('afterbegin', markup);
    currenciesListFrom.insertAdjacentHTML('afterbegin', markup);
}


/**
 * Controllers
 */

//  Increamen Dec input amount how much you want to conver currencies // 
const values = () => {
    const number = document.querySelector('input[type="number"]');
    number.addEventListener('click', e => {
        const curNum = document.querySelector('#curNumber')

        if (number.value <= 0) {
            number.value = 1;
        }
        if (e.target.value >= 0) curNum.innerHTML = e.target.value;

        stat.amount = parseInt(e.target.value, 10);

    });

}

// Hanling Country option drop down list so we can selcet Country currencie to convert //
const select2 = document.querySelector('#from');
const select1 = document.querySelector('#to');

select1.addEventListener('click', e => {
    const idTo = e.target.options[e.target.selectedIndex].dataset.id;
    stat.val = idTo;
})

select2.addEventListener('click', e => {
    const idFrom = e.target.options[e.target.selectedIndex].dataset.id;
    stat.val2 = idFrom;
})


// Render calculte function
const resultVal = calculated => {
    const toNumber = document.querySelector('#toNumber')
    toNumber.innerHTML = calculated;
}

// on load we rendr country and init value 
window.addEventListener('load', e => {
    values();
    contrlerViewGetCur();
})

// handling covert currency after selecting contreys sumbit and show result // 
const converBtn = document.querySelector('#convert');
converBtn.addEventListener('click', e => {
    e.preventDefault();
    contrlerViewConCur();
});