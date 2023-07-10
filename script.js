/* Responsive Navbar  */

const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

bar?.addEventListener("click", toggleNav);
close?.addEventListener("click", toggleNav);

function toggleNav() {
  nav.classList.toggle("active");
}


const searchNow = document.getElementById("search-now");
searchNow?.addEventListener("click", () => {
   console.log("su");
   window.location.href = "breed.html";
});


/* Stars Review */

const reviewCards = document.querySelectorAll(".review-card");

if (reviewCards) {
   reviewCards.forEach((card) => {
      const stars = card.querySelectorAll(".stars i");
      let isClicked = false;

      stars.forEach((star, index) => {
         star.addEventListener("mouseenter", () => {
            if (!isClicked) {
               fillStars(stars, index);
            }
         });

         star.addEventListener("mouseleave", () => {
            if (!isClicked) {
               resetStars(stars);
            }
         });

         star.addEventListener("click", () => {
            isClicked = true;
            selectStars(stars, index);
         });
      });
   });

   function fillStars(stars, index) {
      for (let i = 0; i <= index; i++) {
         stars[i].classList.replace("fa-regular", "fa-solid");
      }
   }

   function resetStars(stars) {
      stars.forEach((star) => {
         star.classList.replace("fa-solid", "fa-regular");
      });
   }

   function selectStars(stars, index) {
      for (let i = 0; i < stars.length; i++) {
         if (i <= index) {
            stars[i].classList.replace("fa-regular", "fa-solid");
         } else {
            stars[i].classList.replace("fa-solid", "fa-regular");
         }
      }
   }
}


/* Search Breeds */

const searchButton = document.getElementById("search-button");
const inputKeyword = document.getElementById("input-keyword");
const catsRadio = document.getElementById("cats");
const dogsRadio = document.getElementById("dogs");
const allRadio = document.getElementById("all");
const petCards = document.getElementById("pet-cards");
const cardDetail = document.getElementById("card-detail");
const modalOverlay = document.querySelector(".modal-overlay");

catsRadio?.addEventListener("click", () => {
   inputKeyword.placeholder = "Search cat breeds...";
});

dogsRadio?.addEventListener("click", () => {
   inputKeyword.placeholder = "Search dog breeds...";
});

allRadio?.addEventListener("click", () => {
   inputKeyword.placeholder = "Search all breeds...";
});

inputKeyword?.addEventListener("keydown", function (event) {
   if (event.keyCode === 13) {
      searchButtonFunction();
   }
});

searchButton?.addEventListener("click", searchButtonFunction);

async function searchButtonFunction() {
   const keyword = inputKeyword.value;
   inputKeyword.value = "";

   let pets;
   if (catsRadio.checked) {
      pets = await getCats(keyword);
   } else if (dogsRadio.checked) {
      pets = await getDogs(keyword);
   } else {
      const [cats, dogs] = await Promise.all([
         getCats(keyword),
         getDogs(keyword),
      ]);
      pets = [...cats, ...dogs];
   }

   renderCards(pets);
}

function fetchData(url) {
   const apiUrl = `https://api.api-ninjas.com/v1/${url}`;
   const headers = {
      "X-Api-Key": "NQixyJ5MEN4D4GQu/hPqgg==xvYvSjbn3dVSdPm6",
   };

   return fetch(apiUrl, { headers }).then((response) => {
      if (!response.ok) {
         throw new Error(response.statusText);
      }
      return response.json();
   });
}

function getCats(keyword) {
   return fetchData(`cats?name=${keyword}`);
}

function getDogs(keyword) {
   return fetchData(`dogs?name=${keyword}`);
}

function renderCards(pets) {
   if (Object.keys(pets).length === 0) {
      petCards.innerHTML = "No pets found.";
      return;
   }

   const cards = pets.map(showCard).join("");
   petCards.innerHTML = cards;
}

function showCard(data) {
   return `
    <div class="pet-card" data-name="${data.name}" data-type="${
      data.image_link.split("/")[4]
   }">
      <img src="${data.image_link}" alt="${data.name}">
      <h3>${data.name}</h3>
    </div>`;
}

/* Detail breeds */

document.addEventListener("click", async function (e) {
   const petCard = e.target.closest(".pet-card");

   if (petCard) {
      const name = petCard.dataset.name;
      const type = petCard.dataset.type;

      if (type === "cats") {
         const catDetail = await getCatDetail(name);
         renderCatDetails(catDetail);
      } else if (type === "dogs") {
         const dogDetail = await getDogDetail(name);
         renderDogDetails(dogDetail);
      } else {
         // Todo : show error
      }

      modalOverlay.style.display = "flex";
   }
});


function getCatDetail(name) {
   return fetchData(`cats?name=${name}`);
}

function getDogDetail(name) {
   return fetchData(`dogs?name=${name}`);
}

function renderCatDetails(cat) {
   const details = showCatDetail(cat[0]);
   cardDetail.innerHTML = details;
}

function renderDogDetails(dog) {
   const details = showDogDetail(dog[0]);
   cardDetail.innerHTML = details;
}

function showCatDetail(data) {
   return `
      <div class="identify">
         <div id="image-detail">
            <img
               src="${data.image_link}"
               alt="${data.name}"
            />
         </div>
         <h3>${data.name}</h3>
         <p>${data.origin}</p>
      </div>

      <div class="details">
         <table>
            <tr>
               <td>Length</td>
               <td>${data.length}</td>
            </tr>
            <tr>
               <td>Minimum Weight</td>
               <td>${data.min_weight}</td>
            </tr>
            <tr>
               <td>Maximum Weight</td>
               <td>${data.max_weight}</td>
            </tr>
            <tr>
               <td>Minimum Life Expentancy</td>
               <td>${data.min_life_expectancy}</td>
            </tr>
            <tr>
               <td>Maximum Life Expentancy</td>
               <td>${data.max_life_expectancy}</td>
            </tr>
            <tr>
               <td>Family Friendly</td>
               <td>${generateStarRating(data.family_friendly)}</td>
            </tr>
            <tr>
               <td>Children Friendly</td>
               <td>${generateStarRating(data.children_friendly)}</td>
            </tr>
            <tr>
               <td>Other Pets Friendly</td>
               <td>${generateStarRating(data.other_pets_friendly)}</td>
            </tr>
            <tr>
               <td>Shedding</td>
               <td>${generateStarRating(data.shedding)}</td>
            </tr>
            <tr>
               <td>General Health</td>
               <td>${generateStarRating(data.general_health)}</td>
            </tr>
            <tr>
               <td>Playfulness</td>
               <td>${generateStarRating(data.playfulness)}</td>
            </tr>
            <tr>
               <td>Grooming</td>
               <td>${generateStarRating(data.grooming)}</td>
            </tr>
            <tr>
               <td>Intelligence</td>
               <td>${generateStarRating(data.intelligence)}</td>
            </tr>
         </table>
      </div>`;
}

function showDogDetail(data) {
   return `
      <div class="identify">
         <div id="image-detail">
            <img
               src="${data.image_link}"
               alt="${data.name}"
            />
         </div>
         <h3>${data.name}</h3>
      </div>

      <div class="details">
         <table>
            <tr>
               <td>Minimum Height</td>
               <td>${data.min_height_male}</td>
            </tr>
            <tr>
               <td>Maximum Height</td>
               <td>${data.max_height_male}</td>
            </tr>
            <tr>
               <td>Minimum Weight</td>
               <td>${data.min_weight_male}</td>
            </tr>
            <tr>
               <td>Maximum Weight</td>
               <td>${data.max_weight_male}</td>
            </tr>
            <tr>
               <td>Minimum Life Expentancy</td>
               <td>${data.min_life_expectancy}</td>
            </tr>
            <tr>
               <td>Maximum Life Expentancy</td>
               <td>${data.max_life_expectancy}</td>
            </tr>
            <tr>
               <td>Family Friendly</td>
               <td>${generateStarRating(data.good_with_strangers)}</td>
            </tr>
            <tr>
               <td>Children Friendly</td>
               <td>${generateStarRating(data.good_with_children)}</td>
            </tr>
            <tr>
               <td>Other Pets Friendly</td>
               <td>${generateStarRating(data.good_with_other_dogs)}</td>
            </tr>
            <tr>
               <td>Shedding</td>
               <td>${generateStarRating(data.shedding)}</td>
            </tr>
            <tr>
               <td>Playfulness</td>
               <td>${generateStarRating(data.playfulness)}</td>
            </tr>
            <tr>
               <td>Grooming</td>
               <td>${generateStarRating(data.grooming)}</td>
            </tr>
            <tr>
               <td>Drooling</td>
               <td>${generateStarRating(data.drooling)}</td>
            </tr>
            <tr>
               <td>Coat Length</td>
               <td>${generateStarRating(data.coat_length)}</td>
            </tr>
            <tr>
               <td>Protectiveness</td>
               <td>${generateStarRating(data.protectiveness)}</td>
            </tr>
            <tr>
               <td>Trainability</td>
               <td>${generateStarRating(data.trainability)}</td>
            </tr>
            <tr>
               <td>Energy</td>
               <td>${generateStarRating(data.energy)}</td>
            </tr>
            <tr>
               <td>barking</td>
               <td>${generateStarRating(data.barking)}</td>
            </tr>
         </table>
      </div>`;
}

function generateStarRating(number) {
   let stars = "";
   for (let i = 1; i <= number; i++) {
      stars += '<i class="fa-solid fa-star"></i>';
   }
   for (let i = number + 1; i <= 5; i++) {
      stars += '<i class="fa-regular fa-star"></i>';
   }
   return '<div class="values">' + stars + "</div>";
}

const closeButton = document.querySelector(".close-button");

closeButton?.addEventListener("click", () => {
   modalOverlay.style.display = "none";
});

/* Footer */

document.getElementById("currentYear").innerHTML = new Date().getFullYear();
