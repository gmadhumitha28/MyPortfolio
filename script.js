document.getElementById("contactForm").addEventListener("submit", async function (e) {

    const formStatus = document.getElementById("formStatus");
    formStatus.textContent = "⏳ Sending message...";
    formStatus.style.color = "#060d6d";

    const formData = {
        name: this.name.value,
        email: this.email.value,
        mobile: this.mobile.value,
        message: this.message.value
    };

    if (!name || !email || !message) {
      formMessage.innerHTML = "<p style='color:red'>❌ Please fill out the mandatory fields.</p>";
      return;
    }

    const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {
        formStatus.style.color = "green";
        formStatus.textContent = "✅ Message sent successfully! I will contact you soon.";
        this.reset();
    } else {
        formStatus.style.color = "red";
        formStatus.textContent = "❌ Failed to send message. Try again.";
    }
});

