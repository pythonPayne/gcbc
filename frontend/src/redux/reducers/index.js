import { combineReducers } from "redux"
import layout from "./layout"
import sermons from "./sermons"
import sundayschool from "./sundayschool"

export default combineReducers({
    layout,
    sermons,
    sundayschool,    
})