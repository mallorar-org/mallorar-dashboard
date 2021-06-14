import * as types from './actionTypes'

export function navTitle(title) {
    return { type: types.NAV_TITLE, title }
}

export function resetNavTitle(title) {
    return { type: types.RESET_NAV_TITLE, title }
}