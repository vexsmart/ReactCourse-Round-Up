import { useCallback, useReducer } from "react";

const initialState = {
  loading: null,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpDispatch = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...state,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("must be managed!");
  }
};

const useHttp = () => {
  const [curHttpState, httpDispatchAction] = useReducer(
    httpDispatch,
    initialState
  );

  const clear = useCallback(() => httpDispatchAction({ type: "CLEAR" }), []);

  const sendRequest = (url, method, body, reqExtra, reqIdentifier) => {
    httpDispatchAction({ type: "SEND", identifier: reqIdentifier });
    fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();

        // setIsLoading(false);
        // setUserIngredients((prevState) =>
        //   prevState.filter((ig) => ig.id !== id)
        // );
        // console.log(id);
      })
      .then((responseData) => {
        httpDispatchAction({
          type: "RESPONSE",
          responseData: responseData,
          extra: reqExtra,
        });
      })
      .catch((error) => {
        // setError(error.message);
        // setIsLoading(false);
        httpDispatchAction({ type: "ERROR", errorData: error.message });
      });
  };

  return {
    loading: curHttpState.loading,
    error: curHttpState.error,
    responseData: curHttpState.data,
    sendRequest: sendRequest,
    reqExtra: curHttpState.extra,
    reqIdentifier: curHttpState.identifier,
    clear: clear,
  };
};

export default useHttp;
