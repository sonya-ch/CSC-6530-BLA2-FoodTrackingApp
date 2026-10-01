import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import myStyle from "../assets/styles/myStyle";


export default function AddFood({ 
    onAddFood,
    onUpdateFood,
    onBack,
    foodToEdit
}) {

    /*------ State Variables (Add/Edit) ------ */ 
    const [name, setName] = useState(foodToEdit?.name || "");

    const [image, setImage] = useState(foodToEdit?.image || "");

    const [calories, setCalories] = useState(
    foodToEdit?.calories?.toString() || "");

    const [protein, setProtein] = useState(
    foodToEdit?.protein?.toString() || "");

    const [carbs, setCarbs] = useState(
    foodToEdit?.carbs?.toString() || "");

    const [fat, setFat] = useState(
    foodToEdit?.fat?.toString() || "");

    const [category, setCategory] = useState(
    foodToEdit?.category || "Breakfast");

    /*------ Functions ------ */ 
    const handleSaveFood  = () => {
        // Basic validation (Empty Name)
        if (!name.trim()) {
             alert(
                    "⚠️ Please enter food name."
                );
            return;
        }

        const foodData = {
            id: foodToEdit ? foodToEdit.id : Date.now(),
            name: name.trim(),
            image: image.trim() || "https://images.unsplash.com/photo-1531928351158-2f736078e0a1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            calories: Number(calories) || 0,
            protein: Number(protein) || 0,
            carbs: Number(carbs) || 0,
            fat: Number(fat) || 0,
            category: category,
        };

        if (foodToEdit) {
            // UPDATE
            onUpdateFood(foodData);
        } else {
            // CREATE
            onAddFood(foodData);
        }
        };

    return (
        <View style={myStyle.container}> 

            {/* Header */}
            <View style={myStyle.favheader}>
                <Text style={myStyle.logoText}>
                {foodToEdit ? "🍳 Edit Food" : "🥘 Add New Food"}
                </Text>
            </View>

            <ScrollView style={myStyle.container}>
                <View style={myStyle.foodDetailContainer}>

                    {/* Food Name */}
                    <Text style={myStyle.formLabel}>Food Name</Text>
                    <TextInput
                        style={myStyle.formInput}
                        placeholder="Enter food name"
                        value={name}
                        onChangeText={setName}
                    />
                    
                    {/* Image URL */}
                    <Text style={myStyle.formLabel}>Image URL</Text>
                    <TextInput
                        style={myStyle.formInput}
                        placeholder="Enter image URL"
                        value={image}
                        onChangeText={setImage}
                        autoCapitalize="none"
                    />

                    {/* Calories */}
                    <Text style={myStyle.formLabel}>Calories</Text>
                    <TextInput
                        style={myStyle.formInput}
                        placeholder="Enter calories"
                        value={calories}
                        onChangeText={setCalories}
                        keyboardType="numeric"
                    />

                    {/* Protein */}
                    <Text style={myStyle.formLabel}>Protein (g)</Text>
                    <TextInput
                        style={myStyle.formInput}
                        placeholder="Enter protein"
                        value={protein}
                        onChangeText={setProtein}
                        keyboardType="numeric"
                    />

                    {/* Carbs */}
                    <Text style={myStyle.formLabel}>Carbs (g)</Text>
                    <TextInput
                        style={myStyle.formInput}
                        placeholder="Enter carbs"
                        value={carbs}
                        onChangeText={setCarbs}
                        keyboardType="numeric"
                    />

                    {/* Fat */}
                    <Text style={myStyle.formLabel}>Fat (g)</Text>
                    <TextInput
                        style={myStyle.formInput}
                        placeholder="Enter fat"
                        value={fat}
                        onChangeText={setFat}
                        keyboardType="numeric"
                    />

                    {/* Category */}
                    <Text style={myStyle.formLabel}>Category: {category}</Text>

                    <View style={myStyle.categoryRow}>
                        <TouchableOpacity
                            style={myStyle.categoryButton}
                            onPress={() => setCategory("Breakfast")}>
                                <Text>🥞 Breakfast</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={myStyle.categoryButton}
                            onPress={() => setCategory("Lunch")}>
                                <Text>🍱 Lunch</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={myStyle.categoryButton}
                            onPress={() => setCategory("Dinner")}>
                            <Text>🍝 Dinner </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Buttons */}
                    <View style={myStyle.formButtonRow}>
                        <TouchableOpacity
                            style={myStyle.cancelButton}
                            onPress={onBack}>
                            <Text style={myStyle.cancelButtonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={myStyle.saveButton}
                            onPress={handleSaveFood}
                        >
                            <Text style={myStyle.saveButtonText}>
                                {foodToEdit ? "💾 Save Changes" : "＋ Add Food"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
