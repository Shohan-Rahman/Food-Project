const allProduct = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`)
            .then((res) =>res.json())
            .then((data) => {
                serialProduct(data);
            });
};
const searchProduct = (query) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then((res) =>res.json())
            .then((data) => {
                if(data.meals){
                    serialProduct(data);
                }
                else{
                    noResult();
                }
            });
};

const serialProduct = (product) => {
    const container = document.getElementById("content");
    container.innerHTML="";
    
    product.meals.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("element");

        div.innerHTML = `
            <img class="food-img" src="${element.strMealThumb}"/>
            <h3>Name: ${element.strMeal}</h3>
            <a href="${element.strYoutube}" target="_blank" class="youtube">
                <i class="fa-brands fa-youtube"></i>
            </a>
            <h5>Origin: ${element.strArea}</h5>
            <h6>Tag: ${element.strTags}</h6>
            <h6>Category: ${element.strCategory}</h6>
            <p>${element.strInstructions.slice(0,45)}</p>
            <button onclick="chooseFav('${element.strMeal}')">Add to favorite</button>
            <button onclick="details('${element.idMeal}')">Details</button>
            `;
        container.appendChild(div); 
    });
};

const noResult = () => {
    document.getElementById("content").innerHTML = "<h3>No meals found</h3>";
};

document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.getElementById("search-box").value
    if(query){
        searchProduct(query);
    }
    else{
        document.getElementById("content").innerHTML = "<p>Please enter a search term.</p>";
    }
});

const chooseFav = (name) => {
    const productCount = document.getElementById("count").innerText;
    let convertedCount = parseInt(productCount);
    if(convertedCount < 11){
        convertedCount += 1;
        document.getElementById("count").innerText = convertedCount;
        
        const container = document.getElementById("food-add");

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${name}</h3>
        `
        container.appendChild(div);
    }
    else{
        alert("Don't cross the limit!");
    }
};

const details = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res=>res.json())
            .then(meal => {
                const modalBody = document.getElementById("modal-body-content");
                modalBody.innerHTML = `
                    <img class="food-modal-img" src="${meal.meals[0].strMealThumb}"/>
                    <h3>${meal.meals[0].strMeal}</h3>
                    <a href="${meal.meals[0].strYoutube}" target="_blank" class="youtube">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                    <h5>${meal.meals[0].strArea}</h5>
                    <h6>${meal.meals[0].strTags}</h6>
                    <h6>${meal.meals[0].strCategory}</h6>
                    <p>${meal.meals[0].strInstructions.slice(0,300)}</p>
                `;
                const modal = new bootstrap.Modal(document.getElementById("detailsModal"));
                modal.show();
            })
};
allProduct();