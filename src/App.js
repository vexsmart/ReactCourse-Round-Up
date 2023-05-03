import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
// import SignUp from "./components/Authentication/SignUp";
import { AuthContext } from "./components/context/auth-context";
import Auth from "./components/Auth";

const App = (props) => {
  const authContext = useContext(AuthContext);
  // const [isLogged, setIsLogged] = useState(false);

  let context = <Auth />;
  if (authContext.isAuth) {
    context = <Ingredients />;
  }

  return context;

  // return <Ingredients />;
  //  return <SignUp onClose={() => {}} />
};

export default App;
