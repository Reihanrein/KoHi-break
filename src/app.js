document.addEventListener("alpine:init", () => {
  const dataProduk = [
    { id: 1, name: "Less sugar latte", img: "1.jpg", price: 25000 },
    { id: 2, name: "Hot Espresso", img: "2.jpg", price: 28000 },
    { id: 3, name: "Hot Arabika", img: "3.jpg", price: 32000 },
    { id: 4, name: "Ice Arabika", img: "4.jpg", price: 32000 },
    { id: 5, name: "Ice Espresso", img: "5.jpg", price: 28000 },
  ];
  Alpine.data("products", () => ({
    search: "",
    items: dataProduk,
    currentProduct: null,
    get filteredItems() {
      if (this.search.trim() === "") {
        return this.items;
      }
      return this.items.filter((item) => {
        return item.name
          .replace(/ /g, "")
          .toLowerCase()
          .includes(this.search.replace(/ /g, "").toLowerCase());
      });
    },
    setCurrentProduct(idProduct) {
      this.currentProduct = this.items.find((item) => item.id === idProduct);
      this.isShow = true;
    },
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    // cek apakah ada barang yg sama di cart
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika masih cart kosong

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      }
      // Jika cart berisi cek apakah jenis barangnya sama
      else {
        this.items = this.items.map((item) => {
          // jika barang yg berbeda
          if (item.id !== newItem.id) {
            return item;
          }
          // Jika barang yang sama sudah ada, tambah ke kuantitas
          else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += newItem.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item untuk di remove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika kuantitas barang tsb lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yg di add
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      }
      // jika barang yg dipilih sisa 1
      else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
    clearCart(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            this.items = [];
            this.quantity = 0;
            this.total = 0;
          }
        });
      }
    },
  });
});

function SendMail2() {
  var params = {
    from_name: document.getElementById("fullName2").value,
    email_id: document.getElementById("email_id2").value,
    message: document.getElementById("message2").value,
  };
  emailjs
    .send("service_8jfzpej", "template_ihzl9h6", params)
    .then(function (res) {
      alert("Success" + res.status);
    });
}

// Validasi Form
const validator = document.querySelector(".checkout-button");
validator.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      validator.classList.remove("disabled");
      validator.classList.add("disabled");
    } else {
      return false;
    }
  }
  validator.disabled = false;
  validator.classList.remove("disabled");
});

// kirim data ketika klik checkout
validator.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  console.log(objData);
  const message = formatMessage(objData);
  window.open("http://wa.me/6288293487354?text=" + encodeURIComponent(message));
});

// Format data ke whatsapp
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
    Jenis Order: ${obj.order}

Data Pesanan
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
  )}
Total: ${rupiah(obj.total)}
Terima Kasih.`;
};

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
