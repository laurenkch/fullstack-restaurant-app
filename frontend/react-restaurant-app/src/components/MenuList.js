import MenuItem from "./MenuItem";

function MenuList({ menulist, category, addToOrder }) {
    const categoryDisplay = menulist.filter((item) => item.category === category)
            .map((item) => <MenuItem key={item.id} item={item} {...item} addToOrder={addToOrder}/>);

        return (
            <div className="menu-list">
                <h3 className="category">{category}</h3>
                {categoryDisplay}
            </div>
        )
    }

export default MenuList;