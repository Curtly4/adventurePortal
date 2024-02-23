const resetBtn = document.getElementById("resetBtn");
const resultDiv = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");
const keywordInput = document.getElementById("keyword");
let recommendations = [];
// function searchDestinations() {
//   // Clear previous search value
//   const input = document.getElementById("keyword").value.toLowerCase();
//   resultDiv.innerHTML = ""; // Use resultDiv directly since it's already declared

//   // Search for the input value in travel_recommendation_api.json
//   fetch("travel_recommendation_api.json") // Corrected to use string path
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Assuming your data structure has an array to be searched through
//       // Let's assume it's the countries array mentioned in your JSON structure
//       const cityMatches = data.countries.filter(
//         (country) =>
//           country.name.toLowerCase().includes(input) ||
//           country.cities.some((city) => city.name.toLowerCase().includes(input))
//       );

//       if (cityMatches.length > 0) {
//         cityMatches.forEach((cityMatch) => {
//           const elem = document.createElement("div");
//           elem.innerHTML =
//             `<img src="${cityMatch.imageUrl}" alt="${cityMatch.name}">
//             <h3>${cityMatch.name}</h3>` +
//             cityMatch.cities
//               .map((city) => `<p>${city.name}: ${city.description}</p>`)
//               .join("");
//           resultDiv.appendChild(elem);
//         });
//       } else {
//         resultDiv.innerHTML = "No destinations found.";
//         resultDiv.classList.remove("hidden");
//         resultDiv.classList.add("visible");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       resultDiv.innerHTML = "An error occurred while fetching data.";
//     });
// }

// searchBtn.addEventListener("click", searchDestinations);

function searchDestinations() {
  const input = document.getElementById("keyword").value.toLowerCase().trim();
  resultDiv.innerHTML = ""; // Clear previous results

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      // Determine which array to search based on the keyword
      if (input === "beach") {
        recommendations = data.beaches;
      } else if (input === "temple") {
        recommendations = data.temples;
      } else if (input === "country") {
        recommendations = data.countries.flatMap((country) => country.cities); // Flatten cities into a single array
      } else {
        resultDiv.innerHTML =
          "Please enter a valid keyword: beach, temple, or country.";
        return;
      }
      // Display at least two recommendations (or fewer if less than two are available)
      recommendations.slice(0, 2).forEach((item) => {
        const elem = document.createElement("div");
        elem.className = "recommendation";
        elem.innerHTML = `
          <h3>${item.name}</h3>
          <img src="${item.imageUrl}" alt="${item.name}" style="width: 200px; height: auto;">
          <p>${item.description}</p>
          <button class="visit" name="visit">Visit</button> 
        `;
        resultDiv.appendChild(elem);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
  resultDiv.style.display = "block";
}

searchBtn.addEventListener("click", searchDestinations);
// Function to clear search results and reset the search input field
function clearSearchResults() {
  resultDiv.innerHTML = ""; // Clear the content of the result div
  keywordInput.value = ""; // Reset the value of the search input field
  resultDiv.style.display = "none"; // Hide the result div
}

resetBtn.addEventListener("click", clearSearchResults);