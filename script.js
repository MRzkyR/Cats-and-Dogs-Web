/* Responsive Navbar  */

const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

if (bar) {
   bar.addEventListener("click", () => {
      nav.classList.add("active");
   });
}

/* API */

// Event listener for search button
// searchButton.addEventListener("click", function () {
//    console.log("start");
//    const keyword = inputKeyword.value.trim();
//    inputKeyword.value = "";

//    if (catsRadio.checked) {
//       fetchAndRenderData("cats", keyword);
//    } else if (dogsRadio.checked) {
//       fetchAndRenderData("dogs", keyword);
//    } else {
//       Promise.all([fetchData("cats", keyword), fetchData("dogs", keyword)])
//          .then(([catsData, dogsData]) => {
//             const pets = [...catsData, ...dogsData];
//             renderCards(pets);
//          })
//          .catch((error) => {
//             console.error("Error fetching data:", error);
//          });
//    }
//    console.log("end");
// });

// // Fetch data from API
// function fetchData(type, keyword) {
//    const url = `https://api.api-ninjas.com/v1/${type}?name=${encodeURIComponent(
//       keyword
//    )}`;
//    const headers = {
//       "X-Api-Key": "NQixyJ5MEN4D4GQu/hPqgg==xvYvSjbn3dVSdPm6",
//    };

//    return fetch(url, { headers }).then((response) => {
//       if (!response.ok) {
//          throw new Error(response.statusText);
//       }
//       return response.json();
//    });
// }

// // Fetch and render data for a specific type (cats or dogs)
// function fetchAndRenderData(type, keyword) {
//    fetchData(type, keyword)
//       .then((data) => {
//          renderCards(data);
//       })
//       .catch((error) => {
//          console.error(`Error fetching ${type} data:`, error);
//       });
// }

// Render pet cards

/* CARD DETAIL */

// const modalOverlay = document.querySelector(".modal-overlay");

// document.addEventListener("click", function (e) {
//    if (e.target.closest(".pet-card")) {
//       const name = e.target.dataset.name;
//       modalOverlay.style.display = "block";
//       // const
//    }
// });

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

// Event listener for search button
const searchButton = document.getElementById("search-button");
const inputKeyword = document.getElementById("input-keyword");
const catsRadio = document.getElementById("cats");
const dogsRadio = document.getElementById("dogs");
const petCards = document.getElementById("pet-cards");
const cardDetail = document.getElementById("card-detail");
const modalOverlay = document.querySelector(".modal-overlay");

searchButton.addEventListener("click", async function () {
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
});

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

document.addEventListener("click", async function (e) {
   const petCard = e.target.closest(".pet-card");

   if (petCard) {
      const name = petCard.dataset.name;
      const type = petCard.dataset.type;

      if (type === "cats") {
         const catDetail = await getCatDetail(name);
         renderDetails(catDetail);
      } else if (type === "dogs") {
         const dogDetail = await getDogDetail(name);
         renderDetails(dogDetail);
      } else {
         // Todo : show error
      }

      modalOverlay.style.display = "block";
   }
});

function getCatDetail(name) {
   return fetchData(`cats?name=${name}`);
}

function getDogDetail(name) {
   return fetchData(`dogs?name=${name}`);
}

function renderDetails(pet) {
   const details = showDetail(pet[0]);
   cardDetail.innerHTML = details;
}

function showDetail(data) {
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
               <td>12 to 16 inch</td>
            </tr>
            <tr>
               <td>Minimum Weight</td>
               <td>6 pounds</td>
            </tr>
            <tr>
               <td>Maximum Weight</td>
               <td>10 pounds</td>
            </tr>
            <tr>
               <td>Minimum Life Expentancy</td>
               <td>12 years</td>
            </tr>
            <tr>
               <td>Maximum Life Expentancy</td>
               <td>12 years</td>
            </tr>
            <tr>
               <td>Family Friendly</td>
               <td>
                  <div class="values">
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                  </div>
               </td>
            </tr>
            <tr>
               <td>Shedding</td>
               <td>
                  <div class="values">
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                  </div>
               </td>
            </tr>
            <tr>
               <td>General Health</td>
               <td>
                  <div class="values">
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                  </div>
               </td>
            </tr>
            <tr>
               <td>Playfulness</td>
               <td>
                  <div class="values">
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                  </div>
               </td>
            </tr>
            <tr>
               <td>Children Friendly</td>
               <td>
                  <div class="values">
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                  </div>
               </td>
            </tr>
            <tr>
               <td>Grooming</td>
               <td>
                  <div class="values">
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                  </div>
               </td>
            </tr>
            <tr>
               <td>Intelligence</td>
               <td>
                  <div class="values">
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                  </div>
               </td>
            </tr>
            <tr>
               <td>Other Pets Friendly</td>
               <td>
                  <div class="values">
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                  </div>
               </td>
            </tr>
         </table>
      </div>`;
}

/* Footer */

document.getElementById("currentYear").innerHTML = new Date().getFullYear();
