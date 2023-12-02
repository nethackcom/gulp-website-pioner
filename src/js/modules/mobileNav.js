const mobileNav = () => {
    const hamburgerBtn = document.querySelector(".mobile-nav-btn");
    const hamburgerIcon = document.querySelector(".nav-icon");
    const nav = document.querySelector(".mobile_nav")

    hamburgerBtn.addEventListener("click", () => {
        hamburgerIcon.classList.toggle("nav-icon--active");
        nav.classList.toggle("open");
    });
}

export default mobileNav;