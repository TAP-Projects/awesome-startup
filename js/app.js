import { fetchData } from "./helpers.js";
import { generateForm } from "./search.js";
import { generateCard } from "./card.js";
import { generateModal, populateModal } from "./modal.js";

// Generate the search form
generateForm();

// Generate the modal window
generateModal();

// Get reference to modal bits
export const modalDOM = {
	modalContainer: document.getElementById("modal-container"),
	modalDiv: document.getElementById("modal-div"),
	modalImg: document.getElementById("modal-img"),
	modalName: document.getElementById("modal-name"),
	modalEmail: document.getElementById("modal-email"),
	modalCity: document.getElementById("modal-city"),
	modalTel: document.getElementById("modal-tel"),
	modalAddress: document.getElementById("modal-address"),
	modalDOB: document.getElementById("modal-dob")
}

// Hide the modal container
modalDOM.modalContainer.setAttribute("style", "display:none");

// Get ready for the profiles
export let data;

// Fetch the profiles and display them when the data arrives
fetchData(
	"https://randomuser.me/api/1.3/?format=json&results=12&nat=us&exc=login,registered"
)
	.then(indexData)
	.then(displayProfiles);

// Index data
function indexData(json){
	// Set data to parsed results
	data = json.results;
	// And add an index
	data.forEach((profile, index)=>profile.index = index);
	console.log("Indexed data", data)
	return data;
}

// Display profiles
export function displayProfiles(data) {
	// Loop over the data and generate cards and attach listeners/handlers
	data.forEach(result => {
		// Generate the card
		const theCard = generateCard(result);
		// On click, populate the modal. The modal itself is generated just once.
		theCard.addEventListener("click", e => populateModal(e, result));
		//return result;
	});
	console.log("The data after displayProfiles", data)
	
}


