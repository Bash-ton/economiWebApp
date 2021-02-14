const initState = {
    colors: [{Food: '#ffbd4b'}, {Entertainment: '#ff6f38'}, {Hygiene: '#0037ff'}, {Detergent: '#cb6363'}, {RarelyBoughtItems: '#fc0f2c'}, {Storage: '#61ff11'}]
}


const ColorReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case 'CHANGE_COLORS':
            console.log("added item", action.item)
            return  {
                ...state,
                colors: action.colors,
            };
        default:
            return state;
    }
}

export default ColorReducer;