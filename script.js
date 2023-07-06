/* Responsive Navbar  */

const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

if (bar) {
   bar.addEventListener("click", () => {
      nav.classList.add("active");
   });
}

/* API */

const searchButton = document.getElementById("search-button");
const inputKeyword = document.getElementById("input-keyword");
const catsRadio = document.getElementById("cats");
const dogsRadio = document.getElementById("dogs");
const petCards = document.getElementById("pet-cards");

// Event listener for search button
searchButton.addEventListener("click", function () {
   console.log("start");
   const keyword = inputKeyword.value.trim();
   inputKeyword.value = "";

   if (catsRadio.checked) {
      fetchAndRenderData("cats", keyword);
   } else if (dogsRadio.checked) {
      fetchAndRenderData("dogs", keyword);
   } else {
      Promise.all([fetchData("cats", keyword), fetchData("dogs", keyword)])
         .then(([catsData, dogsData]) => {
            const pets = [...catsData, ...dogsData];
            renderCards(pets);
         })
         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   }
   console.log("end");
});

// Fetch data from API
function fetchData(type, keyword) {
   const url = `https://api.api-ninjas.com/v1/${type}?name=${encodeURIComponent(
      keyword
   )}`;
   const headers = {
      "X-Api-Key": "NQixyJ5MEN4D4GQu/hPqgg==xvYvSjbn3dVSdPm6",
   };

   return fetch(url, { headers }).then((response) => {
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
   const cards = pets.map(showCard).join("");
   petCards.innerHTML = cards;
}

function showCard(data) {
   return `
      <div class="pet-card">
         <img src="${data.image_link}" alt="${data.name}">
         <h3>${data.name}</h3>
      </div>`;
}

/* CARD DETAIL */

const modalOverlay = document.querySelector(".modal-overlay");

document.addEventListener("click", function (e) {
   if (e.target.closest(".pet-card")) {
      modalOverlay.style.display = "block";
      console.log("OK");
   }
});

// Open the modal
function openModal() {
   modalOverlay.style.display = "block";
}

// Add event listener to open the modal
// const petCard = document.querySelector(".pet-card");
// petCard.addEventListener("click", () => (modalOverlay.style.display = "block"));

// Add event listener to close the modal
const closeButton = document.querySelector(".close-button");
closeButton.addEventListener(
   "click",
   () => (modalOverlay.style.display = "none")
);

/* Footer */

document.getElementById("currentYear").innerHTML = new Date().getFullYear();
