const h1 = document.getElementById('main-title');

h1.textContent = 'New title!';
h1.style.color = 'white';
h1.style.backgroundColor = 'black';

const liLast = document.querySelector('li:last-of-type');
liLast.textContent = liLast.textContent + ' (changed!)';

const listItemElements = document.querySelectorAll('li');

for (const listItem of listItemElements){
  console.dir(listItem);
}

const li0 = document.querySelector('li');
const ul = li0.parentElement;
const li1 = ul.children[1];
const li2 = ul.lastElementChild;

const body = li0.closest('body');

const section = document.querySelector('section');

// section.innerHTML = '<h2>A new title!</h2>';
// section.insertAdjacentHTML('afterend', '<h3>A new title!</h3>');

const newLi = document.createElement('li');
newLi.textContent = 'Item 4';
ul.appendChild(newLi);
li0.prepend(newLi);
li0.append(newLi);


const button = document.querySelector('button');

button.addEventListener('click', () => {
  section.classList.toggle('visible');
  section.classList.toggle('invisible');
})