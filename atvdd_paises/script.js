
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;


window.addEventListener('load', () => {

  tabCountries = document.querySelector('#tabCountries');
  countCountries = document.querySelector('#countCountries');

  tabFavorites = document.querySelector('#tabFavorites');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();

});

async function fetchCountries() {
  const response = await fetch('https://restcountries.com/v2/all');
  const json = await response.json();


  allCountries = json.map(country => {

    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.br, 
      population,
      formattedPopulation: formatNumber(population),
      flag
    }
  });

  render();
}

function render() {

  renderCountryList();
  renderFavoritesList();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = "<div>";

  allCountries.forEach(country => {
    const { id, name, flag, formattedPopulation } = country;

    const countryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn"> + </a>
        </div>
  
        <div>
          <img src="${flag}" alt="${name}"/>
        </div>
      
        <div>
          <ul> 
            <li> ${name} </li>
            <li> ${formattedPopulation} </li>
          </ul>
        </div>
      </div>
    `;

    countriesHTML += countryHTML;
  });

  countriesHTML += '</div>';
  tabCountries.innerHTML = countriesHTML;
}

function renderFavoritesList() {
  let favoritesListHtml = "<div>";

  favoriteCountries.forEach(country => {
    const { id, name, formattedPopulation, flag } = country;

    const favoriteCountryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4"> - </a>
        </div>

        <div>
          <img src="${flag}" alt="${name}"/>
        </div>
      
        <div>
          <ul> 
            <li> ${name} </li>
            <li> ${formattedPopulation} </li>
          </ul>
        </div>
      </div>
    `;
    favoritesListHtml += favoriteCountryHTML;
  });

  favoritesListHtml = favoritesListHtml + '</div>';
  tabFavorites.innerHTML = favoritesListHtml;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationLi
  const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationFavorites.textContent = formatNumber(totalFavorites);

}

function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });

}

function addToFavorites(id) {

  const countryToAdd = allCountries.find(country => country.id === id);


  favoriteCountries = [...favoriteCountries, countryToAdd];

  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });


  allCountries = allCountries.filter(country => country.id !== id);

  render();

}

function removeFromFavorites(id) {

  const countryToRemove = favoriteCountries.find(country => country.id === id);


  allCountries = [...allCountries, countryToRemove];

  
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

 
  favoriteCountries = favoriteCountries.filter(country => country.id !== id);

  
  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}