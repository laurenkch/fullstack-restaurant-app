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
            <li key={order.id}>{order.name}
            {order.items.map((item, index) => (
                    <div key={index}>{item.name}: {item.quantity}</div>
            ))}
           {order.total}
            <Button type='button' onClick={completeOrder} value={order.id}>Completed</Button>
            <Button type='button' onClick={cancelOrder} value={order.id}>Cancel Order</Button>
            </li>
            ))
    
    const completed_order_display = orders
        .filter((order) => (
                order.completed === true
        ))
        .map((order) => (
            <li key={order.id}>{order.name}
                {order.items.map((item, index) => (
                    <div key={index}>{item.name}: {item.quantity}</div>
                ))}
                {order.total}
            </li>
        ))

    return (
        <div className="restaurant-view">
            <div>
                Active Orders
            <ul>
                {order_display}
            </ul>
            </div>
            <div>
                Completed Orders
                <ul>
                    {completed_order_display}
                </ul>
            </div>
        </div>
    )
}

export default RestaurantView