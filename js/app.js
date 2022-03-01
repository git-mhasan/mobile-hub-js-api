// function for getting dom element by id Name
const getDomElement = idName => document.getElementById(idName);

const inputText = getDomElement('input-txt');
const resultSection = getDomElement('result-section');
const noDataWarning = getDomElement('no-data-warning');
const waitSpinner = getDomElement('spinner');
const horizontalBar = getDomElement('horizontal-bar');
const showMore = getDomElement('show-more')

// Handling search button click event
document.getElementById('search-btn').addEventListener('click', () => {
    if (!inputText.value) {
    } else if (inputText.value.trim().length === 0) {
        inputText.value = '';
    } else {
        const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${inputText.value.trim().toLowerCase()}
        `;
        searchProduct(searchUrl);

    }

});

// search function for fetching data
const searchProduct = async urlString => {
    showMore.style.display = 'none';
    horizontalBar.style.display = 'none';
    waitSpinner.style.display = 'block';
    noDataWarning.style.display = 'none';

    const response = await fetch(urlString);
    const data = await response.json();

    resultSection.textContent = '';
    waitSpinner.style.display = 'none';

    if (data.data.length !== 0) {
        horizontalBar.style.display = 'block';
        let maxDataToShow = data.data;
        if (data.data.length > 20) {
            maxDataToShow = data.data.slice(0, 20)
            showMore.style.display = 'block';
            showMore.addEventListener('click', () => {
                maxDataToShow = data.data;
                // console.log(maxDataToShow);
                showSearchResult(maxDataToShow);
                showMore.style.display = 'none';
            })
        }
        showSearchResult(maxDataToShow);
    }
    else {
        noDataWarning.style.display = 'block';
    }
}

// show more product
const showMoreProducts = () => {

}

const showSearchResult = maxDataToShow => {
    maxDataToShow.forEach(element => {
        const productDetailsUrl = `https://openapi.programming-hero.com/api/phone/${element.slug}`;
        populateProductCard(element.image, element.phone_name, element.brand, productDetailsUrl);
        // console.log(element);
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
    const response = await fetch(productDetailsUrl);
    const data = await response.json();
    console.log(data);
}