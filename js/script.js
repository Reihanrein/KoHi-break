// toggle menu
const Navbarnav = document.querySelector(".navbar-nav");

// ketika sidebar di klik
document.querySelector("#Sidebar").onclick = () => {
  Navbarnav.classList.toggle("active");
};

// Klik layar untuk hilangkan sidebar

const sidebar = document.querySelector("#Sidebar");

document.addEventListener("click", function (e) {
  {
    if (!sidebar.contains(e.target) && !Navbarnav.contains(e.target))
      Navbarnav.classList.remove("active");
  }
});
