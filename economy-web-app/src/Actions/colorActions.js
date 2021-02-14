export const createItem = (colors) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({type: "CHANGE_COLORS", item: colors});
    }
}