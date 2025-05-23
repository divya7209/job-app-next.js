
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 Get Job. All rights reserved.</p>
                <nav className="mt-4">
                    <ul className="flex justify-center space-x-4">
                        <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
                        <li><a href="#contact" className="hover:underline">Contact Us</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;