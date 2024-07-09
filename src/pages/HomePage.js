// import React from "react";

// function HomePage () {

      
//     return(
//         <div>
//             <h1> Welecome to Home Page </h1>
           
//         </div>

//     );
// }

// export default HomePage;


import React from "react";
import { useEffect } from "react";

function HomePage() {

    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling on cleanup
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const Style = {
        backgroundImage: 'url("/images/StockCake-Natural Skin Care_1720251363.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '140vh',
        width: '100vw', 
        color: 'white', 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        alignItems: 'center',
        filter: 'brightness(1.2)' 
    };

    const h1Style = {
        marginTop: '195px', 
        fontFamily: '"Georgia", serif', 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        color: '#fff', 
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
    };
    

    return (
        <div style={Style}>
            <h1 style={h1Style}>Welcome to Skin Care Shop</h1>
        </div>
    );
};

export default HomePage;

