const initState = {
    items: [
        {store: "123", price: "123", name: "qwe", category: "Food"},
        {store: "asd", price: "12", name: "sdq", category: "Food"},
    ]
}

const ItemReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            console.log("added item", action.item)
            return state;
        case 'ADD_ITEM_ERROR':
            console.log('add item error', action.err);
            return state;
        default:
            return state;
    }
}

export default ItemReducer;