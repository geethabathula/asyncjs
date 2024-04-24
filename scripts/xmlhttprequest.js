const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        const data = JSON.parse(this.responseText);
        console.log(data);

        // Check if data exists
        if (data) {
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
                countriesContainer.style.opacity = 1;
            })

        } else {
            console.log('Country data not found');
        }
    });
};

getCountryData('India');
getCountryData('australia');
