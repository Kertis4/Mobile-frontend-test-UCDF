


function selectOptionInput(dropdown, value) {
  document.getElementById(dropdown + "Input").value = value;
}

function downloadData() {
  const indicator = document.getElementById("indicatorInput").value;
  const federal = document.getElementById("federalInput").value;
  const state = document.getElementById("stateInput").value;
  const year1 = document.getElementById("year1Input").value;
  const year2 = document.getElementById("year2Input").value;

  const csvContent = `Indicator,Federal,State,Year 1,Year 2\n${indicator},${federal},${state},${year1},${year2}`;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

let indicatorMap = {}; // Holds Economic and Environment indicators

// Elements
const topicBtn = document.getElementById("topicBtn");
const indicatorBtn = document.getElementById("indicatorBtn");
const indicatorOptions = document.getElementById("indicatorOptions");
const startYearInput = document.getElementById("year1Input");
const endYearInput = document.getElementById("year2Input");
const commentInput = document.getElementById("commentInput"); // Now with id="commentInput"
const downloadBtn = document.getElementById("downloadBtn");

// Load indicator map from API
async function loadIndicators() {
  try {
    const res = await fetch("https://byteme.kilianpl.app/api/indicators");
    indicatorMap = await res.json();
  } catch (e) {
    console.error("Failed to load indicators:", e);
  }
}

// Update indicator dropdown based on selected topic
function updateIndicators(topic) {
  // Update topic button text
  topicBtn.textContent = topic;

  // Some APIs might use 'Economic' instead of 'Economy', adjust if needed here
  // For now assuming 'Economic' and 'Environment' keys from API
  let key = topic;
  if (topic === "Economy") key = "Economic"; // Map 'Economy' to 'Economic'

  const indicators = Object.keys(indicatorMap[key] || {});

  indicatorOptions.innerHTML = ""; // Clear old options
  indicators.forEach((indicator) => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = indicator;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      indicatorBtn.textContent = indicator;
    });
    indicatorOptions.appendChild(a);
  });

  indicatorBtn.textContent = "Select Indicator";
}

// Event listeners for your topic dropdown anchors
document.getElementById("topicDropdown").querySelectorAll("a").forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const selectedTopic = e.target.textContent;
    updateIndicators(selectedTopic);
  });
});

// Download button click handler
downloadBtn.addEventListener("click", () => {
  const topic = topicBtn.textContent.trim();
  const indicatorName = indicatorBtn.textContent.trim();
  const startYear = startYearInput.value.trim();
  const endYear = endYearInput.value.trim();
  const comment = commentInput.value.trim();

  if (indicatorName === "Select Indicator" || !startYear || !endYear) {
    alert("Please select all options and enter a valid year range.");
    return;
  }

  // Map topic to API keys if needed
  let key = topic;
  if (topic === "Economy") key = "Economic";

  // Get indicator code from loaded indicators map
  const indicatorCode = indicatorMap[key]?.[indicatorName];
  if (!indicatorCode) {
    alert("Invalid indicator selected.");
    return;
  }

  // Build comment string starting with StartYear-EndYear then optional comment (space separated)
  const commentString = `${startYear}-${endYear}${comment ? " " + comment : ""}`;

  // Construct URL
  const url = `https://byteme.kilianpl.app/api/ai/${encodeURIComponent(indicatorCode)}/${encodeURIComponent(commentString)}`;

  // Open the API endpoint in a new tab (GET request)
  window.open(url, "_blank");
});

// Load indicators on page load and initialize topic dropdown
loadIndicators().then(() => {
  // Optionally initialize with no topic selected or with default topic
  // Comment out if you want blank initially
  // updateIndicators("Economy");
});





function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }


//async function populateFederalStates() {
  //const apiUrl = "https://byteme.kilianpl.app/api/federal-states";

  //try {
    // Fetch the data from the API
    //const response = await fetch(apiUrl);

    // Check if the response is okay
    //if (!response.ok) {
      //throw new Error(`HTTP error! Status: ${response.status}`);
   // }

    // Parse the JSON data
    //const federalStates = await response.json();

    // Get the dropdown content container
    //const dropdownContent = document.querySelector(".dropdown-content-federal");

    // Remove any existing static options (if needed)
    //const existingLinks = dropdownContent.querySelectorAll("a");
    //existingLinks.forEach((link) => link.remove());

    // Add each federal state as an option in the dropdown menu
    //federalStates.forEach((state) => {
      //const option = document.createElement("a");
      //option.href = "javascript:void(0);";
      //option.setAttribute(
        //"onclick",
        //`selectOptionInput('federal', '${state}')`,
      //);
      //option.textContent = state;

      //dropdownContent.appendChild(option);
    //});

    //console.log("Dropdown populated successfully.");
  //} catch (error) {
    //console.error("Error fetching or populating federal states:", error);
  //}
//}


function filterDropdown(dropdownId, inputId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toUpperCase();
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    const links = dropdown.getElementsByTagName("a");

    for (let i = 0; i < links.length; i++) {
        const txtValue = links[i].textContent || links[i].innerText;
        links[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
}
// Call the function to populate the dropdown when the

// Call the function to populate the dropdown when the page loads
document.addEventListener("DOMContentLoaded", populateIndicators());

}
