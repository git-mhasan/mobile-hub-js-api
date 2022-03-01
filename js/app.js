// function for getting dom element by id Name
const getDomElement = idName => document.getElementById(idName);

const inputText = getDomElement('input-txt');
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

const searchProduct = data => {

    console.log(data);
    // console.log(getDomElement('result-section'));
}

// function for populating search result
const populateProductCard = (imageString, productName, brandName, productDetails) => {

}

