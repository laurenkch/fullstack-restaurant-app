import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";

function Header({ order , setFilter}) {
    
    const ITEMS = [...order.map((item) => item.quantity),0];
    const totalItems = ITEMS.reduce((a, b) => a + b);

    const handleClick = (e) => {
        e.preventDefault();
        setFilter(e.currentTarget.value);
    }

    return (
        <nav>
            <ul>
                <li><Button type="button" value="welcome-page" onClick={handleClick}>Home</Button></li>
                <li><Button type="button" value="menu" onClick={handleClick}>Menu</Button></li>
                <li><Button type="button" value="our-story" onClick={handleClick}>Our Story</Button></li>
                <li><Button type="button" value="contact" onClick={handleClick}>Contact</Button></li>
            </ul>
            <div className="cart-icon">
                <Button type="button" value="order-page" onClick={handleClick}><FontAwesomeIcon icon={faShoppingBasket} /></Button>
                <div className="counter">{totalItems}</div>
            </div>
        </nav>
    )
}

export default Header;