import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { observer } from "mobx-react";

const Footer = observer(() => {
    const store = useContext(CartContext);
    const isEmpty = store.totalItems === 0;

    return (
        <footer style={footerStyles.container}>
            <div style={footerStyles.itemsSection}>
                <span style={footerStyles.itemsCount}>
                    {isEmpty ? "0" : store.totalItems} {store.totalItems === 1 ? "item" : "items"}
                </span>
            </div>

            <div style={footerStyles.totalSection}>
                <span style={footerStyles.totalLabel}>Total</span>
                <span style={isEmpty ? footerStyles.emptyCart : footerStyles.totalPrice}>
                    RS. {store.totalPrice.toFixed(2)}
                </span>
            </div>
        </footer>
    );
});

export default Footer;

const footerStyles = {
    container: {
        padding: "16px 24px",
        borderTop: "3px solid linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        fontSize: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "#ffffff",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.2)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        zIndex: 1000,
        backdropFilter: "blur(10px)",
    },
    itemsSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "2px",
    },
    itemsCount: {
        fontSize: "14px",
        fontWeight: "500",
        opacity: 0.9,
        letterSpacing: "0.5px",
    },
    totalSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "4px",
    },
    totalLabel: {
        fontSize: "13px",
        opacity: 0.8,
        fontWeight: "500",
        letterSpacing: "0.3px",
    },
    totalPrice: {
        fontSize: "22px",
        fontWeight: "800",
        background: "linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    emptyCart: {
        color: "#a0aec0",
        fontStyle: "italic",
        fontSize: "14px",
    }
};