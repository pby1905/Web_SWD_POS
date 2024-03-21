// Header.js
import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'; // Import faHome icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css'; // Import CSS file

const Header = () => {
    const navigate = useNavigate(); // Sử dụng hook navigate

    const handleUserIconClick = () => {
        // Điều hướng đến trang /order khi người dùng nhấp vào biểu tượng người dùng
        navigate('/order');
    };

    const handleTitleClick = () => {
        // Điều hướng về trang homepage khi người dùng nhấp vào tiêu đề
        navigate('/dashboard');
    };

    const handleHomeIconClick = () => {
        // Điều hướng về trang homepage khi người dùng nhấp vào biểu tượng home
        navigate('/');
    };

    return (
        <div className="header-container">
            <h1 className="title" onClick={handleTitleClick}>
                POS-System
            </h1>
            <div className="home-icon-container" onClick={handleHomeIconClick}>
                <FontAwesomeIcon icon={faHome} className="home-icon" />
            </div>
            <div className="user-icon-container" onClick={handleUserIconClick}>
                <FontAwesomeIcon icon={faUser} className="user-icon" />
            </div>
        </div>
    );
};

export default memo(Header);
