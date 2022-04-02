// error boundaries cannot be function components, must be class
import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  // like setState, but sets crashed state
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidCatch(error, info) {
  //   console.error(error, info);
  // }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }

    if (this.state.hasError) {
      return (
        <h2>
          There was an error. Oh no! {""}
          <Link to="/">Click here</Link> to go back to the home page. Or wait
          five seconds and we will do it for you. Or not. I am not your mom.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
// error tracking system for JS: track.js
