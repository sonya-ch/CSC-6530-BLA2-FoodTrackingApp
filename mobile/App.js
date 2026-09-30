//Navigation bar <Home> <Favorites>

import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

  // --- Props ---
import Home from "./Home"; //props Home
import Favorites from "./Favorites";
import FoodDetail from "./FoodDetail"; //Food Detail

  // --- Style ---
import myStyle from "../assets/styles/myStyle.js";


export default function App() {

  // --- State ---
  //state screen, innitialize to "home"
  const [screen, setScreen] = useState("home"); 

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


  return (
    <View style={{ flex: 1 }}> 

{/* --- Render Screen --- */}
      {screen === "home" ? ( // if screen is home = show Home screen
        <Home
          favorites={favorites} // Array favorites, contains the favorite selected 
          setFavorites={setFavorites}
          openFoodDetail={openFoodDetail} //Set State function
        />
      ) : ( //else show Favorites screen
        <Favorites
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
      
      {screen === "detail" && (
        <FoodDetail
          food={selectedFood}
          onBack={goBackHome}
        />
      )}

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