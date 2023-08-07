import React from "react";
import "./Orders.css";

const Orders = ({orders}) => {

// console.log('orders', orders)
  const orderEls = orders.map((order) => {
    // console.log('ORDER', order)
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list" >
          {order.ingredients.map((ingredient, index) => {
            return <li key={`${order.id}-${index}`}>{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
