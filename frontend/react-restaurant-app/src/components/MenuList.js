import MenuItem from "./MenuItem";

function MenuList({ MENU, category, addToOrder }) {

        const categoryDisplay = MENU.filter((item) => item.category === category)
            .map((item) => <MenuItem key={item.id} item={item} {...item} addToOrder={addToOrder}/>);

        return (
            <div className="menu-list">
                <h3 className="category">{category}</h3>
                {categoryDisplay}
            </div>
        )
    }

export default MenuList;