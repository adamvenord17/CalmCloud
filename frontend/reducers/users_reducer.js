
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ALL_TRACKS, RECEIVE_TRACK } from '../actions/track_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        case RECEIVE_ALL_TRACKS:
            return merge({}, state, action.users );
        case RECEIVE_TRACK:
            return merge({}, state, { [action.user.id]: action.user });
        default:
            return state;
    }
};