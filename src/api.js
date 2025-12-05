const BASE_URL = "https://fakestoreapi.com";

export async function fetchAllProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}
