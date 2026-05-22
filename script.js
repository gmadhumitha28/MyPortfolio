const popupModal = document.getElementById("popupModal");
const popupMessage = document.getElementById("popupMessage");
const popupBtn = document.getElementById("popupBtn");

document.getElementById("contactForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    popupMessage.textContent = "⏳ Sending message...";
    popupModal.style.display = "flex";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const mobile =
        "+" +
        document.getElementById("country-code").value +
        "-" +
        document.getElementById("mobile").value;

    const message = document.getElementById("message").value;

    // Validation
    if (!name || !email || !message) {

        popupMessage.textContent =
            "⚠️ Please fill out the mandatory fields.";

        return;
    }

    const formData = {
        name,
        email,
        mobile,
        message
    };

    try {

        const res = await fetch("/.netlify/functions/sendMail", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {

            popupMessage.textContent =
                "✅ Message recieved successfully! I will contact you soon.";

            this.reset();

        } else {

            popupMessage.textContent =
                "❌ Failed to send message. Try again.";
        }

    } catch (error) {

        popupMessage.textContent =
            "❌ Error sending message.";
    }
});

/* CLOSE POPUP */
popupBtn.addEventListener("click", function() {

    popupModal.style.display = "none";

});