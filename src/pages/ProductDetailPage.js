import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { observer } from "mobx-react";

const ProductDetailPage = observer(() => {
    const { id } = useParams();
    const location = useLocation();
    const store = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedAnimation, setAddedAnimation] = useState(false);

    const styles = {
        container: {
            padding: "24px 16px",
            paddingBottom: "140px",
            maxWidth: "1200px",
            margin: "0 auto",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            width: "auto",
        },
        backLink: {
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "rgba(102, 126, 234, 0.1)",
            color: "#667eea",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "600",
            borderRadius: "16px",
            border: "2px solid transparent",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: "blur(10px)",
            marginBottom: "24px",
            position: "relative",
            overflow: "hidden",
            width: "fit-content",
        },
        backLinkHover: {
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            color: "#ffffff",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
            transform: "translateX(-4px)",
        },
        layout: {
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            alignItems: "center",
        },
        imageSection: {
            position: "relative",
            width: "100%",
            maxWidth: "400px",
        },
        imageWrapper: {
            width: "100%",
            height: "300px",
            borderRadius: "24px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.2)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        image: {
            maxWidth: "240px",
            maxHeight: "260px",
            objectFit: "contain",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))",
        },
        imageHover: {
            transform: "scale(1.05) rotate(1deg)",
        },
        detailsSection: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            padding: "0 8px",
        },
        title: {
            fontSize: "28px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
            lineHeight: "1.3",
            letterSpacing: "-0.5px",
            textAlign: "center",
        },
        price: {
            fontSize: "36px",
            fontWeight: "900",
            background: "linear-gradient(45deg, #10b981, #059669, #047857)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 12px 0",
            letterSpacing: "-0.8px",
            textAlign: "center",
        },
        description: {
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#475569",
            background: "rgba(255, 255, 255, 0.7)",
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid rgba(102, 126, 234, 0.3)",
            backdropFilter: "blur(10px)",
            textAlign: "left",
        },
        ctaSection: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
        },
        addButton: {
            padding: "18px 32px",
            fontSize: "16px",
            fontWeight: "800",
            borderRadius: "24px",
            border: "none",
            background: "linear-gradient(45deg, #10b981, #059669)",
            color: "#ffffff",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 12px 40px rgba(16, 185, 129, 0.4)",
            position: "relative",
            overflow: "hidden",
            letterSpacing: "0.3px",
            textTransform: "uppercase",
            width: "100%",
            maxWidth: "320px",
            touchAction: "manipulation",
        },
        addButtonHover: {
            transform: "translateY(-2px) scale(1.02)",
            boxShadow: "0 20px 50px rgba(16, 185, 129, 0.5)",
        },
        addButtonAdded: {
            background: "linear-gradient(45deg, #f59e0b, #d97706)",
            boxShadow: "0 12px 40px rgba(245, 158, 11, 0.4)",
        },
        loading: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            gap: "24px",
            padding: "20px",
        },
        loadingSpinner: {
            width: "50px",
            height: "50px",
            border: "4px solid rgba(102, 126, 234, 0.2)",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
        },
        error: {
            textAlign: "center",
            padding: "60px 20px",
            color: "#ef4444",
            fontSize: "18px",
            background: "rgba(239, 68, 68, 0.1)",
            borderRadius: "24px",
            border: "2px solid rgba(239, 68, 68, 0.2)",
            margin: "20px 0",
        },
        badge: {
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "linear-gradient(45deg, #f59e0b, #d97706)",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: "16px",
            fontSize: "12px",
            fontWeight: "700",
            boxShadow: "0 6px 16px rgba(245, 158, 11, 0.4)",
        },
    };

    const addGlobalStyles = () => {
        const style = document.createElement("style");
        style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @media (min-width: 769px) {
        .layout { 
          flex-direction: row !important; 
          gap: 48px !important; 
        }
        .details-section { 
          padding: 0 !important; 
          width: auto !important; 
        }
        .title { 
          font-size: 36px !important; 
          text-align: left !important; 
        }
        .price { 
          font-size: 44px !important; 
          text-align: left !important; 
        }
        .add-button { 
          width: auto !important; 
          max-width: 320px !important; 
        }
        .image-wrapper { 
          height: 400px !important; 
        }
        .image { 
          max-width: 280px !important; 
          max-height: 320px !important; 
        }
      }
    `;
        document.head.appendChild(style);
    };

    useEffect(() => {
        addGlobalStyles();
    }, []);

    useEffect(() => {
        const productId = Number(id);

        if (location.state?.product) {
            setProduct(location.state.product);
            setLoading(false);
            return;
        }

        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((products) => {
                const found = products.find((p) => p.id === productId);
                if (!found) {
                    setError("Product not found");
                } else {
                    setProduct(found);
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load product");
                setLoading(false);
            });
    }, [id, location.state]);

    const handleAddToCart = () => {
        if (!product) return;
        store.addItem(product);
        setAddedAnimation(true);
        setTimeout(() => setAddedAnimation(false), 300);
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <div style={styles.loadingSpinner} />
                    <div style={{ fontSize: "18px", color: "#64748b" }}>
                        Loading product details...
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div style={styles.container}>
                <Link
                    to="/"
                    style={styles.backLink}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.backLinkHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, {})}
                >
                    ← Back to Store
                </Link>
                <div style={styles.error}>{error || "Product not found"}</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <Link
                to="/"
                style={styles.backLink}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.backLinkHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, {})}
            >
                ← Back to Store
            </Link>

            <div style={styles.layout} className="layout">
                <div style={styles.imageSection}>
                    <div
                        style={styles.imageWrapper}
                        className="image-wrapper"
                        onMouseEnter={(e) => {
                            const img = e.currentTarget.querySelector("img");
                            if (img) img.style.transform = styles.imageHover.transform;
                        }}
                        onMouseLeave={(e) => {
                            const img = e.currentTarget.querySelector("img");
                            if (img) img.style.transform = "";
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            style={styles.image}
                            className="image"
                        />
                        <div style={styles.badge}>Featured</div>
                    </div>
                </div>

                <div style={styles.detailsSection} className="details-section">
                    <h1 style={styles.title} className="title">
                        {product.title}
                    </h1>
                    <div style={styles.price} className="price">
                        Rs. {product.price}
                    </div>
                    <div style={styles.description}>{product.description}</div>

                    <div style={styles.ctaSection}>
                        <button
                            className="add-button"
                            style={{
                                ...styles.addButton,
                                ...(addedAnimation ? styles.addButtonAdded : {}),
                            }}
                            onClick={handleAddToCart}
                            onMouseEnter={(e) => {
                                if (!addedAnimation) {
                                    Object.assign(e.target.style, styles.addButtonHover);
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!addedAnimation) {
                                    Object.assign(e.target.style, {});
                                }
                            }}
                            data-testid="add-to-cart"
                        >
                            {addedAnimation ? "Added! 🎉" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProductDetailPage;
