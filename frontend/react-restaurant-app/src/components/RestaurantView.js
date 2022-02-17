import { faAmericanSignLanguageInterpreting } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

function RestaurantView() {
    
    const handleError = (err) => {
        console.warn(err);
    }


    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch(/orders/).catch(handleError);
            if (!response.ok) {
                throw new Error('Network response was not ok')
            } else {
                const data = await response.json();
                setOrders(data)
            }
        }
        getOrders();
    }, []);
     
    if (!orders) {
        return <div>'Fetching orders...'</div >
    }

    const completeOrder = (e) => {
        const completedOrder = orders.filter((order) => order.id == e.target.value)
        completedOrder.completed = true
        const pk = e.target.value
        const pushComplete = async () => {

            const options = {
                method: "PUT",
                headers: {
                    'content-type': "application/json",
                    "X-CSRFToken": Cookies.get('csrftoken'),
                },
                body: JSON.stringify({...completedOrder})
            }

            const response = await fetch(`/orders/${pk}/`, options).catch(handleError)

            if (!response.ok) {
                throw new Error('Network was not ok');
            }
        }
        pushComplete();

        const newOrders = orders.map((order) => {
            if (order.id == pk) {
                return {...order, completed: true}
            } else {
                return {...order}
            }
        })
        setOrders(newOrders)
    }

    const cancelOrder = (e) => {

        const pk = e.target.value

        const pushCancel = async () => {

            const options = {
                method: "DELETE",
                headers: {
                    'content-type': "application/json",
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
            }

            const response = await fetch(`/orders/${pk}`, options).catch(handleError)
            if (!response.ok) {
                throw new Error('Network was not ok');
            }
        }
        pushCancel();
        const newOrders = orders.filter((order) => (order.id != pk))
        setOrders(newOrders)
    }

    const order_display = orders
            .filter((order) => (
                order.completed === false
            ))
            .map((order) => (
                <li className='kitchen-item' key={order.id}>
                    <div className='inner-wrapper'>
                        Name: {order.name}
                        <h4>Order:</h4>
                        {order.items.map((item, index) => (
                                <div className="kitchen-order-summary" key={index}>{item.name}: {item.quantity}</div>
                        ))}
                        Total: ${order.total}
                        <div className="kitchen-buttons">
                            <Button type='button' onClick={completeOrder} value={order.id}>Completed</Button>
                            <Button type='button' onClick={cancelOrder} value={order.id}>Cancel Order</Button>
                        </div>
                    </div>
                </li>
            ))
    
    const completed_order_display = orders
        .filter((order) => (
                order.completed === true
        ))
        .map((order) => (
            <li className='completed-kitchen-item' key={order.id}>
                <div className='inner-wrapper'>
                    Name: {order.name}
                    <h4>Order:</h4>
                    {order.items.map((item, index) => (
                        <div className= "kitchen-order-summary" key={index}>{item.name}: {item.quantity}</div>
                    ))}
                    Total: ${order.total}
                </div>
            </li>
        ))

    return (
        <div className="restaurant-view">
            <div>
                <h3>Active Orders</h3>
            <ul className='active-orders'>
                {order_display}
            </ul>
            </div>
            <div>
                <h3>Completed Orders</h3>
                <ul className='completed-orders'>
                    {completed_order_display}
                </ul>
            </div>
        </div>
    )
}

export default RestaurantView