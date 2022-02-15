import Button from "react-bootstrap/Button";

function OrderItem({ name, price, id, removeItem, quantity}) {

    const handleClick = (e) => {
        e.preventDefault();
        removeItem(e.target.value);
    }

    return (
        <li className='order-item'>
            <div className='item-quantity'>{quantity} {name} <Button type="button" onClick={handleClick} value={id} className='remove-button'>Remove</Button>
            </div>
            <div className='sub-price'>
            ${price*quantity}
            </div>
        </li>
    )
}

export default OrderItem;