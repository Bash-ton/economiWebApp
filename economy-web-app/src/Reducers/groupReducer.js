const initState = {
    item: [
        {groupName: "-"}, {member: "-"}, {member: "-"}, {member: "-"},{ member: "-"}
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
        case 'JOINED_GROUP':
            return {
                ...state,
                currentGroupName: action.item,
                currentGroupPassword: action.password
            };
        case 'READ_MY_GROUPS_INFO_1':
            return {
                ...state,
                myGroups1: action.item
            }
        case 'READ_MY_GROUPS_INFO_2':
            return {
                ...state,
                myGroups2: action.item
            }
        case 'READ_MY_GROUPS_INFO_3':
            return {
                ...state,
                myGroups3: action.item
            }
        case 'READ_MY_GROUPS_INFO_4':
            return {
                ...state,
                myGroups4: action.item
            }
        default:
            return state;
    }
}

export default groupReducer;