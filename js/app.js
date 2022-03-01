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
        populateProductCard(element.image, element.phone_name, element.brand);
        console.log(element);
    });
    // console.log(getDomElement('result-section'));
}

// function for populating search result
const populateProductCard = (imageString, productName, brandName, productDetails) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('col-12', 'col-md-6', 'col-lg-4')
    // cardElement.innerHTML = `<div class="card text-center">
    //     <img src="${imageString}" class="card-img-top p-4 w-50">
    //     <div class="card-body">
    //         <h5 class="card-title">${productName}</h5>
    //         <h6 class="card-text">Brand: ${brandName}</h6>
    //         <button class="btn btn-primary">Details</button>
    //     </div>
    // </div>
    // `;

    cardElement.innerHTML = `<div class="row g-2 shadow rounded p-3">
        <div class="col-md-4">
            <img src="${imageString}" class="img-fluid rounded-start">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${productName}</h5>
                <h6 class="card-text">Brand: ${brandName}</h6>
                <button class="btn btn-primary">Details</button>
            </div>
        </div>
    </div> `

    resultSection.appendChild(cardElement);
}

