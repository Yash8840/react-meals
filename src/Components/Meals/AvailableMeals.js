import { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {

  const [DummyMeals , setDummyMeals] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [httpError , setHttpError] = useState();
  
  const fetchMealsHandler = useCallback(async ()=>{
    setIsLoading(true);
    try{
     const response = await fetch('https://react-meals-2-f6e69-default-rtdb.firebaseio.com/meals.json');
     if(!response.ok){
      throw new Error('Something went wrong!');
     }
     const meals = await response.json();
     console.log(meals)
     
     let loadedMeals = []
     for(const key in meals){
      loadedMeals.push({
        id: key,
        name: meals[key].name,
        description: meals[key].description,
        price: meals[key].price
      })
     }
     setDummyMeals(loadedMeals);
     setIsLoading(false);

    }catch(error){
      setIsLoading(false);
      setHttpError(error.message);
    }
  },[])

  useEffect(()=>{
    fetchMealsHandler();
  },[fetchMealsHandler]);

  if(isLoading ){
    return <section className={classes.MealsLoading}> 
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }


  const mealsList = DummyMeals.map((meal) => (
    <MealItem
      mealId = {meal.id}
      mealName={meal.name}
      mealDesc={meal.description}
      mealPrice={meal.price}
      key={meal.id}></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
