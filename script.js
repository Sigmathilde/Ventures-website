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

document.addEventListener("DOMContentLoaded", function () {
    const wishList = document.getElementById("wish-list");
    const addWishBtn = document.getElementById("add-wish-btn");
    const scrollToTopBtn = document.getElementById("scroll-to-top-btn");

    function toggleScrollToTopButton() {
        const wishItems = document.querySelectorAll(".wish-item");

        if (wishItems.length > 2) { // Kun vis hvis det finnes minst tre rektangler
            const secondItem = wishItems[1]; // Henter andre rektangel
            if (secondItem) {
                const rect = secondItem.getBoundingClientRect();
                
                // Hvis toppen av det andre rektangelet er over toppen av vinduet
                if (rect.top < 0) {
                    scrollToTopBtn.classList.add("show");
                } else {
                    scrollToTopBtn.classList.remove("show");
                }
            }
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    }

    // Vis/skjul knappen basert på scrolling
    window.addEventListener("scroll", toggleScrollToTopButton);

    scrollToTopBtn.addEventListener("click", function () {
        console.log("Klikket på scroll-knappen"); // Feilsøking
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Skjul knappen når vi er tilbake på toppen
    window.addEventListener("scroll", function () {
        if (window.scrollY === 0) {
            scrollToTopBtn.classList.remove("show");
        }
    });

    // Oppdater synlighet av knappen når et nytt ønske legges til
    addWishBtn.addEventListener("click", function () {
        setTimeout(toggleScrollToTopButton, 200);
    });

    // Funksjon for jevn scrolling til toppen
    function scrollSmoothToTop() {
        const scrollDuration = 600; // Antall millisekunder
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        const scrollInterval = setInterval(function () {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }

    // Initial sjekk ved lasting
    toggleScrollToTopButton();
});

function toggleScrollToTopButton() {
    const wishItems = document.querySelectorAll(".wish-item");
    console.log("Antall wish-items:", wishItems.length); // Feilsøking

    if (wishItems.length > 2) { // Kun vis hvis det finnes minst tre rektangler
        const secondItem = wishItems[1]; // Henter andre rektangel
        if (secondItem) {
            const rect = secondItem.getBoundingClientRect();
            console.log("Toppen av andre rektangel:", rect.top); // Feilsøking
            
            // Hvis toppen av det andre rektangelet er over toppen av vinduet
            if (rect.top < 0) {
                console.log("Viser scroll-to-top-knappen"); // Feilsøking
                scrollToTopBtn.classList.add("show");
            } else {
                console.log("Skjuler scroll-to-top-knappen"); // Feilsøking
                scrollToTopBtn.classList.remove("show");
            }
        }
    } else {
        scrollToTopBtn.classList.remove("show");
    }
}
