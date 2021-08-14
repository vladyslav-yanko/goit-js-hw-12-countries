const baseUrl = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(searchQuery) {
  return fetch(baseUrl + `${searchQuery}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(console.error());
  });
}

export default { fetchCountries };
