import OrderItem from './OrderItem';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Form from 'react-bootstrap/Form';


function Order({ order, setOrder, submitOrder }) {

    const [ordername, setOrderName] = useState('')
        
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
    
    const handleOrder = (e) => {
        e.preventDefault()
        // reduces order info to just item name and quantity. 
        const order_breakdown = order.map((item) => ({ 'item_name': item.name, 'quantity': item.quantity }))
        submitOrder(ordername, order_breakdown, total)
        setOrder([]);
        setOrderName('')
    };

    const handleChange = (e) => {
       setOrderName(e.target.value)
    }


    return (
            <div className="order-body">
            <h2>Your Order</h2>
            <ul>
                {orderList}
            </ul>
            <div className="bottom-order-section">
                Total: ${total} <br />
                <Form onSubmit={handleOrder}>
                    <div className="name-input">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" id="name" name="ordername" value={ordername} onChange={handleChange} required autoComplete="off" />
                    </div>
                    <Button type="submit" className="place-order-button">Place Order</Button>
                </Form>
            </div>
            </div>
    )
}

export default Order;