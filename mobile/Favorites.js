import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native"; //Core Components

import myStyle from "../assets/styles/myStyle";

// Delete Favorite
import { updateFavorite } from "../database/database";

export default function Favorites({favorites, setFavorites, openFoodDetail}) {
 
  //Remove function
  const removeFavorite = async (id) => {
    try {
      await updateFavorite(id, 0);

      setFavorites(
        favorites.filter((food) => food.id !== id)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  //Calculate total calories
  //-- reduce() function will calculate the total calories from each favorite food
  const totalCalories = favorites.reduce(
    (total, food) => total + food.calories,
    0
  );

  //Food Cards Details
  const renderFavorite = ({ item }) => {
    return (
      <View style={myStyle.fav}>
        <View style={myStyle.foodCard}>
        {/* Food Card - click to Food Detail */}
        <TouchableOpacity onPress={() => openFoodDetail(item)}>
          <Image source={{ uri: item.image }} style={myStyle.foodImage} />
          <View style={myStyle.foodInfo}>
            <Text style={myStyle.foodName}> {item.name} </Text>
            <Text style={myStyle.calories}> {item.calories} kcal </Text>
          </View>
        </TouchableOpacity>
 
          {/* Favorite Button */}
            <TouchableOpacity
                  style={myStyle.favoriteButton}
                  onPress={() => removeFavorite(item.id)}
                >
              <Text style={myStyle.favoriteText}>
                💔 Remove Favorite
              </Text>
            </TouchableOpacity>
        </View>
      </View>
    ); //return food card
  }; //renderFood()

  //return favorites screen
  return (
    <View style={myStyle.container}>

      <View style={myStyle.favheader}>

        <Text style={myStyle.logoText}>
          ❤️ My Favorites
        </Text>
        
        {/* --- Total Calories ---- */}
        <Text style={myStyle.totalCaloriesHeader}>
          {totalCalories} kcal
        </Text>

      </View>


      {favorites.length === 0 ? ( // Ternary operator = No Favorites Food
        <Text style={myStyle.emptyText}>
          No favorite food yet ❤️
        </Text>
      ) : ( // have favorites food = FlatList data[array], renderItem[detail], key[id].
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()} // Extract unique key for each favorite item
          renderItem={renderFavorite}
        />
      )}

    </View>
  );
}