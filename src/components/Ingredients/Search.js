import React, { useEffect, useState, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../hooks/http";

const API_CALL = "https://dummy-test-7eb05-default-rtdb.firebaseio.com/";

const Search = React.memo((props) => {
  const inputRef = useRef();
  const { onLoadIngredients } = props;
  const [inputSearch, setInputSearch] = useState("");
  const { loading, responseData, error, sendRequest, clear } = useHttp();

  const inputSeacrhHandler = (e) => {
    setInputSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputSearch === inputRef.current.value) {
        const query =
          inputSearch.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${inputSearch}"`;

        sendRequest(API_CALL + "ingredients.json" + query, "GET");

        // fetch(API_CALL + "ingredients.json" + query)
        //   .then((res) => res.json())
        //   .then((data) => {
        //     const loadedData = [];
        //     for (const key in data) {
        //       loadedData.push({
        //         id: key,
        //         title: data[key].title,
        //         amount: data[key].amount,
        //       });
        //     }
        //     onLoadIngredients(loadedData);
        //   });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputSearch, onLoadIngredients, sendRequest]);

  useEffect(() => {
    if (!loading && !error && responseData) {
      const loadedData = [];
      for (const key in responseData) {
        loadedData.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount,
        });
      }
      onLoadIngredients(loadedData);
    }
  }, [loading, error, responseData, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={inputSearch}
            onChange={inputSeacrhHandler}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
