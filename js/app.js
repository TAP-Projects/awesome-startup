import { generateForm } from './search.js';
import { generateCard } from './card.js';
import { generateModal } from './modal.js';

generateForm();

document.getElementById('modal-container').setAttribute('style', 'display:none');

fetch('https://randomuser.me/api/1.3/?format=json&results=12&nat=us&exc=login,registered')
.then(res => res.json())
.then(displayProfiles)
.catch( err => console.log('Error fetching profiles', err) );

let data;
function displayProfiles(json){
    data = json.results;
    data.forEach( result => generateCard(result));
}

//generateModal();