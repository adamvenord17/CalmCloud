import { connect } from 'react-redux';
import { fetchAllTracks } from '../../../actions/track_actions';
import { changeTrack, pauseTrack } from '../../../actions/footer_player_actions';
import { withRouter } from 'react-router-dom';
import TrackIndex from '../track_index';


const mapStateToProps = (state) => {
    return {
        tracks: Object.values(state.entities.tracks).slice().reverse(),
        users: state.entities.users,
        currentTrack: state.ui.currentTrack,
        percent: state.ui.percent,
        playing: state.ui.playing,
        currentUser: state.entities.users[state.session.currentUser.id]

    };
};

const mapDispatchToProps = dispatch => ({
    fetchAllTracks: () => dispatch(fetchAllTracks()),
    changeTrack: (trackId) => dispatch(changeTrack(trackId)),
    pauseTrack: () => dispatch(pauseTrack()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackIndex));