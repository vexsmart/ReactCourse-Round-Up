import React, { useState, useEffect, useRef } from "react";

import "./SignUp.css";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

let state = {
  username: "",
  password: "",
  token: null,
};

const API_KEY = "https://dummy-test-7eb05-default-rtdb.firebaseio.com/";

const SignUp = (props) => {
  const passwordInputRef = useRef();
  const userInputRef = useRef();
  const [entryState, setEntryState] = useState({
    userName: "",
    password: "",
    token: null,
  });

  const userNameHandler = (e) => {
    setEntryState((prevState) => [
      {
        ...prevState,
        userName: userInputRef.current.value,
      },
    ]);
  };

  const passwordHandler = (e) => {
    setEntryState((prevState) => [
      { ...prevState, password: passwordInputRef.current.value },
    ]);
    console.log(passwordInputRef)
  };

  const closeModalHandler = () => {
    props.onClose();
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    // fetch(API_KEY + "signUp.json", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: entryState.userName,
    //     password: entryState.password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // If the server returns a token, save it to the state
    //     if (data.token) {
    //       // setState({ token: data.token });
    //       // Redirect to the home page or dashboard
    //       // history.push("/");
    //     } else {
    //       // If the server returns an error, display it to the user
    //       // alert(data.error);
    //     }
    //   });
  };

  // useEffect(() => {
  //   // Send a GET request to the server with the token
  //   fetch("/api/verify", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${state.token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // If the server returns a success message, the token is valid
  //       if (data.success) {
  //         // Do something, like display the home page or dashboard
  //         // history.push("/");
  //       } else {
  //         // If the server returns an error, the token is invalid or expired
  //         // Redirect to the login page
  //         // history.push("/login");
  //       }
  //     });
  // });

  return (
    <Modal onClose={closeModalHandler}>
      <section className="login-section">
        <Card>
          <form onSubmit={formSubmissionHandler}>
            <div className="form-control">
              <label htmlFor="username">User Name</label>
              <input type="text" ref={userInputRef} onChange={userNameHandler} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                ref={passwordInputRef}
                type="password"
                onChange={passwordHandler}
              />
            </div>
            <br />
            <div className="login-form__actions">
              <button onClick={closeModalHandler}>Cancel</button>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </Card>
      </section>
    </Modal>
  );
};

export default SignUp;
