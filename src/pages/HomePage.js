import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const BASE_URL = "https://fakestoreapi.com";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sort, setSort] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load categories on mount
    useEffect(() => {
        fetch(`${BASE_URL}/products/categories`)
            .then(res => res.json())
            .then(setCategories)
            .catch(() => { });
    }, []);

    // Sync filters from URL and fetch products
    useEffect(() => {
        const categoriesParam = searchParams.get("categories") || "";
        const currentSort = searchParams.get("sort") || "";

        const categoriesFromUrl = categoriesParam
            ? categoriesParam.split(",").filter(Boolean)
            : [];

        setSelectedCategories(categoriesFromUrl);
        setSort(currentSort);
        setLoading(true);
        setError(null);

        fetchProducts(categoriesFromUrl, currentSort);
    }, [searchParams]);

    const fetchProducts = async (categoriesList, sortOrder) => {
        try {
            let fetchPromise;

            if (categoriesList.length === 0) {
                fetchPromise = fetch(`${BASE_URL}/products`).then(r => r.json());
            } else {
                fetchPromise = Promise.all(
                    categoriesList.map(cat =>
                        fetch(`${BASE_URL}/products/category/${encodeURIComponent(cat)}`)
                            .then(r => r.json())
                    )
                ).then(results => results.flat());
            }

            const products = await fetchPromise;

            // Local sorting
            if (sortOrder === "price_asc") {
                products.sort((a, b) => a.price - b.price);
            } else if (sortOrder === "price_desc") {
                products.sort((a, b) => b.price - a.price);
            }

            setProducts(products);
            setLoading(false);
        } catch (err) {
            setError(err.message || "Failed to load products");
            setLoading(false);
        }
    };

    const updateUrl = (cats, sortValue) => {
        const params = new URLSearchParams();

        if (cats.length > 0) {
            params.set("categories", cats.join(","));
        }
        if (sortValue) {
            params.set("sort", sortValue);
        }

        const search = params.toString();
        setSearchParams(search ? `?${search}` : "", { replace: true });
    };

    const handleCategoryToggle = (category) => {
        const exists = selectedCategories.includes(category);
        const newCategories = exists
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(newCategories);
        updateUrl(newCategories, sort);
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSort(newSort);
        updateUrl(selectedCategories, newSort);
    };

    if (loading) {
        return (
            <div style={pageStyles.container}>
                <div style={pageStyles.loading}>Loading amazing products...</div>
            </div>
        );
    }

    return (
        <div style={pageStyles.container}>
            <div style={pageStyles.header}>
                <h1 style={pageStyles.title}>Discover Products</h1>
                <p style={pageStyles.subtitle}>
                    {products.length} items available
                </p>
            </div>

            <div style={pageStyles.controls}>
                <div style={pageStyles.controlRow}>
                    <div style={pageStyles.categoriesSection}>
                        <span style={pageStyles.categoryLabel}>Categories:</span>
                        {categories.map((cat) => (
                            <div
                                key={cat}
                                style={{
                                    ...pageStyles.categoryChip,
                                    ...(selectedCategories.includes(cat) && pageStyles.categoryChipActive),
                                }}
                                onClick={() => handleCategoryToggle(cat)}
                            >
                                {cat}
                            </div>
                        ))}
                    </div>

                    <div style={pageStyles.sortSection}>
                        <span style={pageStyles.sortLabel}>Sort:</span>
                        <select
                            value={sort}
                            onChange={handleSortChange}
                            style={pageStyles.sortSelect}
                        >
                            <option value="">None</option>
                            <option value="price_asc">Price: Low → High</option>
                            <option value="price_desc">Price: High → Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {error ? (
                <div style={pageStyles.error}>{error}</div>
            ) : (
                <div style={pageStyles.grid}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;

const pageStyles = {
    container: {
        padding: "40px 24px",
        paddingBottom: "140px",
        maxWidth: "1400px",
        margin: "0 auto",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    header: {
        textAlign: "center",
        marginBottom: "48px",
    },
    title: {
        fontSize: "48px",
        fontWeight: "900",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: "0 0 12px 0",
        letterSpacing: "-1px",
    },
    subtitle: {
        fontSize: "20px",
        color: "#64748b",
        margin: 0,
        fontWeight: "500",
    },
    controls: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        marginBottom: "40px",
        padding: "32px",
        background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "24px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(102, 126, 234, 0.1)",
    },
    controlRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
    },
    categoriesSection: {
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "center",
    },
    categoryLabel: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#374151",
        marginRight: "16px",
    },
    categoryChip: {
        padding: "10px 20px",
        background: "rgba(102, 126, 234, 0.1)",
        color: "#667eea",
        border: "2px solid transparent",
        borderRadius: "25px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(10px)",
    },
    categoryChipActive: {
        background: "linear-gradient(45deg, #667eea, #764ba2)",
        color: "#ffffff",
        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
        transform: "scale(1.05)",
    },
    sortSection: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    sortLabel: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#374151",
    },
    sortSelect: {
        padding: "12px 20px",
        background: "rgba(255, 255, 255, 0.8)",
        color: "#1e293b",
        border: "2px solid rgba(102, 126, 234, 0.2)",
        borderRadius: "16px",
        fontSize: "15px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backdropFilter: "blur(10px)",
        minWidth: "200px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
        marginTop: "20px",
    },
    loading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        fontSize: "18px",
        color: "#64748b",
    },
    error: {
        textAlign: "center",
        padding: "60px 40px",
        color: "#ef4444",
        fontSize: "18px",
        background: "rgba(239, 68, 68, 0.1)",
        borderRadius: "20px",
        border: "1px solid rgba(239, 68, 68, 0.2)",
    },
    skeleton: {
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "loading 1.5s infinite",
    }
};