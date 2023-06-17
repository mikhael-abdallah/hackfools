window.onload = function() {
    fetch('http://localhost:3000/api/government')
    .then(response => response.json())
    .then(data => {
        const searchInput = document.getElementById('search-input');
        const countriesContainer = document.getElementById('countries');

    function renderCountries(countries) {
        countriesContainer.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');

            const flag = document.createElement('img');
            flag.src = country.icon;
            flag.alt = `Bandeira do ${country.country}`;
            flag.style.cursor = 'pointer'; // adicionando cursor de pointer para a imagem

            flag.onclick = function() { // adicionando evento de clique para redirecionar para a página de posts
                window.location.href = `government-posts.html?country=${country.id}`;
            }

            const countryName = document.createElement('h2');
            countryName.textContent = country.country;

            countryCard.appendChild(flag);
            countryCard.appendChild(countryName);
            countriesContainer.appendChild(countryCard);
        });
    }



        renderCountries(data.result);

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredCountries = data.result.filter(country => country.country.toLowerCase().includes(searchTerm));
            renderCountries(filteredCountries);
        });
    })
    .catch(err => console.error('Erro:', err));
}
