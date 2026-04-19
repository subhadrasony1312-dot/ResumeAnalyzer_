// Simple page loading animation
window.addEventListener("load", function () {
    document.body.style.opacity = "1";
});

// Button click animation
const launchBtn = document.querySelector(".btn");

if (launchBtn) {
    launchBtn.addEventListener("click", function () {

        launchBtn.innerHTML = "Opening Application...";


        setTimeout(function () {
            launchBtn.innerHTML = "🚀 Launch Application";
        }, 3000);
    });
}

// Smooth scroll for footer links
const links = document.querySelectorAll("a");

links.forEach(link => {
    link.addEventListener("mouseover", function () {
        link.style.transform = "scale(1.1)";
    });

    link.addEventListener("mouseout", function () {
        link.style.transform = "scale(1)";
    });
});