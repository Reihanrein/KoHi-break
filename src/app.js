document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Less sugar latte", img: "1.jpg", price: 25000 },
      { id: 2, name: "Hot Espresso", img: "2.jpg", price: 28000 },
      { id: 3, name: "Hot Arabika", img: "3.jpg", price: 32000 },
      { id: 4, name: "Ice Arabika", img: "4.jpg", price: 32000 },
      { id: 5, name: "Ice Espresso", img: "5.jpg", price: 28000 },
    ],
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

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
