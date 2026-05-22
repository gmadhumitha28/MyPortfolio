document.getElementById("contactForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const formStatus = document.getElementById("status");

    formStatus.textContent = "⏳ Sending message...";
    formStatus.style.color = "#060d6d";

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

        formStatus.innerHTML =
            "<p style='color:red'>⚠️ Please fill out the mandatory fields.</p>";

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

            formStatus.style.color = "green";

            formStatus.textContent =
                "✅ Message recieved successfully! I will contact you soon.";

            this.reset();

        } else {

            formStatus.style.color = "red";

            formStatus.textContent =
                "❌ Failed to send message. Try again.";
        }

    } catch (error) {

        formStatus.style.color = "red";

        formStatus.textContent =
            "❌ Error sending message.";
    }
});