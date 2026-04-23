import {
    SHOW_SERMONS_FILTER_MENU,    
    SET_SERMON_BOOK_FILTER,
    SET_SERMON_SPEAKER_FILTER,
    SET_SERMON_SEARCH_FILTER,
} from "../types"

const initialState = {
    showSermonsFilterMenu: false,    
    sermonBookFilter: null,
    sermonSpeakerFilter: null,
    sermonSearchFilter: "",
}

const sermonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SERMONS_FILTER_MENU: return {...state, showSermonsFilterMenu: action.payload}
        case SET_SERMON_BOOK_FILTER: return {...state, sermonBookFilter: action.payload}
        case SET_SERMON_SPEAKER_FILTER: return {...state, sermonSpeakerFilter: action.payload}
        case SET_SERMON_SEARCH_FILTER: return {...state, sermonSearchFilter: action.payload}
        default:
            return state
    }
}

export default sermonsReducer