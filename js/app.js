import { generateForm } from "./search.js";
import { generateCard } from "./card.js";
import { generateModal } from "./modal.js";

// Generate the search form
generateForm();

// Generate the modal window
generateModal();

// Get reference to modal bits
const modalContainer = document.getElementById("modal-container");
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
let data;

// Get the profile data, generate and append the profile cards
fetchProfiles();

// Fetch the profiles and display them when the data arrives
function fetchProfiles() {
	//!NOTE: Handling all errors? Connection? No match for query?
	// Fetch profiles
	fetch(
		"https://randomuser.me/api/1.3/?format=json&results=12&nat=us&exc=login,registered"
	)
		// Parse response
		.then(res => res.json())
		// Display profiles
		.then(displayProfiles)
		// Catch any errors
		.catch(err => console.log("Error fetching profiles", err));
}

// Display profiles
function displayProfiles(json) {
	// Set data to parsed results
	data = json.results;
	// Loop over the data and generate cards and attach listeners/handlers
	data.forEach(result => {
		// Generate the card
		const theCard = generateCard(result);
		// On click, populate the modal. The modal itself is generated just once.
		theCard.addEventListener("click", (e) => populateModal(e, result));
		//return data;
	});
}

// On card click, populate the modal and show it
export function populateModal(e, result, targetEmail) {

	// When calling populateModal from displayProfiles, the full profile object will be passed into populateModal. However, when calling populateModal from the prev or next buttons, the result argument will be null, and an email will be passed in. This email is used to find the profile object that it corresponds to.
	if(targetEmail){
		// Filter the data for the profile with the targetEmail
		const profile = data.filter((profile)=>{
			return profile.email === targetEmail;
		});
	}

	// Deconstruct some variables
	const { name, location, email, dob, phone, picture } = result || profile;
	const { street, city, state, postcode } = location;

	// Insert new profile details, after ensuring the detail is present
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

	// Show modal
	document
		.getElementById("modal-container")
		.setAttribute("style", "display:fixed");
}
