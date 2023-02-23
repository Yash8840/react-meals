import { useContext, useEffect, useState } from "react";
import ButtonAnimationContext from "../../Context/ButtonAnimationContext";
import CartContext from "../../Context/CartContext";
import ModalContext from "../../Context/ModalContext";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const ctx = useContext(ModalContext);
  const cartCtx = useContext(CartContext);// this component is re-evaluated whenever the CartContext object changes, it does change since inside it, the "items" and "totalAmount" property is managed by useReducer(see CartProvider.js)

  const numberOfCartItems = cartCtx.items.reduce((currNumber, item)=>{
    return currNumber + item.amount;
  } , 0);

  const btnAnimate = `${classes.button} ${classes.bump}`;
  const btnCtx = useContext(ButtonAnimationContext);
  

  const classNameBtn = btnCtx.cartState ?  btnAnimate : `${classes.button}`;
  return (
    <button className={classNameBtn} onClick={ctx.openModal}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
    
  );
};
export default HeaderCartButton;
