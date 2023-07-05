const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

if (bar) {
   bar.addEventListener("click", () => {
      nav.classList.add("active");
   });
}

// API
// Get DOM elements
const searchButton = document.getElementById("search-button");
const inputKeyword = document.getElementById("input-keyword");
const catsRadio = document.getElementById("cats");
const dogsRadio = document.getElementById("dogs");
const petCards = document.getElementById("pet-cards");

// Event listener for search button
searchButton.addEventListener("click", function () {
   console.log('start');
   const keyword = inputKeyword.value.trim();

   if (catsRadio.checked) {
      fetchAndRenderData('cats', keyword);
   } else if (dogsRadio.checked) {
      fetchAndRenderData('dogs', keyword);
   } else {
      Promise.all([fetchData('cats', keyword), fetchData('dogs', keyword)])
         .then(([catsData, dogsData]) => {
            const pets = [...catsData, ...dogsData];
            renderCards(pets);
         })
         .catch((error) => {
            console.error('Error fetching data:', error);
         });
   }
   console.log('end');
});

// Fetch data from API
function fetchData(type, keyword) {
   const url = `https://api.api-ninjas.com/v1/${type}?name=${encodeURIComponent(keyword)}`;
   const headers = {
      "X-Api-Key": "NQixyJ5MEN4D4GQu/hPqgg==xvYvSjbn3dVSdPm6",
   };

   return fetch(url, { headers })
      .then((response) => {
         if (!response.ok) {
            throw new Error(response.statusText);
         }
         return response.json();
      });
}

// Fetch and render data for a specific type (cats or dogs)
function fetchAndRenderData(type, keyword) {
   fetchData(type, keyword)
      .then((data) => {
         renderCards(data);
      })
      .catch((error) => {
         console.error(`Error fetching ${type} data:`, error);
      });
}

// Render pet cards
function renderCards(pets) {
   let cards = "";
   pets.forEach((pet) => {
      cards += showCards(pet);
   });
   petCards.innerHTML = cards;
}

function showCards(data) {
   return `
      <div class="pet-card">
         <img src="${data.image_link}" alt="${data.name}">
         <h3>${data.name}</h3>
      </div>`;
}


// const searchButton = document.getElementById("search-button");

// searchButton.addEventListener("click", function () {
//    const inputKeyword = document.getElementById("input-keyword");
//    const catsRadio = document.getElementById("cats");
//    const dogsRadio = document.getElementById("dogs");

//    if (catsRadio.checked) {
//       fetchData('cats', inputKeyword.value);
//    } else if (dogsRadio.checked) {
//       fetchData('dogs', inputKeyword.value);
//    } else {
//       fetchData('cats', inputKeyword.value);
//       fetchData('dogs', inputKeyword.value);
//    }
// });

// function fetchData(type, keyword) {
//    fetch(`https://api.api-ninjas.com/v1/${type}?name=${keyword}`, {
//       headers: {
//          "X-Api-Key": "NQixyJ5MEN4D4GQu/hPqgg==xvYvSjbn3dVSdPm6",
//       },
//    })
//       .then((response) => response.json())
//       .then((data) => {
//          let cards = "";
//          data.forEach((p) => (cards += showCards(p)));
//          const petCards = document.getElementById("pet-cards");
//          petCards.innerHTML = cards;
//       });
// }


// Footer

document.getElementById("currentYear").innerHTML = new Date().getFullYear();
