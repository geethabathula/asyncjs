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
        // countriesContainer.style.opacity = 1;
    })


}

const getCountryData = function (countryName) {
    const request = fetch(`https://restcountries.com/v2/name/${countryName}`)
        .then(response => {
            response.json()
            if (!response.ok) {
                throw new Error(`${response.status} Country Name is Not Found or misspelled `)
            }
        }) //Response {type: 'cors', url: 'https://restcountries.com/v2/name/australia', redirected: false, status: 200, ok: true, …}
        .then(data => renderCountryTemplate(data))
        .catch(err => {
            renderError(err);
            console.error(`${err} 💢`);
        })
        .finally(() => countriesContainer.style.opacity = 1);
};

// getCountryData('India');
// getCountryData('australia');
getCountryData('gibeerishhhh');