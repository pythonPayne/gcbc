import {
    SHOW_SUNDAYSCHOOL_FILTER_MENU,    
    SET_SUNDAYSCHOOL_BOOK_FILTER,
    SET_SUNDAYSCHOOL_SPEAKER_FILTER,
    SET_SUNDAYSCHOOL_SEARCH_FILTER,
    SET_SUNDAYSCHOOL_SERIES_FILTER,
} from "../types"

const initialState = {
    showSundayschoolFilterMenu: false,    
    sundayschoolBookFilter: null,
    sundayschoolSpeakerFilter: null,
    sundayschoolSeriesFilter: null,
    sundayschoolSearchFilter: "",
}

const sundayschoolReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SUNDAYSCHOOL_FILTER_MENU: return {...state, showSundayschoolFilterMenu: action.payload}
        case SET_SUNDAYSCHOOL_BOOK_FILTER: return {...state, sundayschoolBookFilter: action.payload}
        case SET_SUNDAYSCHOOL_SPEAKER_FILTER: return {...state, sundayschoolSpeakerFilter: action.payload}
        case SET_SUNDAYSCHOOL_SERIES_FILTER: return {...state, sundayschoolSeriesFilter: action.payload}
        case SET_SUNDAYSCHOOL_SEARCH_FILTER: return {...state, sundayschoolSearchFilter: action.payload}
        default:
            return state
    }
}

export default sundayschoolReducer