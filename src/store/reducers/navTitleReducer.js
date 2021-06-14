import * as types from "../actions/actionTypes"

export default function navTitles(state = { title: '' }, action = {}) {
    switch (action.type) {
        case types.NAV_TITLE: return { ...state, title: action.title }
        case types.RESET_NAV_TITLE: return { ...state, title: '' }
        default: return state;
    }
}