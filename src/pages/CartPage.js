import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { observer } from "mobx-react";

const CartPage = observer(() => {
    const store = useContext(CartContext);

    const isClient = typeof window !== "undefined";
    const [isMobile, setIsMobile] = useState(
        isClient ? window.innerWidth < 640 : false
    );

    useEffect(() => {
        if (!isClient) return;
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isClient]);

    const styles = getStyles(isMobile);

    const handleRemove = (id) => {
        store.removeItem(id);
    };

    const totalItemsPrice = (item) => (+item.price * item.quantity).toFixed(2);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>My Cart</h1>
                <p style={styles.subtitle}>
                    {store.items.length === 0
                        ? "No items yet"
                        : `${store.totalItems} item${store.totalItems !== 1 ? "s" : ""
                        } • Rs. ${store.totalPrice.toFixed(2)}`}
                </p>
            </div>

            {store.items.length === 0 ? (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>🛒</div>
                    <h2 style={styles.emptyTitle}>Your cart is empty</h2>
                    <p style={styles.emptyText}>
                        Add some amazing products to get started!
                    </p>
                </div>
            ) : (
                <div style={styles.itemsContainer}>
                    {store.items.map((item) => (
                        <div
                            key={item.id}
                            style={styles.cartItem}
                            data-testid="cart-item"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    styles.cartItemHover.transform;
                                e.currentTarget.style.boxShadow =
                                    styles.cartItemHover.boxShadow;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "";
                                e.currentTarget.style.boxShadow = "";
                            }}
                        >
                            <div style={styles.gradientOverlay} />

                            <div style={styles.imageWrapper}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={styles.image}
                                />
                            </div>

                            <div style={styles.details}>
                                <h3 style={styles.productTitle}>{item.title}</h3>
                                <p style={styles.quantity}>Qty: {item.quantity}</p>
                            </div>

                            <div style={styles.priceSection}>
                                <div style={styles.itemPrice}>Rs. {totalItemsPrice(item)}</div>
                            </div>

                            <button
                                style={styles.removeButton}
                                onClick={() => handleRemove(item.id)}
                                onMouseEnter={(e) =>
                                    Object.assign(e.target.style, styles.removeButtonHover)
                                }
                                onMouseLeave={(e) => Object.assign(e.target.style, {})}
                                data-testid={`remove-${item.id}`}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default CartPage;

const getStyles = (isMobile) => ({
    container: {
        padding: isMobile ? "16px 12px 120px" : "32px 24px 140px",
        maxWidth: "1024px",
        margin: "0 auto",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    header: {
        textAlign: "center",
        marginBottom: isMobile ? "24px" : "40px",
    },
    title: {
        fontSize: isMobile ? "28px" : "36px",
        fontWeight: "800",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: "0 0 8px 0",
        letterSpacing: "-0.5px",
    },
    subtitle: {
        fontSize: "14px",
        color: "#64748b",
        margin: 0,
    },
    itemsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "12px" : "20px",
    },
    cartItem: {
        display: "flex",
        flexDirection: isMobile ? "row" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "12px" : "20px",
        padding: isMobile ? "16px" : "24px",
        background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(102, 126, 234, 0.1)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        flexWrap: isMobile ? "wrap" : "nowrap",
    },
    cartItemHover: {
        transform: "translateY(-4px)",
        boxShadow: "0 20px 60px rgba(102, 126, 234, 0.15)",
    },
    imageWrapper: {
        width: isMobile ? "64px" : "80px",
        height: isMobile ? "64px" : "80px",
        borderRadius: "16px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    image: {
        width: isMobile ? "48px" : "60px",
        height: isMobile ? "48px" : "60px",
        objectFit: "contain",
    },
    details: {
        flex: 1,
        minWidth: isMobile ? "140px" : "0",
    },
    productTitle: {
        fontSize: isMobile ? "15px" : "18px",
        fontWeight: "700",
        color: "#1e293b",
        margin: "0 0 4px 0",
        lineHeight: "1.4",
    },
    quantity: {
        fontSize: "14px",
        color: "#64748b",
        margin: 0,
    },
    priceSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "flex-start" : "flex-end",
        gap: "8px",
        minWidth: isMobile ? "auto" : "120px",
        marginTop: isMobile ? "8px" : "0",
    },
    itemPrice: {
        fontSize: isMobile ? "18px" : "24px",
        fontWeight: "800",
        background: "linear-gradient(45deg, #10b981, #059669)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
    },
    removeButton: {
        padding: isMobile ? "8px 14px" : "12px 20px",
        background: "linear-gradient(45deg, #ef4444, #dc2626)",
        color: "#ffffff",
        border: "none",
        borderRadius: "12px",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
        position: "relative",
        overflow: "hidden",
        alignSelf: isMobile ? "flex-start" : "auto",
    },
    removeButtonHover: {
        transform: "scale(1.05)",
        boxShadow: "0 8px 25px rgba(239, 68, 68, 0.4)",
    },
    emptyState: {
        textAlign: "center",
        padding: isMobile ? "48px 24px" : "80px 40px",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        borderRadius: "24px",
        border: "2px dashed #cbd5e1",
    },
    emptyIcon: {
        fontSize: isMobile ? "48px" : "64px",
        marginBottom: "24px",
        opacity: 0.5,
    },
    emptyTitle: {
        fontSize: isMobile ? "20px" : "24px",
        fontWeight: "700",
        color: "#475569",
        margin: "0 0 12px 0",
    },
    emptyText: {
        fontSize: "14px",
        color: "#64748b",
        margin: 0,
    },
    gradientOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
    },
});