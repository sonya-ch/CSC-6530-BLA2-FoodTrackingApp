//Navigation bar <Home> <Favorites>

import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// --- Props ---
import Home from "./Home"; //props Home
import Favorites from "./Favorites";
import FoodDetail from "./FoodDetail"; //Food Detail
import AddFood from "./AddFood";

// --- Data --- 
import foodData from "../data/food";

// --- Style ---
import myStyle from "../assets/styles/myStyle.js";

export default function App() {
  // --- State ---
  //state Current screen, innitialize to "home"
  const [screen, setScreen] = useState("home");
  
  // Food data 
  const [foods, setFoods] = useState(foodData);

  //Empty array for favorites food
  const [favorites, setFavorites] = useState([]);

  // When select food > go to FoodDetail page
  const [selectedFood, setSelectedFood] = useState(null);


  // --- Functions ---

  // Open Food Detail Page
  const openFoodDetail = (food) => {
    setSelectedFood(food);
    setScreen("detail");
  };

  // Go Back to Home Page
  const goBackHome = () => {
    setSelectedFood(null);
    setScreen("home");
  };

  // Open Add Food Page
  const openAddFood = () => {
    setScreen("add");
  };

  // CREATE - Add New Food
  const addFood = (newFood) => {
    setFoods((prevFoods) => [...prevFoods, newFood]);
    setScreen("home");
  };

  return (
    <View style={{ flex: 1 }}>

      {/* --- Render Screen --- */}
      {screen === "home" ? (
        <Home
          foods={foods}
          favorites={favorites}
          setFavorites={setFavorites}
          openFoodDetail={openFoodDetail}
          openAddFood={openAddFood}
        />

      ) : screen === "favorites" ? (
        <Favorites
          favorites={favorites}
          setFavorites={setFavorites}
          openFoodDetail={openFoodDetail}
        />

      ) : screen === "detail" ? (
        <FoodDetail 
         food={selectedFood}
         onBack={goBackHome} 
         />

      ) : screen === "add" ? (
        <AddFood 
          onAddFood={addFood} 
          onBack={goBackHome} 
        />

      ) : null}

      {/* --- Navigation Bar --- */}
      <View style={myStyle.navbar}>
        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text>🏠 Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("favorites")}>
          <Text>❤️ Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
