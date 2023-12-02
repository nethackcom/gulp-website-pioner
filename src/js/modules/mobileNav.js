const mobileNav = () => {
    const hamburgerBtn = document.querySelector(".mobile-nav-btn");
    const hamburgerIcon = document.querySelector(".nav-icon");

    hamburgerBtn.addEventListener("click", () => {
        hamburgerIcon.classList.toggle("nav-icon--active");
    });
}

export default mobileNav;