import { useEffect, useState } from "react";

function RestaurantView({ handleError }) {

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

    const order_display = orders.map((order) => (
        <ul>
            <li>{order.name}</li>
            {order.items.map((item) => (
                    <li>{item.name}: {item.quantity}</li>
            ))}
            <li>{order.total}</li>
        </ul>
    ))

    return (
        <div>
            {order_display}
        </div>
    )
}

export default RestaurantView