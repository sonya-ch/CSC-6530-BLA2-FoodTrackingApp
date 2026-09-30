import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import styles from "../assets/styles/myStyle";

export default function FoodDetail({ food, onBack }) {
  if (!food) {
    return (
      <View style={styles.container}>
        <Text>No food selected.</Text>

        <TouchableOpacity onPress={onBack}>
          <Text>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Food Image */}
      <Image
        source={{ uri: food.image }}
        style={styles.foodDetailImage}
      />

      {/* Food Information */}
      <View style={styles.foodDetailContent}>

        <Text style={styles.foodDetailName}>
          {food.name}
        </Text>

        <Text style={styles.foodDetailCategory}>
          {food.category}
        </Text>

        <Text style={styles.foodDetailCalories}>
          {food.calories} Calories
        </Text>

        {/* Nutrition */}
        <View style={styles.nutritionBox}>

          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>
              {food.protein}g
            </Text>

            <Text style={styles.nutritionLabel}>
              Protein
            </Text>
          </View>

          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>
              {food.carbs}g
            </Text>

            <Text style={styles.nutritionLabel}>
              Carbs
            </Text>
          </View>

          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>
              {food.fat}g
            </Text>

            <Text style={styles.nutritionLabel}>
              Fat
            </Text>
          </View>

        </View>

        {/* BLA2 CRUD buttons - temporarily */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>
            Edit Food
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>
            Delete Food
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}