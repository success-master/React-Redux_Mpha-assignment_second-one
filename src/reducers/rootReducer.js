const rootReducer = (state, action) => {
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

export default rootReducer