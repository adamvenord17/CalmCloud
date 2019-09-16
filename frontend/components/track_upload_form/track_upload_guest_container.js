import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import TrackUploadGuest from './track_upload_guest';

const mapStateToProps = ({ entities, session }) => ({
});

const mapDispatchToProps = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackUploadGuest));