import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTrack, deleteTrack } from '../../actions/track_actions';
import { createFavoriteTrack, deleteFavoriteTrack } from "../../actions/favorite_track_actions";
import { fetchCurrentUser }  from "../../actions/session_actions";
import { openModal } from '../../actions/modal_actions';
import { openShareModal } from '../../actions/share_modal_actions';
import TrackShow from './track_show';
import { changeTrack, pauseTrack, currentPercent, removeCurrentTrack } from "../../actions/footer_player_actions";
import { createComment } from "../../actions/comment_actions";

const mapStateToProps = (state, ownProps) => {

    const track = () => {
        for (let track in state.entities.tracks) {
            if (state.entities.tracks[track].title === ownProps.match.params.title) {
                return state.entities.tracks[track];
            }
        }
        return null;
    };

    const tracks = track() ? Object.values(state.entities.tracks).slice().reverse().filter(subTrack => {
        return (subTrack.user_id === track().user_id) && (subTrack.id !== track().id);
    }).slice(0, 3) : null;

    const findUser = (userId) => {
        for (let user in state.entities.users) {
            if (state.entities.users[user].id === userId) {
                return state.entities.users[user];
            }
        }
    };

    const commentUsers = {};

    if (track()) {
        for (let commentId in track().comments) {
            const user = findUser(track().comments[commentId].user_id);
            commentUsers[user.id] = user;
        }
    }

    return {
        track: track(),
        tracks: tracks,
        user: track() ? findUser(track().user_id) : null,
        commentUsers: commentUsers,
        currentUser: state.session.currentUser.username ? state.entities.users[state.session.currentUser.username] : null,
        currentUserId: state.session.currentUser.username ? state.entities.users[state.session.currentUser.username].id : null,
        currentTrack: state.ui.currentTrack,
        playing: state.ui.playing,
        percent: state.ui.percent
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTrack: (username, title) => dispatch(fetchTrack(username, title)),
    changeTrack: (trackId) => dispatch(changeTrack(trackId)),
    pauseTrack: () => dispatch(pauseTrack()),
    currentPercent: (percent) => dispatch(currentPercent(percent)),
    deleteTrack: trackId => dispatch(deleteTrack(trackId)),
    removeCurrentTrack: () => dispatch(removeCurrentTrack()),
    createFavoriteTrack: (trackId) => dispatch(createFavoriteTrack(trackId)),
    deleteFavoriteTrack: (trackId) => dispatch(deleteFavoriteTrack(trackId)),
    fetchCurrentUser: (username) => dispatch(fetchCurrentUser(username)),
    openModal: modal => dispatch(openModal(modal)),
    openShareModal: url => dispatch(openShareModal(url)),
    createComment: comment => dispatch(createComment(comment)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackShow));