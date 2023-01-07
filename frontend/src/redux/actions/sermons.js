import {
    SHOW_SERMONS_FILTER_MENU,
    SET_SERMON_BOOK_FILTER,
    SET_SERMON_SPEAKER_FILTER,
    SET_SERMON_SEARCH_FILTER,
} from "../types"

export const toggleShowSermonsFilterMenu = (bool) => ({type: SHOW_SERMONS_FILTER_MENU, payload: bool})
export const setSermonBookFilter = (book) => ({type: SET_SERMON_BOOK_FILTER, payload: book})
export const setSermonSpeakerFilter = (book) => ({type: SET_SERMON_SPEAKER_FILTER, payload: book})
export const setSermonSearchFilter = (search) => ({type: SET_SERMON_SEARCH_FILTER, payload: search})