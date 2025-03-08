document.addEventListener("DOMContentLoaded", function () {
    const wishList = document.getElementById("wish-list");
    const addWishBtn = document.getElementById("add-wish-btn");
    const modal = document.getElementById("edit-modal");
    const closeModal = document.querySelector(".close-btn");
    const saveBtn = document.getElementById("save-btn");
    

    const imageUrlInput = document.getElementById("image-url");
    const imageUploadInput = document.getElementById("image-upload");

    let selectedWish = null;

    modal.style.display = "none";

    function openModal(wishElement) {
        selectedWish = wishElement;
        const image = selectedWish.querySelector(".wish-image");

        imageUrlInput.value = image.src || "";
        modal.style.display = "flex";
    }

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    saveBtn.addEventListener("click", function () {
        if (!selectedWish) return;

        const imageUrl = imageUrlInput.value;
        const uploadedImage = imageUploadInput.files[0];

        const imageElement = selectedWish.querySelector(".wish-image");

        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageElement.src = e.target.result;
                imageElement.style.display = "block";
            };
            reader.readAsDataURL(uploadedImage);
        } else if (imageUrl) {
            imageElement.src = imageUrl;
            imageElement.style.display = "block";
        }

        modal.style.display = "none";
    });

    function toggleFlip(event) {
        if (event.target.classList.contains("delete-btn") || event.target.classList.contains("edit-btn")) {
            return; 
        }
        event.currentTarget.querySelector(".wish-card").classList.toggle("flipped");
    }

    function addEventListenersToWishItem(wishItem) {
        const deleteBtn = wishItem.querySelector(".delete-btn");
        const editBtn = wishItem.querySelector(".edit-btn");

        wishItem.addEventListener("click", toggleFlip);

        editBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            openModal(wishItem);
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
    });
});

let cropper; // Variabel for å lagre Cropper-instansen

// Når brukeren laster opp et bilde
imageUploadInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageElement = document.getElementById("image-preview");
            imageElement.src = e.target.result;
            imageElement.style.display = "block";

            // Hvis Cropper allerede er aktivert, fjern den
            if (cropper) {
                cropper.destroy();
            }

            // Start Cropper.js på bildet
            cropper = new Cropper(imageElement, {
                aspectRatio: 16 / 9, // Forholdet mellom bredde og høyde
                viewMode: 1,
                movable: true,
                zoomable: true,
                scalable: true,
                rotatable: false,
                cropBoxMovable: true,
                cropBoxResizable: true
            });
        };
        reader.readAsDataURL(file);
    }
});

// Når brukeren klikker "Lagre"
saveBtn.addEventListener("click", function () {
    if (!selectedWish) return;

    const croppedCanvas = cropper.getCroppedCanvas();
    if (croppedCanvas) {
        const croppedImageUrl = croppedCanvas.toDataURL("image/png"); // Henter beskjært bilde
        const imageElement = selectedWish.querySelector(".wish-image");
        imageElement.src = croppedImageUrl;
        imageElement.style.display = "block";
    }

    modal.style.display = "none";
});
