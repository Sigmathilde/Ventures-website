document.addEventListener("DOMContentLoaded", function () {
    const wishList = document.getElementById("wish-list");
    const addWishBtn = document.getElementById("add-wish-btn");
    const modal = document.getElementById("edit-modal");
    const closeModal = document.querySelector(".close-btn");
    const saveBtn = document.getElementById("save-btn");

    let selectedWish = null;

    modal.style.display = "none";

    // Åpne modalen kun når man trykker på blyantikonet
    function openModal(wishElement) {
        selectedWish = wishElement;
        const content = selectedWish.querySelector(".wish-content");

        document.getElementById("description").value = content.innerText;
        modal.style.display = "flex";
    }

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    saveBtn.addEventListener("click", function () {
        if (!selectedWish) return;

        const description = document.getElementById("description").value || "Ønske uten beskrivelse";
        selectedWish.querySelector(".wish-content").innerText = description;

        modal.style.display = "none";
    });

    addWishBtn.addEventListener("click", function () {
        const newWish = document.createElement("div");
        newWish.classList.add("wish-item");
        newWish.innerHTML = `
            <span class="delete-btn">×</span>
            <span class="edit-btn">✏️</span>
            <div class="wish-content">Ønske uten beskrivelse</div> 
        `;

        // Rediger-knapp åpner modalen
        newWish.querySelector(".edit-btn").addEventListener("click", function (event) {
            event.stopPropagation();
            openModal(newWish);
        });

        // Slette-funksjonalitet
        newWish.querySelector(".delete-btn").addEventListener("click", function (event) {
            event.stopPropagation();
            if (confirm("Er du sikker på at du vil slette dette ønsket?")) {
                newWish.remove();
            }
        });

        wishList.appendChild(newWish);
    });

    // Legg til eventlistener for eksisterende ønsker
    document.querySelectorAll(".wish-item").forEach(function (item) {
        item.querySelector(".edit-btn").addEventListener("click", function (event) {
            event.stopPropagation();
            openModal(item);
        });
    });
});
