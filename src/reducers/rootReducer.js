export default (state, action) => {
    switch (action.type) {
        case "resultAction":
            return {
                ...state,
                result: action.payload
            };
        default:
            return state;
    }
};