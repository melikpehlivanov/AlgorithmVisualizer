const initialState = {
    data: [],
    algorithmDescription: '',
    isWeightNodeAllowed: true,

}

const gridReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_GRID':
            return { ...state, data: action.payload };
        default:
            return state;
    }
}

export default gridReducer;