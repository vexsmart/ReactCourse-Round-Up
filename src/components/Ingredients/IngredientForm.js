import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo((props) => {
  const {onAddIngredient, loading} = props
  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  

  const inputNameHandler = (e) => {
    setNameInput(e.target.value);
  };

  const inputAmountHandler = (e) => {
    setAmountInput(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    onAddIngredient({ title: nameInput, amount: amountInput });

    setAmountInput("");
    setNameInput("");
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Ingredient</label>
            <input
              type="text"
              id="title"
              value={nameInput}
              onChange={inputNameHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              value={amountInput}
              onChange={inputAmountHandler}
              id="amount"
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
