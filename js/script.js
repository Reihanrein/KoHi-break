// toggle menu aktivasi humberger menu
const Navbarnav = document.querySelector(".navbar-nav");

// ketika sidebar di klik
document.querySelector("#Sidebar").onclick = () => {
  Navbarnav.classList.toggle("active");
};

// toggle aktivasi untuk icon search
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
document.querySelector("#Search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// toggle aktivasi untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#Shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik layar untuk hilangkan sidebar

const sidebar = document.querySelector("#Sidebar");
const searchButton = document.querySelector("#Search-button");
const shopCart = document.querySelector("#Shopping-cart-button");

document.addEventListener("click", function (e) {
  {
    if (!sidebar.contains(e.target) && !Navbarnav.contains(e.target))
      Navbarnav.classList.remove("active");
  }

  if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!shopCart.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Klik icon mata untuk munnculkan modal box
const itemDetail = document.querySelector("#item-detail");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetail.style.display = "flex";
    e.preventDefault();
  };
});

// Klik tombol close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetail.style.display = "none";
  e.preventDefault();
};

// close modal diluar border
window.onclick = (e) => {
  if (e.target === itemDetail) {
    itemDetail.style.display = "none";
  }
};
