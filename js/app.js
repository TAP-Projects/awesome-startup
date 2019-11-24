import { fetchData } from "./helpers.js";
import { generateForm } from "./search.js";
import { generateCard } from "./card.js";
import { generateModal, populateModal } from "./modal.js";

// Generate the search form
generateForm();

// Generate the modal window
generateModal();

// Get references to modal elements in the DOM
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
};

// Hide the modal container
modalDOM.modalContainer.setAttribute("style", "display:none");

// data will hold the profile data - an array of profile objects
export let data;
// cardNodes will holds the card nodes created on the first call to displayProfile
export const cardNodes = [];

// Fetch the profiles and display them when the data arrives
fetchData(
	"https://randomuser.me/api/1.3/?format=json&results=12&nat=us&exc=login,registered"
)
	.then(indexData)
	.then(displayProfiles);

// Index data
function indexData(json) {
	// Set data to parsed results
	data = json.results;
	// And add an index
	data.forEach((profile, index) => (profile.index = index));
	return data;
}

// Display profiles
// displayProfile takes an array of profile objects and loop over it to generate profile cards, attaching a click listener to each. On click, we call populateModal, passing in the card, which we'll use to populate the modal.
export function displayProfiles(data) {
	data.forEach(card => {
		const cardNode = generateCard(card);
		cardNode.addEventListener("click", e => populateModal(e, card));
		// We populate the cardNodes array just once on the initial call to displayProfiles
		if (cardNodes.length < 12) cardNodes.push(cardNode);
	});
	console.log("The cardNodes array: ", cardNodes)
}
console.log("The cardNodes array, before the cards nodes are built: ", cardNodes)
