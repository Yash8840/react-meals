import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../Context/CartContext";
import CartItem from "./CartItem";
import ButtonAnimationContext from "../../Context/ButtonAnimationContext";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [didSubmit , setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const btnCtx = useContext(ButtonAnimationContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1});
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}  // V.V.V IMP-(WITH THIS METHOD, WE CAN ADD AN ARGUMENT TO THIS FUNCION, WHICH WE COULDN'T DO WITHOUT THE USE OF "bind")
        />
      ))}
    </ul>
  );
  const orderHandler =()=>{
    setIsCheckout(true);
  }
  const submitOrderHandler = async(userFormData)=>{
    setIsSubmitting(true);
    await fetch('https://react-meals-2-f6e69-default-rtdb.firebaseio.com/orders.json' ,{
      method: 'POST',
      body: JSON.stringify({
        user: userFormData,
        orderedItems: cartCtx.items
      })
    })
    setIsSubmitting(false); // must run after fetch, therefore we did async and await
    setDidSubmit(true);
    cartCtx.clearCart();
  }
  const cartModalContent = <React.Fragment>
          {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCheckout={submitOrderHandler}/>}
      {!isCheckout && <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>}
  </React.Fragment>
  const isSubmittingContent = <p>Sending order data...</p>;
  const didSubmitModalContent = 
  <React.Fragment>
    <p>Successfully sent the data</p>
    <div className={classes.actions}>
    <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
    </div>
    </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingContent}
    {didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
