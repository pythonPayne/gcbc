import {
    SHOW_MENU,    
} from "../types"

const initialState = {
    showMenu: false,    
}

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MENU: return {...state, showMenu: action.payload}
        
        default:
            return state
    }
}

export default layoutReducer