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
        card.classList.add('brewery-card');

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
        phoneElement.textContent = `Phone Number: ${brewery.phone}`;

        // WEBSITE
        const websiteElement = document.createElement('p');
        websiteElement.classList.add('brewery-website');

        if (brewery.website_url) {
            const websiteText = document.createTextNode('Website: ');
            const websiteLink = document.createElement('a');
            websiteLink.href = brewery.website_url;
            websiteLink.target = '_blank';
            websiteLink.textContent = brewery.website_url;

            websiteElement.appendChild(websiteText);
            websiteElement.appendChild(websiteLink);
        } else {
            websiteElement.textContent = 'Website: N/A';
        }

        // MAPS
        const mapLink = document.createElement('a');
        const latitude = brewery.latitude;
        const longitude = brewery.longitude;
        if (latitude && longitude) {
            mapLink.href = `https://www.google.com/maps/place/${latitude},${longitude}`;
            mapLink.target = '_blank';
            mapLink.textContent = 'See Location on Google Maps';
        } else {
            mapLink.textContent = 'Location Not Available';
        }

        card.appendChild(nameElement);
        card.appendChild(streetElement);
        card.appendChild(phoneElement);
        card.appendChild(websiteElement);
        card.appendChild(mapLink);
        card.appendChild(typeElement);

        return card;
    }

    // ENTER KEYS
    document.getElementById('search-by-state').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            searchByState();
        }
    })

    document.getElementById('search-by-city').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            searchByCity();
        }
    });

    document.getElementById('search-by-zipcode').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            searchByZipcode();
        }
    });

    // SEARCH BUTTON
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            searchByState();
            searchByCity();
            searchByZipcode();
        });
    } else {
        console.error('Element with ID "searchButton" not found in the document.');
    }

    document.getElementById('searchButton').addEventListener('mouseover', function() {
        this.style.backgroundColor = 'white';
        this.style.color = 'black';
    })

    document.getElementById('searchButton').addEventListener('mouseout', function() {
        this.style.backgroundColor = 'black';
        this.style.color = 'white';
    })

    // RESET BUTTON
    if (resetButton) {
        resetButton.addEventListener('click', resetPage);
    } else {
        console.error('Element with ID "resetButton" not found in the document.');
    }

    document.getElementById('resetButton').addEventListener('mouseover', function() {
        this.style.backgroundColor = 'white';
        this.style.color = 'black';
    })

    document.getElementById('resetButton').addEventListener('mouseout', function() {
        this.style.backgroundColor = 'black';
        this.style.color = 'white';
    })

});