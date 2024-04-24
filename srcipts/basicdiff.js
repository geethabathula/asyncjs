//Synchronous code
const h1 = document.getElementsByTagName('h1')[0];
const p = document.createElement('p');
p.textContent = `Hi this is paragraph Element`;
h1.insertAdjacentElement('afterend', p);

//Asynchronous code 
const p2 = document.createElement('p');
p2.textContent = `Hi this is paragraph Element2`;
h1.appendChild(p2);

setTimeout(() => p2.style.color = "red", 3000); //color red is applied after 3secs

const p3 = document.createElement('h2');
p3.textContent = `Hi this is paragraph Element3`;
h1.appendChild(p3);