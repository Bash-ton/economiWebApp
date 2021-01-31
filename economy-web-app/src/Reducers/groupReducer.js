const initState = {
    items: [
        {store: "123", price: "123", name: "qwe", category: "Food"},
        {store: "asd", price: "12", name: "sdq", category: "Food"},
    ]
}

//add groupname to state
const groupReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_GROUP':
            console.log("created group", action.item)
            console.log("set pass", action.password)

            return {
                ...state,
                currentGroupName: action.item,
                currentGroupPassword: action.password
            };
        case 'CREATE_GROUP_ERROR':
            console.log('created group error', action.err);
            return state;
        default:
            return state;
    }
}

export default groupReducer;