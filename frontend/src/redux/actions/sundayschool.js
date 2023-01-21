import {
    SHOW_SUNDAYSCHOOL_FILTER_MENU,
    SET_SUNDAYSCHOOL_BOOK_FILTER,
    SET_SUNDAYSCHOOL_SPEAKER_FILTER,
    SET_SUNDAYSCHOOL_SERIES_FILTER,
    SET_SUNDAYSCHOOL_SEARCH_FILTER,
} from "../types"

export const toggleShowSundayschoolFilterMenu = (bool) => ({type: SHOW_SUNDAYSCHOOL_FILTER_MENU, payload: bool})
export const setSundayschoolBookFilter = (book) => ({type: SET_SUNDAYSCHOOL_BOOK_FILTER, payload: book})
export const setSundayschoolSpeakerFilter = (book) => ({type: SET_SUNDAYSCHOOL_SPEAKER_FILTER, payload: book})
export const setSundayschoolSeriesFilter = (book) => ({type: SET_SUNDAYSCHOOL_SERIES_FILTER, payload: book})
export const setSundayschoolSearchFilter = (search) => ({type: SET_SUNDAYSCHOOL_SEARCH_FILTER, payload: search})