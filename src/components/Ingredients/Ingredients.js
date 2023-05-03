import React, { useCallback, useEffect, useReducer, useMemo } from "react";

import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../hooks/http";

const API_CALL = "https://dummy-test-7eb05-default-rtdb.firebaseio.com/";

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...state, action.ingredient];
    case "DELETE":
      return state.filter((ig) => ig.id !== action.id);
    default:
      throw new Error("this should be handled");
  }
};

function Ingredients() {
  const {
    loading,
    responseData,
    error,
    sendRequest,
    clear,
    reqExtra,
    reqIdentifier,
  } = useHttp();
  const [currentState, dispatch] = useReducer(ingredientReducer, []);

  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    if (!loading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!loading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({
        type: "ADD",
        ingredient: { id: responseData.name, ...reqExtra },
      });
    }
  }, [responseData, reqExtra, loading, error, reqIdentifier]);

  const userIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        API_CALL + "ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );

      //Post the ingredient
      // setIsLoading(true);
      // httpDispatchAction({ type: "SEND" });
      // fetch(API_CALL + "ingredients.json", {
      //   method: "POST",
      //   body: JSON.stringify(ingredient),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((res) => {
      //     // setIsLoading(false);
      //     httpDispatchAction({ type: "RESPONSE" });
      //     return res.json();
      //   })
      //   .then((data) => {
      //     // setUserIngredients((prevState) => [
      //     //   ...prevState,
      //     //   { id: data.name, ...ingredient },
      //     // ]);
      //     dispatch({ type: "ADD", ingredient: { id: data.name, ...ingredient } });
      //   });
    },
    [sendRequest]
  );

  // useEffect(() => {
  //   // Fetch existing ingredients
  //   fetch(API_CALL + "ingredients.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const loadedData = [];
  //       for (const key in data) {
  //         loadedData.push({
  //           id: key,
  //           title: data[key].title,
  //           amount: data[key].amount,
  //         });
  //       }
  //       // setUserIngredients(loadedData);\
  //       dispatch({ type: "SET", ingredients: loadedData });
  //     });
  // }, []);

  const itemSearchHandler = useCallback((loadedSearch) => {
    // setUserIngredients(loadedSearch);
    dispatch({ type: "SET", ingredients: loadedSearch });
  }, []);

  const itemRemoveHandler = useCallback(
    (id) => {
      // setIsLoading(true);
      sendRequest(
        API_CALL + `ingredients/${id}.json`,
        "DELETE",
        null,
        id,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        onRemoveItem={itemRemoveHandler}
        ingredients={currentState}
      />
    );
  }, [itemRemoveHandler, currentState]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={userIngredientHandler}
        loading={loading}
      />
      <section>
        <Search onLoadIngredients={itemSearchHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
