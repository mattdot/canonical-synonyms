export default function synonymApp(state, action) {
    console.log("reducer", state);
    console.log("action", action);
    
    switch(action.type) {
        case "ADD_TERM": 
            let newState = Object.assign({}, state, {
                canonicals : state.canonicals.map((val) => {
                    if(val.entity === action.entity && val.canonical === action.canonical) {
                        return Object.assign({}, val, {
                            synonyms : [...state.synonyms, action.synonym]
                        });
                    } else {
                        return val;
                    }
                })
            });
            console.log(newState);
            return newState;
        default:
            return state;
    }
}

