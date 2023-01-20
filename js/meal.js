const loadMeal = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  // console.log(meals);
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.textContent = "";
  meals.forEach((meal) => {
    // console.log(meal);
    const mealsDiv = document.createElement("div");
    mealsDiv.classList.add("col");
    mealsDiv.innerHTML = `
    <div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h1>${meal.strTags}</h1>
      <h2>${meal.strArea}</h2>
      <h3>${meal.strCategory}</h3>
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">
       ${meal.strInstructions.slice(0, 120)}
      </p>
      <button onclick="loadMealDetails('${
        meal.idMeal
      }')" class="btn btn-success">Search Details</button>
    </div>
  </div>
    `;
    mealsContainer.appendChild(mealsDiv);
  });
};

const searchMeal = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadMeal(searchText);
  searchField.value = "";
};

const loadMealDetails = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
};

const displayMealDetails = (meal) => {
  console.log(meal);
  const mealsDetails = document.getElementById("meals-details");
  mealsDetails.textContent = "";
  const mealsDiv = document.createElement("div");
  mealsDiv.classList.add("card");
  mealsDiv.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
  <div class="card-body">
  <h1>${meal.strTags}</h1>
  <h2>${meal.strArea}</h2>
  <h3>${meal.strCategory}</h3>
  <h5 class="card-title">${meal.strMeal}</h5>
  <p class="card-text">
   ${meal.strInstructions.slice(0, 120)}
  </p>
    <a href="${meal.strYoutube}" class="btn btn-success">Go somewhere</a>
  </div>
  `;
  mealsDetails.appendChild(mealsDiv);
};

loadMeal("fish");
