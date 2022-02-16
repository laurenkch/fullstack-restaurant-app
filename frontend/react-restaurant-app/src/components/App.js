import Order from "./Order";
import MenuList from "./MenuList";
import WelcomePageContent from "./WelcomePageContent";
import Header from "./Header";
import OurStory from "./OurStory";
import Contact from "./Contact";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import OrderPreview from "./OrderPreview";
import RestaurantView from "./RestaurantView";
import ThankYou from './ThankYouPage';

// const MENU = [
//   {
//     name: 'chicken sandwich',
//     price: 10.99,
//     description: 'the best sandwich',
//     category: 'main',
//     image: '',
//     quantity: 1,
//     id: 1,
//   },{
//     name: 'chicken wrap',
//     price: 9.99,
//     description: 'a healthier alternative',
//     category: 'main',
//     image: '',
//     quantity: 1,
//     id: 2,
//   },{
//     name: 'chicken caesar salad',
//     price: 12.99,
//     description: 'crisp greens and even crispier chicken',
//     category: 'main',
//     image: '',
//     quantity: 1,
//     id: 3,
//   },{
//     name: 'fried okra',
//     price: 2.99,
//     description: 'with extra zest',
//     category: 'sides',
//     image: '',
//     quantity: 1,
//     id: 4,
//   },{
//     name: 'homefries',
//     price: 1.99,
//     description: 'with cajun seasoning',
//     category: 'sides',
//     image: '',
//     quantity: 1,
//     id: 5,
//   },{
//     name: 'slaw',
//     price: 1.99,
//     description: 'made with pickle juice',
//     category: 'sides',
//     image: '',
//     quantity: 1,
//     id: 6,
//   },{
//     name: 'banana pudding',
//     price: 4.99,
//     description: 'soft and dreamy',
//     category: 'dessert',
//     image: '',
//     quantity: 1,
//     id: 7,
//   },{
//     name: 'sweet tea',
//     price: 1.99,
//     description: 'as sweet as sweet can be',
//     category: 'drinks',
//     image: '',
//     quantity: 1,
//     id: 8,
//    },{
//     name: 'soda',
//     price: 1.99,
//     description: 'locally made',
//     category: 'drinks',
//     image: '',
//     quantity: 1,
//     id: 9,
//   }
// ]
  
function App() {

/////////////////////////////////////////////////////////retrieving menu items

  const [menulist, setMenulist] = useState(null)
  const [order, setOrder] = useState([]); 
  const [filter, setFilter] = useState('welcome-page');


  const handleError = (err) => {
    console.warn(err);
  }
  
  useEffect(() => {
    const getMenuItems = async () => {
      const response = await fetch('/menu/').catch(handleError);
      if (!response.ok) {
        throw new Error('Network response was not ok')
      } else {
        const data = await response.json();
        setMenulist(data)
      }
    }
    getMenuItems();
  }, []);

  if (!menulist) {
    return <div>Fetching menu items...</div>
  }
  
////////////////////////////////////////////////////////////////Add an item

  const CATEGORIES = [...new Set(menulist.map((item) => item.category))];

  const orderIncludes = (additionalItem) => {
    return order.some((item) => item.id == additionalItem.id)
  };


  const addToOrder= (additionalItem) => {
    
    if (orderIncludes(additionalItem)) {
      const itemIndex = order.findIndex((item) => item.id == additionalItem.id);
      const newQuantity = order[itemIndex].quantity + 1;
      const newOrder = order.map((item) =>
        (item.id == additionalItem.id) ? { ...item, quantity: newQuantity } : item);
      setOrder(newOrder);

    } else {
      const itemIndex = menulist.findIndex((item) => item.id == additionalItem.id);
      const newItem = menulist.slice(itemIndex, itemIndex + 1);
      const newOrder = [
        ...order, ...newItem
      ];
      setOrder(newOrder);
    };

  };

  const menuDisplay = CATEGORIES.map((category, index) => <MenuList key={index} category={category} MENU={menulist} addToOrder={addToOrder} />);

////////////////////////////////////////////////////////////////Submit order button


  const submitOrder = async (name, order, total) => {
    
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": Cookies.get('csrftoken'),
      },
      body: JSON.stringify({ 'name': name, 'items': order, 'total': total})
    }
    const response = await fetch('/orders/', options).catch(handleError);

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    setFilter('thank-you')    
  }

////////////////////////////////////////////////////////////////Header Navigation

  return (
    <div className="App">

      <Header order={order} setFilter={setFilter}/>
      {filter === 'welcome-page' && <div className="wrapper">
                                        <WelcomePageContent />
                                      </div>}
      {filter === 'menu' && <div className="wrapper">
                              <div className="menu-page">
                                <h2>Menu</h2>
                                {menuDisplay}
                              </div>
        <OrderPreview order={order} setOrder={setOrder} setFilter={setFilter}/>
      </div>}
      {filter === 'our-story' && <OurStory />}
      {filter === 'contact' && <Contact />}
      {filter === 'order-page' && <div className="wrapper">
        <Order order={order} setOrder={setOrder} submitOrder={submitOrder}/>
      </div>}
      {filter === 'restaurant-view' &&
        <RestaurantView handleError={handleError}/>}
      {filter === 'thank-you' && <div className="wrapper">
        <ThankYou />
      </div>}
      
    </div>
  );
}

export default App;
