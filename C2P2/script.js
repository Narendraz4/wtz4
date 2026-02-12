// Array to hold cart items
let cart = [];

// Add item to cart
function addToCart(name, price) {
    let item = cart.find(item => item.name === name);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

// Update quantity
function updateQuantity(name, quantity) {
    let item = cart.find(item => item.name === name);

    if (item) {
        item.quantity = parseInt(quantity, 10) || 0;

        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCart();
        }
    }
}

// Update cart display
function updateCart() {
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");

        let text = document.createTextNode(`${item.name} - Rs.${item.price} x ${item.quantity} `);
        li.appendChild(text);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function () { removeFromCart(item.name); });
        li.appendChild(removeBtn);

        let qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.value = item.quantity;
        qtyInput.min = 0;
        qtyInput.addEventListener("change", function () { updateQuantity(item.name, this.value); });
        li.appendChild(qtyInput);

        cartItems.appendChild(li);
    });

    let totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    document.getElementById("totalPrice").innerHTML =
        `Total Price: Rs.${totalPrice}`;
}
