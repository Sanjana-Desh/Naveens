function showAlert(event) {
    event.preventDefault(); // Prevents page refresh
    alert("Thank you for your feedback!"); // Shows alert
    document.querySelector("form").reset(); // Clears the form after submission
}