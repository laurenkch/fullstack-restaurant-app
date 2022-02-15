import Button from 'react-bootstrap/Button';

function MenuItem({ name, description, price, image, id, addToOrder, item }) {
    
    const handleClick = (e) => {
        e.preventDefault();
        addToOrder(item);
    }

    return (
        <li className="menu-item">{name}  <span className="description">{description}</span>
            <Button type="button" onClick={handleClick} value={item} className="menu-button">{price}</Button>
        </li>
    )
};

export default MenuItem