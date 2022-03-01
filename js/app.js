console.log('hello.')

document.getElementById('search-btn').addEventListener('click', () => {
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        .then(response => response.json())
        .then(data => console.log(data.data));
});

const searchData = data => {

}

// function for populating search result

const populateProductCard = (imageString, productName, brandName) => {

}
