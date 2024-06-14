// toggle menu aktivasi humberger menu
const Navbarnav = document.querySelector(".navbar-nav");

// ketika sidebar di klik
document.querySelector("#Sidebar").onclick = (e) => {
  Navbarnav.classList.toggle("active");
  e.preventDefault();
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

// Klik icon mata untuk munculkan modal box
const itemDetail = document.querySelector(".modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");
itemDetail.style.display = "none";
console.log(itemDetailButtons);

function mata() {
  itemDetail.style.display = "flex";
}

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

function SendMail() {
  var params = {
    from_name: document.getElementById("fullName").value,
    email_id: document.getElementById("email_id").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_8jfzpej", "template_ihzl9h6", params)
    .then(function (res) {
      alert("Success" + res.status);
    });
}

// const searchBar = document.querySelector("#search-box");

// const produk = document.querySelector("#products .row template");
// const produkCard = produk.querySelectorAll(".product-card");

// console.log(produkCard);

// searchBar.addEventListener("keyup", () => {
//   console.log(searchBar.value);
// });

// toggle fungsional search form (ctrl+f)

// document.getElementById("search-box").addEventListener("input", function () {
//   let searchValue = this.value.trim().toLowerCase();
//   let heroSection = document.querySelector(".hero .content h3");
//   let heroContent = heroSection.innerText.toLowerCase();
//   const elementHighlight = document.querySelectorAll(".highlight");

//   if (heroContent.includes(searchValue)) {
//     heroSection.classList.add("highlight"); // Menampilkan elemen jika teks pencarian ditemukan di dalamnya
//   } else {
//     heroSection.classList.remove("highlight"); // Menyembunyikan elemen jika teks pencarian tidak ditemukan di dalamnya
//   }
//   if (searchValue === "") {
//     elementHighlight.forEach((heroSection) => {
//       heroSection.classList.remove("highlight");
//     });
//   }
// });
