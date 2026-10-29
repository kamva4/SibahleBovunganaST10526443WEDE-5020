// JavaScript for the Coffee&Beans website
// Save this file as: js/script.js
// Link it to each HTML page just before the closing </body> tag:
// <script src="js/script.js"></script>

// 1. Update the footer year automatically (if a page has an element with id="year").
const yearSpan = document.getElementById("year");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 2. Live search on the Menu page.
// It searches the text in each product card while the visitor types.
const searchInput = document.getElementById("product-search");
const productCards = document.querySelectorAll(".product-card");

let noResults = document.getElementById("no-results");

if (searchInput) {
    // Create the no-results message if it is not already in the HTML.
    if (!noResults) {
        noResults = document.createElement("p");
        noResults.id = "no-results";
        noResults.textContent = "Sorry, no menu items match your search.";
        noResults.hidden = true;
        searchInput.closest(".search-pill")?.insertAdjacentElement("afterend", noResults);
    }

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        productCards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchText)) {
                card.hidden = false;
                visibleCount++;
            } else {
                card.hidden = true;
            }
        });

        noResults.hidden = visibleCount > 0;
    });
}

// 3. Enquiry form: check required fields and show a simple confirmation.
// This is only a front-end demonstration. It does not send information to a server.
const enquiryForm = document.querySelector(".enquiry-form form");

if (enquiryForm) {
    let formMessage = enquiryForm.querySelector("#form-message");

    if (!formMessage) {
        formMessage = document.createElement("p");
        formMessage.id = "form-message";
        formMessage.setAttribute("role", "status");
        enquiryForm.appendChild(formMessage);
    }

    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            formMessage.textContent = "";
            return;
        }

        formMessage.textContent =
            "Thank you! Your enquiry looks good. This demo form does not send your message yet.";
        enquiryForm.reset();
    });
}