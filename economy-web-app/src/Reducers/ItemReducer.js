const initState = {
    items: [
        {store: "-", price: "-", name: "-", category: "-"},
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
        case 'READ_ITEMS':
            console.log('read item', action.item);
            return {
                ...state,
                items: action.item.items,
            };
        case 'ITEMS_RESET':

            return initState;


        default:
            return state;
    }
}

export default ItemReducer;