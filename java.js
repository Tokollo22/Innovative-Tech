document.addEventListener("DOMContentLoaded", () => {
    const shopNow = document.getElementById("shopnowBtn");

    if (shopNow) {
        shopNow.addEventListener("click", () => {
            window.location.href = "#middle-thing";
        });
    }

    const laptops = document.querySelector(".category1");
    const laptops_Deals=document.querySelector(".left-image");

    if (laptops) {
        laptops.addEventListener("click", () => {
            window.location.href = "shop.html";
        });
    }
    if (laptops_Deals) {
        laptops_Deals.addEventListener("click", () => {
            window.location.href = "shop.html";
        });
    }

    const smartphones = document.querySelector(".category3");
    const smartphones_DEALS=document.querySelector(".right-top");

    if (smartphones) {
        smartphones.addEventListener("click", () => {
            window.location.href = "phone_shop.html";
        });
    }
    if (smartphones_DEALS) {
        smartphones_DEALS.addEventListener("click", () => {
            window.location.href = "phone_shop.html";
        });
    }

    const watches = document.querySelector(".category2");
    const watch=document.querySelector(".watch");

    if (watches) {
        watches.addEventListener("click", () => {
            window.location.href = "watches.html";
        });
    }
    if (watch) {
        watch.addEventListener("click", () => {
            window.location.href = "watches.html";
        });
    }

    const AppleLaptop = document.querySelector(".Mac_laptop");

    if (AppleLaptop) {
        AppleLaptop.addEventListener("click", () => {
            window.location.href = "AppleMacbook.html";
        });
    }
   
});


document.addEventListener("DOMContentLoaded", () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const wishlistToggle = document.getElementById("wishlistToggle");
    const wishlistDropdown = document.getElementById("wishlistDropdown");
    const wishlistList = document.getElementById("wishlistList");
    const quantityInput = document.getElementById("num");
    const addToCartButton = document.querySelector(".basket");
    const buyNowButton = document.querySelector(".buy-basket");
    const cartMessage = document.getElementById("cartMessage");

    const updateWishlistCount = () => {
        const countElements = document.querySelectorAll("#wishlistCount, #wishlistcount");
        const count = wishlist.length;

        countElements.forEach((element) => {
            element.textContent = count;
        });
    };

    const renderWishlist = () => {
        if (!wishlistList) return;

        wishlistList.innerHTML = "";

        if (!wishlist.length) {
            wishlistList.innerHTML = '<li class="wishlist-empty">No products saved yet.</li>';
            return;
        }

        wishlist.forEach((item) => {
            const li = document.createElement("li");
            li.className = "wishlist-item";
            li.innerHTML = `
                <div>
                    <strong>${item.name || "Product"}</strong>
                    <span>${item.price || "Price unavailable"}</span>
                </div>
                <button class="remove-wishlist" data-id="${item.id}">Remove</button>
            `;
            wishlistList.appendChild(li);
        });
    };

    const setHeartState = (button, isActive) => {
        const icon = button.querySelector("i");

        if (icon) {
            icon.className = isActive ? "fa-solid fa-heart" : "fa-regular fa-heart";
            icon.style.color = isActive ? "#dc2626" : "";
        }
    };

    const hearts = document.querySelectorAll(".wishlist");

    hearts.forEach((button, index) => {
        const card = button.closest(".card-imag") || button.closest(".product-card");
        const id = card?.dataset?.id || `${location.pathname}-${index}`;
        const name = card?.dataset?.name || `Product ${id}`;
        const price = card?.dataset?.price || "Price unavailable";
        const isActive = wishlist.some((item) => item.id === id);

        setHeartState(button, isActive);

        button.addEventListener("click", (event) => {
            event.preventDefault();

            const exists = wishlist.find((item) => item.id === id);

            if (exists) {
                wishlist = wishlist.filter((item) => item.id !== id);
                setHeartState(button, false);
            } else {
                wishlist.push({ id, name, price });
                setHeartState(button, true);
            }

            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistCount();
            renderWishlist();
        });
    });

    if (wishlistToggle && wishlistDropdown) {
        wishlistToggle.addEventListener("click", (event) => {
            event.preventDefault();
            wishlistDropdown.classList.toggle("open");
        });

        document.addEventListener("click", (event) => {
            if (!wishlistDropdown.contains(event.target) && !wishlistToggle.contains(event.target)) {
                wishlistDropdown.classList.remove("open");
            }
        });
    }

    wishlistList?.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-wishlist")) {
            const id = event.target.dataset.id;
            wishlist = wishlist.filter((item) => item.id !== id);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistCount();
            renderWishlist();

            const matchingHeart = document.querySelector(`.wishlist[data-id="${id}"]`);
            if (matchingHeart) {
                setHeartState(matchingHeart, false);
            }
        }
    });

    const cartToggle = document.getElementById("cartToggle");
    const cartDropdown = document.getElementById("cartDropdown");
    const cartList = document.getElementById("cartList");

    const updateCartCount = () => {
        const cartCountElements = document.querySelectorAll("#cartCount, #cartcount");
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cartItems.reduce((total, item) => total + (parseInt(item.quantity, 10) || 1), 0);

        cartCountElements.forEach((element) => {
            element.textContent = count;
        });
    };

    const renderCart = () => {
        if (!cartList) return;

        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartList.innerHTML = "";

        if (!cartItems.length) {
            cartList.innerHTML = '<li class="wishlist-empty">Your cart is empty.</li>';
            return;
        }

        cartItems.forEach((item) => {
            const li = document.createElement("li");
            li.className = "cart-item";
            li.innerHTML = `
                <div>
                    <strong>${item.name || "Product"}</strong>
                    <span>${item.price || "Price unavailable"}</span>
                    <span>Qty: ${item.quantity || 1}</span>
                </div>
                <button class="remove-cart" data-id="${item.id}">Remove</button>
            `;
            cartList.appendChild(li);
        });
    };

    if (cartToggle && cartDropdown) {
        cartToggle.addEventListener("click", (event) => {
            event.preventDefault();
            cartDropdown.classList.toggle("open");
        });

        document.addEventListener("click", (event) => {
            if (!cartDropdown.contains(event.target) && !cartToggle.contains(event.target)) {
                cartDropdown.classList.remove("open");
            }
        });
    }

    cartList?.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-cart")) {
            const id = event.target.dataset.id;
            const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
            const updatedItems = cartItems.filter((item) => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(updatedItems));
            updateCartCount();
            renderCart();
        }
    });

    const handleCartAction = (mode) => {
        const quantity = Math.max(1, parseInt(quantityInput?.value || "1", 10) || 1);
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const item = {
            id: "apple-macbook",
            name: "2024 Apple Macbook",
            price: "R7 985",
            quantity
        };

        const existingItem = cartItems.find((entry) => entry.id === item.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push(item);
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartCount();
        renderCart();

        if (cartMessage) {
            cartMessage.textContent = mode === "buy"
                ? `Buy now placed for ${quantity} item(s).`
                : `${quantity} item(s) added to cart.`;
        }
    };

    if (addToCartButton) {
        addToCartButton.addEventListener("click", (event) => {
            event.preventDefault();
            handleCartAction("cart");
        });
    }

    if (buyNowButton) {
        buyNowButton.addEventListener("click", (event) => {
            event.preventDefault();
            handleCartAction("buy");
        });
    }

    updateWishlistCount();
    renderWishlist();
    updateCartCount();
    renderCart();
});