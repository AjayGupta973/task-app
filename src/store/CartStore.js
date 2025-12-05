// src/store/CartStore.js
import { makeAutoObservable } from "mobx";

function createCartStore() {
    return makeAutoObservable({
        items: [], // { id, title, price, image, quantity }

        hydrateFromSession() {
            try {
                const saved = sessionStorage.getItem("cart");
                if (saved) {
                    this.items = JSON.parse(saved);
                }
            } catch (e) {
                console.warn("Failed to restore cart from sessionStorage", e);
            }
        },

        persist() {
            try {
                sessionStorage.setItem("cart", JSON.stringify(this.items));
            } catch (e) {
                console.warn("Failed to save cart to sessionStorage", e);
            }
        },

        addItem(product) {
            const existing = this.items.find((i) => i.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                this.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image || "",
                    quantity: 1,
                });
            }
            this.persist();
        },

        removeItem(productId, quantityToRemove = 1) {
            const index = this.items.findIndex((item) => item.id === productId);
            if (index === -1) return;

            const item = this.items[index];

            if (item.quantity > quantityToRemove) {
                item.quantity -= quantityToRemove;
            } else {
                this.items.splice(index, 1);
            }

            this.persist();
        },

        updateQuantity(productId, newQuantity) {
            if (newQuantity < 1) {
                this.removeItem(productId);
                return;
            }

            const item = this.items.find((i) => i.id === productId);
            if (item) {
                item.quantity = newQuantity;
                this.persist();
            }
        },

        clearCart() {
            this.items = [];
            this.persist();
        },

        // ─── Computed Values ─────────────────────────────────────────────

        get totalItems() {
            return this.items.reduce((sum, item) => sum + item.quantity, 0);
        },

        get totalPrice() {
            return parseFloat(
                this.items
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)
            );
        },

        get isEmpty() {
            return this.items.length === 0;
        },

        get uniqueItemsCount() {
            return this.items.length;
        },

        hasItem(productId) {
            return this.items.some((item) => item.id === productId);
        },
    });
}

// instantiate the store once
const cartStore = createCartStore();
cartStore.hydrateFromSession();

export default cartStore;
export { createCartStore };
