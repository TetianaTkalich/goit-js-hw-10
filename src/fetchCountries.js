export const fetchCountries = function (name) {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(url)
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    })
};