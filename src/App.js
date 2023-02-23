import { Fragment, useContext, useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import ButtonAnimationContext from "./Context/ButtonAnimationContext";
import CartProvider from "./Context/CartProvider";
import ModalContext from "./Context/ModalContext";
import Snowfall from 'react-snowfall';
// import Particles from 'react-particles-js';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


function App() {

  const [cartIsShown, setCartIsShown]= useState(false);
  
  const showCartHandler = ()=>{
    setCartIsShown(true);
  }
  const hideCartHandler=()=>{
    setCartIsShown(false);
  }
  const[cartState , setCartState] = useState(false);
  // useEffect(()=>{

  // } , [cartState])
  const cartStateHandler =()=>{
    setCartState(true);
    setTimeout(()=>{
      setCartState(false);
    },300)
    console.log('it works');
  }
  const removeAnimationHandler =()=>{
    setCartState(false);
    console.log('ce');
  }
  // const particlesInit = async (main) =>{
  //   await loadFull(main)
  // }
  
  return (
    <div>
      {/* <Snowfall snowflakeCount={500}/> THIS IS HOW YOU DO IT!!!!!!!!!!!!!!!!!!!!! */}
    <ButtonAnimationContext.Provider value={{cartState:cartState , cartStateHandler:cartStateHandler , removeAnimationHandler:removeAnimationHandler}}>
    <ModalContext.Provider value={{cartIsShown: cartIsShown, hideModal:hideCartHandler, openModal:showCartHandler}}>
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
    </ModalContext.Provider>
    </ButtonAnimationContext.Provider>
    
    </div>
  );
}

export default App;
