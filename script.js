document.addEventListener("DOMContentLoaded", function () {
    const wishList = document.getElementById("wish-list");
    const addWishBtn = document.getElementById("add-wish-btn");
    const modal = document.getElementById("edit-modal");
    const closeModal = document.querySelector(".close-btn");
    const saveBtn = document.getElementById("save-btn");
    const imageUploadInput = document.getElementById("image-upload"); // Hent riktig id
    const previewImage = document.getElementById("image-preview");

    if (!imageUploadInput) {
        console.error("❌ FEIL: Fant ikke #image-upload i DOM!");
        return;
    }

    imageUploadInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block"; // Vis bildet umiddelbart
                console.log("✅ Forhåndsvisning oppdatert!");
            };
            reader.readAsDataURL(file);
        }
    });

    let selectedWish = null;
    modal.style.display = "none";

    function openModal(wishElement, isNew = false) {
        selectedWish = wishElement;
        const modalTitle = document.querySelector("#edit-modal h2");
    
        if (isNew) {
            modalTitle.textContent = "Lag et ønske";
        } else {
            modalTitle.textContent = "Endre ønske";
        }
    
        const image = selectedWish.querySelector(".wish-image");
    
        if (image.src && image.style.display !== "none") {
            previewImage.src = image.src;
            previewImage.style.display = "block";
        } else {
            previewImage.src = "";
            previewImage.style.display = "none";
        }
    
        modal.style.display = "flex";
    }
    
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    saveBtn.addEventListener("click", function () {
        if (!selectedWish) return;

        const uploadedImage = imageUploadInput.files[0];
        const imageElement = selectedWish.querySelector(".wish-image");

        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageElement.src = e.target.result;
                imageElement.style.display = "block";
            };
            reader.readAsDataURL(uploadedImage);
        } else if (previewImage.src) {
            imageElement.src = previewImage.src;
            imageElement.style.display = "block";
        }

        modal.style.display = "none";
    });

    function addEventListenersToWishItem(wishItem) {
        const deleteBtn = wishItem.querySelector(".delete-btn");
        const editBtn = wishItem.querySelector(".edit-btn");

        editBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            openModal(wishItem, false);
        });
        

        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            if (confirm("Er du sikker på at du vil slette dette ønsket?")) {
                wishItem.remove();
            }
        });
    }

    document.querySelectorAll(".wish-item").forEach(addEventListenersToWishItem);

    addWishBtn.addEventListener("click", function () {
        const newWish = document.createElement("div");
        newWish.classList.add("wish-item");
        newWish.innerHTML = `
            <span class="delete-btn">×</span>
            <span class="edit-btn">✏️</span>
            <div class="wish-card">
                <div class="wish-front">
                    <img class="wish-image" style="display: none;" />
                </div>
                <div class="wish-back"></div>
            </div>
        `;
    
        addEventListenersToWishItem(newWish);
        wishList.appendChild(newWish);
        
        // Åpner edit-modalen automatisk med "Lag et ønske"
        openModal(newWish, true);
    });
    
});