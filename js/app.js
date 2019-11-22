import { fetchData } from "./helpers.js";
import { generateForm } from "./search.js";
import { generateCard } from "./card.js";
import { generateModal } from "./modal.js";

// Generate the search form
generateForm();

// Generate the modal window
generateModal();

// Get reference to modal bits
const modalContainer = document.getElementById("modal-container");
const modalDiv = document.getElementById("modal-div")
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalEmail = document.getElementById("modal-email");
const modalCity = document.getElementById("modal-city");
const modalTel = document.getElementById("modal-tel");
const modalAddress = document.getElementById("modal-address");
const modalDOB = document.getElementById("modal-dob");

// Hide the modal container
modalContainer.setAttribute("style", "display:none");

// Get ready for the profiles
export let data;

// Fetch the profiles and display them when the data arrives
fetchData(
	"https://randomuser.me/api/1.3/?format=json&results=12&nat=us&exc=login,registered"
).then(displayProfiles);

// Display profiles
function displayProfiles(json) {
	// Set data to parsed results
	data = json.results;
	// Loop over the data and generate cards and attach listeners/handlers
	data = data.map((result, index) => {
		// Create an index entry for each profile object
		result.index = index;
		// Generate the card
		const theCard = generateCard(result);
		// On click, populate the modal. The modal itself is generated just once.
		theCard.addEventListener("click", e => populateModal(e, result));
		return result;
	});
	console.log(data)
}

// On card click, populate the modal and show it
export function populateModal(e, result) {
	// Deconstruct some variables
	const { index, name, location, email, dob, phone, picture } =
		result;
	const { street, city, state, postcode } = location;

	// Insert new profile details, after ensuring the detail is present
	function addModalData() {
		modalDiv.dataset.index = index;
		modalImg.src = picture.large
			? picture.large
			: "../images/no-image-available.png";
		modalName.textContent =
			name.first && name.last
				? name.first + " " + name.last
				: name.first || name.last;
		modalEmail.textContent = email;
		modalCity.textContent = city ? city : "";
		modalTel.textContent = phone ? phone : "";
		// Build the full address string
		let Address = "";
		if (street.number && street.name)
			Address += street.number + " " + street.name;
		if (city) Address += ", " + city;
		if (state) Address += ", " + state;
		if (postcode) Address += " " + postcode;
		modalAddress.textContent = Address;
		const DOB = new Date(dob.date);
		modalDOB.textContent = `Birthday: ${DOB.getMonth()} / ${DOB.getDate()} / ${DOB.getFullYear()}`;
	}

	addModalData();

	// Show modal
	document
		.getElementById("modal-container")
		.setAttribute("style", "display:fixed");
}
