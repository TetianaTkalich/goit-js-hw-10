import './css/styles.css';
import notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce((event) => {
    const input = event.target.value.trim();
    if (input === '')
        clearResultHtml();
    
    fetchCountries(input)
    .then(searchResult => {
        clearResultHtml();
        if (searchResult.length > 10) {
            notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            return;
        }
        if (searchResult.length === 1)
            displayOneCountry(searchResult[0]);
        else
            displayListOfCountries(searchResult);
    })
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
    
}, DEBOUNCE_DELAY));

const clearResultHtml = () => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

const displayListOfCountries = (countries) => { 
    const htmlCountries = countries.map(country => {
        return `<li class="countries-list">
                    <img class="country-list-img" src="${country.flags.svg}" alt="Flag of ${country.name.official}">
                    <h2 class="country-list-name">${country.name.official}</h2>
                </li>`;
    });
    countryList.insertAdjacentHTML('afterbegin', htmlCountries.join(''));
};
const displayOneCountry = (country) => {
    const languagesString = Object.values(country.languages).join(', ');
    const htmlCountry = `<ul class="country">
                            <li class="country-info">
                                <img class="country-info-flag" src="${country.flags.svg}" alt="Flag of ${country.name.official}">
                                <h2 class="country-info-name">${country.name.official}</h2>
                            </li>
                            <li class="country-info">
                                <span class="country-info-categories">Capital: ${country.capital}</span>
                            </li>
                            <li class="country-info__item">
                                <span class="country-info-categories">Population: ${country.population}</span>
                            </li>
                            <li class="country-info__item">
                                <span class="country-info-categories">Languages: ${languagesString}</span>
                            </li>
                        </ul>`;
    countryInfo.insertAdjacentHTML('afterbegin', htmlCountry);
};

