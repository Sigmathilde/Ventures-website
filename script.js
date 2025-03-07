document.addEventListener("DOMContentLoaded", function () {
    const wishList = document.getElementById("wish-list");
    const addWishBtn = document.getElementById("add-wish-btn");

    // Function to edit a wish item
    window.editWish = function (element) {
        const wishText = prompt("Skriv inn ønsket ditt (eller lim inn en lenke):");
        if (wishText) {
            element.innerHTML = `<a href="${wishText}" target="_blank">${wishText}</a>`;
        }
    };

    // Function to add a new wish item
    addWishBtn.addEventListener("click", function () {
        const newWish = document.createElement("div");
        newWish.classList.add("wish-item");
        newWish.innerHTML = `
            <span class="delete-btn">×</span>
            <div class="wish-content" onclick="editWish(this)">Klikk på meg</div>
        `;

        // Delete functionality
        newWish.querySelector(".delete-btn").addEventListener("click", function (event) {
            event.stopPropagation();
            if (confirm("Er du sikker på at du vil slette dette ønsket?")) {
                newWish.remove();
            }
        });

        wishList.appendChild(newWish);
    });

    // Delete functionality for the default element
    document.querySelector(".delete-btn").addEventListener("click", function (event) {
        event.stopPropagation();
        if (confirm("Er du sikker på at du vil slette dette ønsket?")) {
            this.parentElement.remove();
        }
    });
});
