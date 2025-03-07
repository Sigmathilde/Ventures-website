document.addEventListener("DOMContentLoaded", function () {
    const wishList = document.getElementById("wish-list");
    const addWishBtn = document.getElementById("add-wish-btn");
    const modal = document.getElementById("edit-modal");
    const closeModal = document.querySelector(".close-btn");
    const saveBtn = document.getElementById("save-btn");

    let selectedWish = null;

    // Ensure modal is hidden on page load
    modal.style.display = "none";

    // Function to open modal only when clicking a wish item
    window.openModal = function (wishElement) {
        selectedWish = wishElement;
        const image = selectedWish.querySelector(".wish-image");
        const content = selectedWish.querySelector(".wish-content");

        // Prefill modal fields if they exist
        document.getElementById("image-url").value = image?.src || "";
        document.getElementById("description").value = content?.innerText !== "Klikk på meg" ? content.innerText : "";
        document.getElementById("price").value = content?.dataset.price || "";
        document.getElementById("accountability-partner").value = content?.dataset.partner || "";

        modal.style.display = "flex";
    };

    // Close modal when clicking close button
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Save changes from modal
    saveBtn.addEventListener("click", function () {
        if (!selectedWish) return;

        const imageUrl = document.getElementById("image-url").value;
        const uploadedImage = document.getElementById("image-upload").files[0];
        const description = document.getElementById("description").value || "Ønske uten beskrivelse";
        const price = document.getElementById("price").value;
        const partner = document.getElementById("accountability-partner").value;

        const image = selectedWish.querySelector(".wish-image");
        const content = selectedWish.querySelector(".wish-content");

        // Update image
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                image.src = e.target.result;
                image.style.display = "block";
            };
            reader.readAsDataURL(uploadedImage);
        } else if (imageUrl) {
            image.src = imageUrl;
            image.style.display = "block";
        }

        // Update text fields
        content.innerText = description;
        content.dataset.price = price;
        content.dataset.partner = partner;

        modal.style.display = "none";
    });

    // Function to add a new wish item
    addWishBtn.addEventListener("click", function () {
        const newWish = document.createElement("div");
        newWish.classList.add("wish-item");
        newWish.innerHTML = `
            <span class="delete-btn">×</span>
            <img src="" class="wish-image" style="display: none;">
            <div class="wish-content">Klikk på meg</div> 
        `;

        // Attach click event to open modal when clicking on wish item
        newWish.querySelector(".wish-content").addEventListener("click", function () {
            openModal(newWish);
        });

        // Delete functionality
        newWish.querySelector(".delete-btn").addEventListener("click", function (event) {
            event.stopPropagation();
            if (confirm("Er du sikker på at du vil slette dette ønsket?")) {
                newWish.remove();
            }
        });

        wishList.appendChild(newWish);
    });

    // Ensure delete functionality works for dynamically added elements
    wishList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            event.stopPropagation();
            if (confirm("Er du sikker på at du vil slette dette ønsket?")) {
                event.target.parentElement.remove();
            }
        }
    });

    // Attach event listener to existing wish items
    document.querySelectorAll(".wish-content").forEach(function (item) {
        item.addEventListener("click", function () {
            openModal(item.parentElement);
        });
    });
});

