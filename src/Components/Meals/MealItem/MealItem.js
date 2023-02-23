import { useContext } from 'react';
import CartContext from '../../../Context/CartContext';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props)=>{
  const price = `$${props.mealPrice.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const addToCartHandler =(amount)=>{
    console.log(props);
    cartCtx.addItem({
      id:props.mealId,       // V.V.V. IMP- (HERE, PROPS IS THE MEAL ITEM WHICH WE SELECT)
      name:props.mealName,
      amount:amount,
      price:props.mealPrice
    })
  }
  return <li className={classes.meal}>
  <div>
    <h3>{props.mealName}</h3>
    <div className={classes.description}>{props.mealDesc}</div>
    <div className={classes.price}>{price}</div>
  </div>
  <div>
    <MealItemForm id={props.mealId} onAddToCart = {addToCartHandler}/>
  </div>
  </li>
}
export default MealItem