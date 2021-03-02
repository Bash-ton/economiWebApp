const initState = {
    money: [{total: 0}, {Food: 0}, {Entertainment: 0}, {Hygiene: 0}, {Detergent: 0}, {RarelyBoughtItems: 0}, {Storage: 0}, {FullData: 0}]
}


const MoneyReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case 'GET_MONEY_INFO':
            console.log("added item", action.item)
            return  {
                ...state,
                money: action.item,
            };
        case 'EMPTY_MONEY':
            console.log('have no money yet', action.item);
            return {
                ...state,
                money: initState.money
            };
        case 'MONEY_RESET':

            return {
                initState
            };
        default:
            return state;
    }
}

export default MoneyReducer;