// function for getting dom element by id Name
const getDomElement = idName => document.getElementById(idName);

const inputText = getDomElement('input-txt');
const resultSection = getDomElement('result-section');

document.getElementById('search-btn').addEventListener('click', () => {
    if (!inputText.value) {
        // console.log('boo');
    } else if (inputText.value.trim().length === 0) {
        // console.log('all space');
        inputText.value = '';
    } else {
        const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${inputText.value.trim().toLowerCase()}
        `;
        searchProduct(searchUrl);
        // inputText.value = '';

    }

});

// search function for fetching data
const searchProduct = async urlString => {
    const response = await fetch(urlString);
    const data = await response.json();

    resultSection.textContent = '';

    data.data.forEach(element => {
        const productDetailsUrl = `https://openapi.programming-hero.com/api/phone/${element.slug}`;
        populateProductCard(element.image, element.phone_name, element.brand, productDetailsUrl);
        // console.log(element);
    });
    // console.log(getDomElement('result-section'));
}

// function for populating search result
const populateProductCard = (imageString, productName, brandName, productDetailsUrl) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('col-12', 'col-md-6', 'col-lg-4')

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

const showDetails = async productDetailsUrl => {
    const response = await fetch(productDetailsUrl);
    const data = await response.json();
    console.log(data);
}