import { useState } from "react";
import { postOrders } from "../../apiCalls";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
console.log('NAME', name)
console.log('INGREDIETNS', ingredients)


function handleSubmit(e) {
  e.preventDefault();
//   if(name === "" || ingredients.length === 0) {
//  alert('FILL OUT FORM')
//  return
  // } else {
    const newOrder = {
      name:name, 
      ingredients:ingredients
    }
    postOrders(newOrder)
    .then(data => {
      addOrder(data)
    })
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

      <button className="submit" onClick={(e) => handleSubmit(e)} disabled={(name.length === 0) || (ingredients.length === 0)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
