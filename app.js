let container = document.querySelector(".container");
const form = document.querySelector("form");
let userInput = document.querySelector("#userInput");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (userInput.value === '') {
        alert("Please enter a valid username");
        return;
    }

    fetch(`https://api.github.com/users/${userInput.value}`)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            // Add the user card to the container
            container.innerHTML += `
            <div class="card">
                <img src="${res.avatar_url}" alt="Card Image" class="card-img">
                <div class="card-content">
                    <h1>${res.name}</h1>
                    <h3 class="card-title">Followers: ${res.followers}</h3>
                    <p>Profile Type: ${res.type}</p>
                    <button class="delete-btn">Delete</button> <!-- Corrected class here -->
                </div>
            </div>
            `;
            userInput.value = ""; // Clear input field
        })
        .catch((err) => {
            container.innerHTML = `User not found (404).`;
        });
});
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {

        const card = e.target.closest(".card");
        if (card) {
            card.remove();
        }
    }
});
















