import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Actions } from './redux';

class LogoutRouteHandler extends Component {
  componentDidMount() {
    this.props.Logout(this.props.history.replace, this.props.loginLocation);
  }

  render() {
    return null;
  }
}

export default withRouter(connect(null, Actions)(LogoutRouteHandler));