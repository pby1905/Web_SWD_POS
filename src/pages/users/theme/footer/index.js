import { memo } from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '1px',
        textAlign: 'center',
    };

    return (
        <div style={footerStyle}>
            <h1>&copy; Copyright 2024 - SWD-Pos </h1>
        </div>
    );
};

export default memo(Footer);
