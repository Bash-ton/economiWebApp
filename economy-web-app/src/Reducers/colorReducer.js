const initState = {
    colors: [{Food: '#fccb00'}, {Entertainment: '#db3e00'}, {Hygiene: '#004DCF'}, {Detergent: '#b80000'}, {RarelyBoughtItems: '#008B02'}, {Storage: '#5300EB'}]
}


const ColorReducer = (state = initState, action) => {
    console.log(action)

    switch (action.type) {
        case 'CHANGE_COLORS':
            console.log("added item", action.item)
            return  {
                ...state,
                colors: action.item,
            };
        default:
            return state;
    }
}

export default ColorReducer;