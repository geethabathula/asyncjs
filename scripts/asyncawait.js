const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
};

function renderCountryTemplate(data) {
    data.map((eachCountry) => {
        const { name, region, population, languages, currencies, flag } = eachCountry;

        const html = `
        <article class="country">
            <img class="country__img" src="${flag}" />
            <div class="country__data">
                <h3 class="country__name">${name}</h3>
                <h4 class="country__region">${region}</h4>
                <p class="country__row"><span>👫</span>${(population / 1000000).toFixed(1)} million people</p>
                <p class="country__row"><span>🗣️</span>${languages.map(lang => lang.name).join(', ')}</p>
                <p class="country__row"><span>💰</span>${currencies.map(curr => curr.name).join(', ')}</p>
            </div>
        </article>
        `;
        countriesContainer.insertAdjacentHTML('beforeend', html);
    })
}
const getCountryData = async function (countryName) {
    try {
        const request = await fetch(`https://restcountries.com/v2/name/${countryName}`);
        if (!request.ok) {
            throw new Error(`${request.status} Country Name is Not Found or misspelled `)
        }
        const response = await request.json();
        renderCountryTemplate(response);
    } catch (err) {
        renderError(err);
        console.error(`${err} 💢`);
    } finally {
        countriesContainer.style.opacity = 1;
    }
};

getCountryData('India');
getCountryData('australia');
getCountryData('germany');

//Running Promises Parallely
const get3Countries = async function (c1, c2, c3) {
    /*
    const reqdata1 = await fetch(`https://restcountries.com/v2/name/${c1}`);
    const respdata1 = await reqdata1.json();
    const reqdata2 = await fetch(`https://restcountries.com/v2/name/${c2}`);
    const respdata2 = await reqdata2.json();
    const reqdata3 = await fetch(`https://restcountries.com/v2/name/${c3}`);
    const respdata3 = await reqdata3.json();
    const arr = [];
    arr.push(respdata1[0].capital);
    arr.push(respdata2[0].capital);
    arr.push(respdata3[0].capital);
    console.log(arr);
    */
    //Parallely running asynchronous functions
    const data = await Promise.all([
        fetch(`https://restcountries.com/v2/name/${c1}`),
        fetch(`https://restcountries.com/v2/name/${c2}`),
        fetch(`https://restcountries.com/v2/name/${c3}`)
    ]);

    const responseData = await Promise.all(data.map(response => response.json()));

    const capitals = responseData.map(country => country[0]?.capital);

    console.log(capitals);

}

get3Countries("australia", "germany", "usa");

// Promise.race
(async function () {
    const res = await Promise.race([
        getJSON(`https://restcountries.eu/rest/v2/name/italy`),
        getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
        getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
    ]);
    console.log(res[0]);
})();

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('Request took too long!'));
        }, sec * 1000);
    });
};

Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
    timeout(5),
])
    .then(res => console.log(res[0]))
    .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
    .then(res => console.log(res))
    .catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
    .then(res => console.log(res))
    .catch(err => console.error(err));
