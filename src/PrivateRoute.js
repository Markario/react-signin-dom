import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { Actions, Selectors } from './redux';

class PrivateComponent extends Component {
  componentDidMount() {
    console.log("componentDidMount", { props: this.props });
    const hasUserLoaded = this.props.hasUserLoaded;
    const isLoggedIn = this.props.isLoggedIn;
    const pathname = this.props.location.pathname;
    if(hasUserLoaded && !isLoggedIn && pathname !== "/login"){
      console.log("redirecting to ", loginLocation);
      this.props.RedirectToLogin(pathname, this.props.loginLocation, this.props.history.replace);
    }
  }

  render() {
    console.log("render", { props: this.props });
    const hasUserLoaded = this.props.hasUserLoaded;
    const isLoggedIn = this.props.isLoggedIn;
    const pathname = this.props.location.pathname;

    if(!isLoggedIn && pathname !== "/login"){
      return null;
    }

    return this.props.component;
  }
}
const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: Selectors.isUserLoggedIn(state),
  hasUserLoaded: Selectors.hasUserLoaded(state)
});

PrivateComponent = connect(mapStateToProps, Actions)(PrivateComponent);

const privateComponent = (props, component) => <PrivateComponent component={component} {...props} />;

const renderRoute = ({ component, render, children, loginLocation, ...rest }) => {
  if(children){
    throw new Error("PrivateRoute is not compatible with Route.children props");
  }

  if(component){
    return <Route {...rest} render={ props => privateComponent( { loginLocation, ...props }, React.createElement(component, props)) } />
  }else if(render){
    return <Route {...rest} render={ props => privateComponent( { loginLocation, ...props }, render(props)) } />
  } 
}

class PrivateRoute extends Component {
  render(){
    return renderRoute(this.props);
  }
}

export default PrivateRoute;