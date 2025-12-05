import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

    return (
        <div
            style={cardStyles.container}
            data-testid="product-card"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = cardStyles.containerHover.transform;
                e.currentTarget.style.boxShadow = cardStyles.containerHover.boxShadow;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = cardStyles.containerHover.boxShadow;
            }}
        >
            <div style={cardStyles.gradientOverlay} />

            <div style={cardStyles.imageWrapper}>
                <img
                    src={product.image}
                    alt={product.title}
                    style={cardStyles.image}
                    onMouseEnter={(e) => e.currentTarget.style.transform = cardStyles.imageHover.transform}
                    onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                />
                <div style={cardStyles.badge}>New</div>
            </div>

            <div style={cardStyles.content}>
                <h3 style={cardStyles.title}>{product.title}</h3>
                <div style={cardStyles.price}>Rs. {product.price}</div>

                <Link
                    to={`/product/${product.id}`}
                    style={cardStyles.link}
                    onMouseEnter={(e) => Object.assign(e.target.style, cardStyles.linkHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, cardStyles.link)}
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;

const cardStyles = {
    container: {
        border: "none",
        borderRadius: "20px",
        padding: "0",
        margin: "12px",
        display: "flex",
        flexDirection: "column",
        maxWidth: "280px",
        flex: "1 1 calc(50% - 24px)",
        background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(10px)",
    },
    containerHover: {
        transform: "translateY(-12px) scale(1.02)",
        boxShadow: "0 25px 60px rgba(102, 126, 234, 0.3)",
    },
    imageWrapper: {
        position: "relative",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
        borderRadius: "20px 20px 0 0",
    },
    image: {
        maxWidth: "140px",
        maxHeight: "140px",
        objectFit: "contain",
        transition: "all 0.3s ease",
        filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.2))",
    },
    imageHover: {
        transform: "scale(1.1) rotate(2deg)",
    },
    badge: {
        position: "absolute",
        top: "12px",
        right: "12px",
        background: "linear-gradient(45deg, #ff6b6b, #feca57)",
        color: "#ffffff",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700",
        boxShadow: "0 4px 15px rgba(255, 107, 107, 0.4)",
    },
    content: {
        padding: "24px 20px 20px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    title: {
        fontSize: "16px",
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: "8px",
        lineHeight: "1.4",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },
    price: {
        fontSize: "24px",
        fontWeight: "800",
        background: "linear-gradient(45deg, #10b981, #059669)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: "16px",
        letterSpacing: "-0.5px",
    },
    link: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "auto",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "600",
        color: "#667eea",
        padding: "12px 20px",
        background: "rgba(102, 126, 234, 0.1)",
        borderRadius: "12px",
        border: "2px solid transparent",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
    },
    linkHover: {
        background: "linear-gradient(45deg, #667eea, #764ba2)",
        color: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
        transform: "translateX(4px)",
    },
    gradientOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
    },
    gradientOverlayHover: {
        opacity: 1,
    }
};