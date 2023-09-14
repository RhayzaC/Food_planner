import React from "react";
import NavBar from "../Components/NavBar"; // Importa tu componente de Navbar
import Footer from "../Components/Footer"; // Importa tu componente de Footer

const Layout = ({ children }) => {
    return (
        <div>
        <NavBar />
        <div className="container">
            {children}
        </div>
        <Footer />
    </div>
    );
};

export default Layout;
