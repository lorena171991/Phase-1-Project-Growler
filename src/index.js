document.addEventListener("DOMContentLoaded", function () {
    
    const ageWindow = document.getElementById('ageWindow');
    const yesCheckbox = document.getElementById('yesCheckbox');
    const noCheckbox = document.getElementById('noCheckbox');
    const submitAgeWindow = document.getElementById('submitButton');

    const apiDataContainer = document.getElementById('apiContainer');
    const searchButton = document.getElementById('searchButton');
    const resetButton = document.getElementById('resetButton');

    // OPEN AGE WINDOWN
    function openAgeWindow() {
        ageWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // CLOSE AGE WINDOW 
    function closeAgeWindow() {
        ageWindow.style.display = 'none'
        document.body.style.overflow = 'auto';
    }

    openAgeWindow();

    // AGE CONFIRMATION
    submitAgeWindow.addEventListener('click', function() {
        if (yesCheckbox.checked) {
            closeAgeWindow();
        } else {
            window.location.href = 'https://www.youtube.com/shorts/w9wAzUM-AqQ';
        }
    });

    // FETCHING API DATA
    function fetchData(apiUrl) {
        return fetch(apiUrl)
            .then(resp => resp.json())
            .catch(error => {
                console.error('Error fetching API date:', error)
            });
    }

    // DISPLAY DATA IN CARD
    function displayData(data) {
        apiDataContainer.innerHTML = '';
        if (data.length > 0) {
            data.forEach(item => {
                const card = createBreweryCard(item);
                apiDataContainer.appendChild(card);
            });
        } else {
            const noDataMessage = document.createElement('p');
            noDataMessage.textContent = 'No Data Found';
            apiDataContainer.appendChild(noDataMessage);
        }
    }

    // FETCH AND DISPLAY STATE DATA
    function searchByState() {
        const stateInput = document.getElementById('search-by-state').value;
        const stateAPI = `https://api.openbrewerydb.org/v1/breweries?by_state=${stateInput}`;
        
        fetchData(stateAPI)
            .then(data => {
                console.log('API Response:', data);
                displayData(data);
            })
    }
    
    // FETCH AND DISPLAY CITY DATA
    function searchByCity() {
        const cityInput = document.getElementById('search-by-city').value;
        const cityAPI = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityInput}`;
        
        fetchData(cityAPI)
            .then(data => {
                console.log('API Response:', data);
                displayData(data);
            })
    }
    
    // FETCH AND DISPLAY ZIPCODE DATA
    function searchByZipcode() {
        const zipcodeInput = document.getElementById('search-by-zipcode').value;
        const zipcodeAPI = `https://api.openbrewerydb.org/v1/breweries?by_postal=${zipcodeInput}`;
        
        fetchData(zipcodeAPI)
            .then(data => {
                console.log('API Response:', data);
                displayData(data);
            })
    }

    // RESET PAGE
    function resetPage() {
        document.getElementById('search-by-state').value = '';
        document.getElementById('search-by-city').value = '';
        document.getElementById('search-by-zipcode').value = '';
        apiDataContainer.innerHTML = '';
    }

    // WHAT'S DISPLAYED ON BREWERY CARD
    function createBreweryCard(brewery) {
        const card = document.createElement('div');
        card.classList('brewery-card');

        // NAME
        const nameElement = document.createElement('h3');
        nameElement.classList.add('brewery-name');
        nameElement.textContent = brewery.name;

        // TYPE
        const typeElement = document.createElement('p');
        typeElement.classList.add('brewery-type');
        typeElement.textContent = `Type: ${brewery.brewery_type}`;

        // STREET
        const streetElement = document.createElement('p');
        streetElement.classList.add('brewery-street');
        streetElement.textContent = `Street: ${brewery.street || 'N/A'}`;

        // PHONE NUMBER
        const phoneElement = document.createElement('p');
        phoneElement.classList.add('brewery-phone');
        phoneElement.textContent = `Phone Number: ${brewery.brewery.phone}`;

        // WEBSITE
        const websiteElement = document.createElement('p');
        websiteElement.classList.add('brewery-website');

        
    }
})