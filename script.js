document.getElementById("contactForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const mobileInput = document.getElementById("mobile").value;
	let mobile = "";

	if (mobileInput.trim() !== "") {
    	mobile = "+" +
        document.getElementById("country-code").value +
        "-" + mobileInput;
}

    const message = document.getElementById("message").value;

    // Validation
    if (!name || !email || !message) {

        alert("⚠️ Please fill out the mandatory fields.");

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

            alert("✅ Message recieved successfully! I will contact you soon.");

            this.reset();

        } else {

            alert("❌ Failed to send message. Try again.");
        }

    } catch (error) {

        alert("❌ Error sending message.");
    }
});