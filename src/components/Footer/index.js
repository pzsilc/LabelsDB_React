import React from 'react';

const Footer = () => {
    return(
        <footer className="py-3 mt-5 text-center text-secondary" style={{
            backgroundColor: '#eeeeee'
        }}>
            <img
                src="/labelsdb/logo.png"
                width="100"
                className="my-3"
            />
            <div>
                Silcare &copy; {new Date().getFullYear()}
            </div>
        </footer>
    )
}

export default Footer;
