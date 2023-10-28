document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    const topicContents = document.querySelectorAll(".topic-content");

    // Initially hide all topic contents and set button text to "Show Content"
    topicContents.forEach(content => {
        content.style.display = "none";
    });

    toggleButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (topicContents[index].style.display === "none") {
                topicContents[index].style.display = "block";
                button.textContent = "Hide Content";
            } else {
                topicContents[index].style.display = "none";
                button.textContent = "Show Content";
            }
        });
    });
});
