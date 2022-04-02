import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  // constructor no longer needed w/ babel plugin for class properties
  // // save yourself time - immediately implement a constructor with super() for all class components
  // constructor(props) {
  //   super(props);
  //   this.state = { loading: true };
  // }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );

    // undefined because of function syntax
    setTimeout(function () {
      console.log(this.state);
    }, 3000);

    setTimeout(() => {
      console.log(this.state);
    }, 1000);

    const json = await res.json();
    this.setState({ loading: false, ...json.pets[0] });
    //line 17 alt: this.setState(Object.assign({ loading: false }, json.pets[0]));
    // and is equivalent to:
    // this.setState({
    //   loading: false,
    // });
    // this.setState(json.pets[0]);
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  // only rule of a class component: must have a render function
  render() {
    if (this.state.loading) {
      return <h2>loading... </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    // throw new Error("danger will robinson!");

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} – {breed} – {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;

// errorboundary goes into the wrapper function so it lives neatly above details. if the errorboundary is inside details and the details component has an error, the errorboundary will crumble with the details component.
