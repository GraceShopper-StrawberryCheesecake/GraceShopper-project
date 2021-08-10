import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

/**
 *  Hi Sarah
 */
export const Home = (props) => {
  const { name } = props.auth;

  return (
    <div>
      {name && (
        <h3>
          Welcome, {name}!{" "}
          {props.auth.isAdmin ? (
            <div>What changes would you like to make?</div>
          ) : null}
        </h3>
      )}
      {props.auth.isAdmin ? (
        <React.Fragment>
          <Button
            onClick={() => {
              props.history.push("/customers");
            }}
            variant="outlined"
          >
            customers
          </Button>
          <Button
            onClick={() => {
              props.history.push("/customer/add");
            }}
            variant="outlined"
          >
            add customers
          </Button>
          <Button
            onClick={() => {
              props.history.push("/items");
            }}
            variant="outlined"
          >
            items
          </Button>
          <Button
            onClick={() => {
              props.history.push("/item/add");
            }}
            variant="outlined"
          >
            add items
          </Button>
        </React.Fragment>
      ) : null}
      {/* {name && <h3>Welcome, {name}</h3>} */}
      <div id="hero">
      {/* <img src="/cheesecakeicon.svg"/> */}
      <video autoPlay muted loop id="background-video">
        <source src="./cheesecakeVideo.mp4" type="video/mp4" />
      </video>
      <h2 id="hero-banner">"Cheesecake is good!"</h2>
      <Link to="/items"><div id="hero-button">view products</div></Link>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
