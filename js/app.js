// function for getting dom element by id Name
const getDomElement = idName => document.getElementById(idName);

//Global scoped DOM Element.
const inputText = getDomElement('input-txt');
const resultSection = getDomElement('result-section');
const noDataWarning = getDomElement('no-data-warning');
const waitSpinner = getDomElement('spinner');
const horizontalBar = getDomElement('horizontal-bar');
const showMore = getDomElement('show-more');
const detailsPanel = getDomElement('details-panel');
const landingImage = getDomElement('landing-image');


// search function for fetching data
const searchProduct = async urlString => {
    showMore.style.display = 'none';
    landingImage.style.display = 'none';
    horizontalBar.style.display = 'none';
    waitSpinner.style.display = 'block';
    noDataWarning.style.display = 'none';
    detailsPanel.style.display = 'none';


    const response = await fetch(urlString);
    const data = await response.json();

    resultSection.textContent = '';
    waitSpinner.style.display = 'none';

    if (data.data.length !== 0) {
        horizontalBar.style.display = 'block';
        let maxDataToShow = data.data;

        //Showing only 20 data if the search result is more than 20
        if (data.data.length > 20) {
            maxDataToShow = data.data.slice(0, 20)
            showMore.style.display = 'block';

            //Showing all data if the show more button is clicked.
            showMore.addEventListener('click', () => {
                maxDataToShow = data.data;
                showSearchResult(maxDataToShow);
                showMore.style.display = 'none';
            })
        }
        showSearchResult(maxDataToShow);
    }
    else {
        noDataWarning.style.display = 'block';
        landingImage.style.display = 'none';

        inputText.value = '';
    }
}

//function for searching user input data
const showSearchResult = maxDataToShow => {
    maxDataToShow.forEach(element => {
        const productDetailsUrl = `https://openapi.programming-hero.com/api/phone/${element.slug}`;
        populateProductCard(element.image, element.phone_name, element.brand, productDetailsUrl);
    });
}

// function for populating search result
const populateProductCard = (imageString, productName, brandName, productDetailsUrl) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('col-12', 'col-md-6', 'col-lg-4', 'display-card')

    cardElement.innerHTML = `<div class="row g-2 shadow rounded p-3" style="min-height: 200px;">
        <div class="col-4">
            <img src="${imageString}" class="img-fluid rounded-start">
        </div>
        <div class="col-8">
            <div class="card-body">
                <h6 class="card-title">${productName}</h6>
                <p class="card-text">Brand:${brandName}</p>
                <button class="btn btn-sm btn-primary" onclick="showDetails('${productDetailsUrl}')">Details</button>
            </div>
        </div>
    </div> `

    resultSection.appendChild(cardElement);
}

// function for showing details of a product
const showDetails = async productDetailsUrl => {
    detailsPanel.style.display = 'block';
    detailsPanel.textContent = '';

    //api call for product detail
    const response = await fetch(productDetailsUrl);
    const data = await response.json();

    //Getting sensor data
    let allSensors = '';
    data.data.mainFeatures?.sensors.forEach(element => {
        allSensors = allSensors + element + '; ';
    });


    const detailCard = document.createElement('div');
    detailCard.classList.add('mx-lg-5', 'px-md-3', 'my-5');
    detailCard.innerHTML = `
        <div class="row g-2 shadow rounded p-3 g-3" style="min-height: 200px;">

            <div class="col-12 col-md-5 col-lg-3 d-flex flex-column align-items-center border pt-4 m-3">
                <img src="${data.data.image}" class="img-fluid rounded-start" style="display:block;">
                <h5 class="mt-3 text-primary" style="display:block;">${data.data.name}</h5>
                <p class="text-center" style="display:block; color:tomato">${data.data?.releaseDate ? data.data.releaseDate : 'No Release Date Found.'}</p>
            </div>
            
            <div class="col-12 col-md-6 col-lg-4">
                <p class="text-center text-primary"> <b>Main Feature</b> </p>
                <p>${data.data?.mainFeatures?.displaySize ? "Display: " + data.data.mainFeatures.displaySize : ""}</p>
                <p>${data.data?.mainFeatures?.chipSet ? "Chipset: " + data.data.mainFeatures.chipSet : ""}</p>
                <p>${data.data?.mainFeatures?.memory ? "Memory: " + data.data.mainFeatures.memory : ""}</p>
                <p>${data.data?.mainFeatures?.storage ? "Storage: " + data.data.mainFeatures.storage : ""}</p>
                
            </div>

            <div class="col-12 col-md-6 col-lg-4">
               
                <p class="text-center text-primary"> <b>Other Feature</b> </p>
                <p>${data.data?.others?.Bluetooth ? "Bluetooth: " + data.data.others.Bluetooth : "No"}</p>
                <p>${data.data?.others?.GPS ? "GPS: " + data.data.others.GPS : "No"}</p>
                <p>${data.data?.others?.NFC ? "NFC: " + data.data.others.NFC : "No"}</p>
                <p>${data.data?.others?.Radio ? "Radio: " + data.data.others.Radio : "No"}</p>
                <p>${data.data?.others?.USB ? "USB: " + data.data.others.USB : "No"}</p>
                <p>${data.data?.others?.WLAN ? "WLAN: " + data.data.others.WLAN : "No"}</p>
                
            </div>

            <div class="col-12 col-md-5 col-lg-12 m-3">
                <p class="text-center"> <b class="text-primary">Sensors: </b> ${allSensors ? allSensors : 'No Sensor Found.'}</p>
                
                
            </div >
        </div >
    `;
    detailsPanel.appendChild(detailCard);
}

// Handling search button click event
document.getElementById('search-btn').addEventListener('click', () => {
    if (!inputText.value) {
        noDataWarning.style.display = 'block';
        showMore.style.display = 'none';
        detailsPanel.style.display = 'none';
        landingImage.style.display = 'none';
        resultSection.textContent = '';

    } else if (inputText.value.trim().length === 0) {
        landingImage.style.display = 'none';
        inputText.value = '';
    } else {
        const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${inputText.value.trim().toLowerCase()}
        `;
        searchProduct(searchUrl);
    }
});
