import { useState, useEffect } from "react";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
console.log('NAME', name)
console.log('INGREDIETNS', ingredients)


function handleSubmit(e) {
  e.preventDefault();
//   if(name === "" && ingredients.length === 0) {
//  return <h1>FILLOUT FORM</h1>
//   } else {
    const newOrder = {
      name:name, 
      ingredients:ingredients
    }
    addOrder(newOrder)
    clearInputs();
  // }
  }


  function handleIngredientClick(e,ingredient){
    e.preventDefault()
    setIngredients((prev) => [...prev, ingredient])
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => handleIngredientClick(e,ingredient)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value) }
      />
      
      {ingredientButtons}

      <p>Order: {ingredients|| "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)} disabled={!name || !ingredients}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
