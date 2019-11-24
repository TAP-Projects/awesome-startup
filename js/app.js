import { fetchData, indexData } from "./helpers.js";
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
	// The data argument to indexData is the holder defined on line 29
	.then(indexData)
	.then(res=>data = res)
	.then(displayProfiles);

// Display profiles
// displayProfile takes an array of profile objects and loops over it to generate profile cards, attaching a click listener to each. On click, we call populateModal, passing in the card, which we'll use to populate the modal.
export function displayProfiles(data) {
	data.forEach(card => {
		const cardNode = generateCard(card);
		cardNode.addEventListener("click", e => populateModal(e, card));
		// We populate the cardNodes array just once on the initial call to displayProfiles
		if (cardNodes.length < 12) cardNodes.push(cardNode);
	});
	console.log("The data is: ", data);
}
