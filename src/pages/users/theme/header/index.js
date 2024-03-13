// Header.js
import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
        navigate('/');
    };

    return (
        <div className="header-container">
            <h1 className="title" onClick={handleTitleClick}>
                POS-System
            </h1>
            <div className="user-icon-container" onClick={handleUserIconClick}>
                <FontAwesomeIcon icon={faUser} className="user-icon" />
            </div>
        </div>
    );
};

export default memo(Header);
