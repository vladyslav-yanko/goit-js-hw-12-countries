import API from './js/fetchCountries.js';
import getRefs from './js/refs.js';
import countryInformation from './templates/country-information.hbs';
import countriesList from './templates/countries-list.hbs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
const refs = getRefs();


refs.searchForm.addEventListener('input', debounce(getCountryInfo, 1000));
function getCountryInfo(e) {
    e.preventDefault();
    clearMarkup();
    const searchQuery = e.target.value;
    API.fetchCountries(searchQuery).then(countryInfo).catch(countryError);
}

function countryInfo(country) {
  if (country.length === 1) {
      const markup = countryInformation(country);
      refs.articlesList.insertAdjacentHTML('beforeend', markup); 
  } else if (country.length >= 2 && country.length <= 10) {
    const markup = countriesList(country);
    refs.articlesList.insertAdjacentHTML('beforeend', markup);
  } else if (country.length > 10) {
    error({
      text: 'go clearly my friend',
    });
  } else {
    clearMarkup();
    return;
  }
};

 function countryError() {
    console.log("Ops there is mistake!");
  }

function clearMarkup() {
  refs.articlesList.innerHTML = '';
}