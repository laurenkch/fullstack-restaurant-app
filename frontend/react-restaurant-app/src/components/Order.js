import OrderItem from './OrderItem';
import Button from 'react-bootstrap/Button';

function Order({ order, setOrder, submitOrder }) {
        
    const removeItem = (removeItemIndex) => {
        const itemToDeduct = order.find((item) => item.id == removeItemIndex);
        if (itemToDeduct.quantity > 1) {
            let newQuantity = itemToDeduct.quantity - 1;
            let newOrder = order.map((item) =>
                (item.id == removeItemIndex) ? { ...itemToDeduct, quantity: newQuantity } : item);
            setOrder(newOrder);
        } else {
            let newQuantity = itemToDeduct.quantity - 1;
            let newOrder = order.map((item) =>
                (item.id == removeItemIndex) ? { ...itemToDeduct, quantity: newQuantity } : item);
            setOrder(newOrder);
            const updatedOrder = order.filter((item) => item.id != removeItemIndex)
            setOrder(updatedOrder);
        }
    };

    const PRICES = [...order.map((item) => item.price * item.quantity), 0]
    let total = PRICES.reduce((a, b) => a + b);
    total = total.toFixed(2);

    const orderList = order.map((item, index) => <OrderItem key={index} {...item} removeItem={removeItem} />);
    
    const handleOrder = () => {
        submitOrder(order, total)
        setOrder([]);
    };


    return (
            <div className="order-body">
            <h2>Your Order</h2>
            <ul>
                {orderList}
            </ul>
            <div className="bottom-order-section">
            Total: ${total} <br/>
                <Button type="button" onClick={handleOrder} className="place-order-button">Place Order</Button>
            </div>
            </div>
    )
}

export default Order;