export interface UserState {
    maskUsername: boolean;
    username: string;
}
export function reducer (state, action) {
    switch (action.type) {
        case 'TOGGLE_MASK_USER':
            return {...state, maskUsername: action.payload};
        default:
            return state;
    }
}
