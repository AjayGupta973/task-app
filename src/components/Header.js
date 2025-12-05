import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { observer } from "mobx-react";

const Header = observer(() => {
    const store = useContext(CartContext);

    const hasItems = store.totalItems > 0;
    const cartStyle = hasItems ? headerStyles.cartBadgeActive : headerStyles.cartBadge;

    return (
        <header style={headerStyles.container}>
            <div style={headerStyles.logoContainer}>
                <div style={headerStyles.logoIcon}>🛒</div>
                <Link to="/" style={headerStyles.logo}>
                    Ajay App Store
                </Link>
            </div>

            <nav style={headerStyles.nav}>
                <Link
                    to="/"
                    style={headerStyles.navLink}
                    onMouseEnter={(e) => Object.assign(e.target.style, headerStyles.navLinkHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, {})}
                >
                    Home
                </Link>

                <Link to="/cart" style={cartStyle}>
                    <span style={hasItems ? {} : headerStyles.emptyCart}>
                        Cart
                    </span>
                    <span style={headerStyles.itemCount}>
                        {store.totalItems}
                    </span>
                </Link>
            </nav>
        </header>
    );
});

export default Header;

const headerStyles = {
    container: {
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    logo: {
        fontSize: "24px",
        fontWeight: "800",
        background: "linear-gradient(45deg, #ffffff, #f0f9ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textDecoration: "none",
        letterSpacing: "-0.5px",
    },
    logoIcon: {
        width: "32px",
        height: "32px",
        background: "linear-gradient(135deg, #ff6b6b, #feca57)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff",
        boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
    },
    nav: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    navLink: {
        padding: "10px 16px",
        color: "rgba(255, 255, 255, 0.9)",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "500",
        borderRadius: "12px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        letterSpacing: "0.3px",
        position: "relative",
        overflow: "hidden",
    },
    navLinkHover: {
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        transform: "translateY(-2px)",
        color: "#ffffff",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
    },
    cartBadge: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        borderRadius: "25px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        fontSize: "14px",
        fontWeight: "600",
        color: "#ffffff",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
    },
    cartBadgeActive: {
        background: "linear-gradient(45deg, #ff6b6b, #feca57)",
        boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
        transform: "scale(1.05) translateY(-2px)",
        borderColor: "rgba(255, 255, 255, 0.5)",
    },
    itemCount: {
        background: "#ffffff",
        color: "#ff6b6b",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    },
    emptyCart: {
        opacity: 0.7,
        fontStyle: "italic",
    }
};