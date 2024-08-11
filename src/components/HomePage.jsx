import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css'; // Import your CSS file

const HomePage = () => {
    return (
        <div
            className="min-h-screen flex justify-center items-center relative"
            style={{
                backgroundImage: 'url(/d.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
            }}
        >
            <div className="p-8 w-full max-w-lg text-center relative z-10">
                <motion.img
                    src="/rocket.gif"
                    alt="Logo"
                    className="mx-auto mb-2 rocket"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ maxWidth: '80%', height: 'auto' }} // Ensure the rocket image scales well on mobile
                />
                <h1 className="pixel-font text-4xl sm:text-5xl font-bold mb-5 mx-4">Career Chatbot</h1>
                <Link to="/chatbot">
                    <button className="pixel-button">
                        Start
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
