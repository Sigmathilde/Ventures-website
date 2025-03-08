document.addEventListener("DOMContentLoaded", function () {
    const wishList = document.getElementById("wish-list");
    const addWishBtn = document.getElementById("add-wish-btn");
    const modal = document.getElementById("edit-modal");
    const closeModal = document.querySelector(".close-btn");
    const saveBtn = document.getElementById("save-btn");
    
    const imageUrlInput = document.getElementById("image-url");
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

    function openModal(wishElement) {
        selectedWish = wishElement;
        const image = selectedWish.querySelector(".wish-image");
        const previewImage = document.getElementById("image-preview");
    
        // Sett forhåndsvisningen til det eksisterende bildet i ønskelisten (hvis det finnes)
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
document.getElementById("save-btn").addEventListener("click", function () {
    if (!selectedWish) return;

    const previewImage = document.getElementById("image-preview");
    const wishImage = selectedWish.querySelector(".wish-image");

    if (previewImage.src && previewImage.style.display !== "none") {
        wishImage.src = previewImage.src; // Kopier bildet til ønskelisten
        wishImage.style.display = "block"; // Sørg for at det vises
    }

    modal.style.display = "none"; // Lukk modalen
});


document.getElementById("image-upload").addEventListener("change", function (event) {
    const file = event.target.files[0]; // Hent valgt fil
    if (file) {
        const reader = new FileReader(); // Opprett fil-leser
        reader.onload = function (e) {
            const previewImage = document.getElementById("image-preview");
            previewImage.src = e.target.result; // Sett bildet i forhåndsvisningen
            previewImage.style.display = "block"; // Sørg for at det vises

            // Hvis Cropper allerede er aktivert, fjern den
            if (cropper) {
                cropper.destroy();
            }

            // Start Cropper.js på bildet
            cropper = new Cropper(previewImage, {
                aspectRatio: 16 / 9,
                viewMode: 1,
                movable: true,
                zoomable: true,
                scalable: true,
                rotatable: false,
                cropBoxMovable: true,
                cropBoxResizable: true
            });
        };
        reader.readAsDataURL(file); // Les bildet som Data URL
    }

    console.log("Fil valgt:", event.target.files[0]); // Logger filen i konsollen

});

