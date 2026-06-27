import MealItem from "@/components/MealItem";
import { clearMeals, getMeals, Meal } from "@/storage/meals";
import { globalStyles } from "@/styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function AllMealsScreen() {
    const [meals, setMeals] = useState<Meal[]>([]);

    async function loadMeals() {
        const data = await getMeals();
        setMeals(data);
        console.log("Loaded Meals : ", data);
    }

    async function handleClearAll(): Promise<void> {
        Alert.alert(

            "Delete all meals?",

            "This action cannot be undone.",

            [
                { text: "Cancel", style: "cancel" },

                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        await clearMeals();
                        await loadMeals();
                    }
                },

            ]
        );

    }

    useFocusEffect(
        useCallback(() => {
            loadMeals();
        }, [])
    );

    return (
        <ScrollView style={globalStyles.container}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.title}>All Meals</Text>

                {/* for deleting all meals added untill now */}
                <TouchableOpacity onPress={handleClearAll}>
                    <Ionicons
                        name="trash-outline"
                        size={22}
                        color="#EF4444"
                    />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30 }}>
                {meals.length === 0 ? (
                    <Text style={globalStyles.empty}>No meals logged yet.</Text>
                ) : (
                    meals.map((meal) => (
                        <MealItem
                            key={meal.id}
                            id={meal.id}
                            name={meal.name}
                            calories={meal.calories}
                            protein={meal.protein}
                            carbs={meal.carbs}
                            fats={meal.fats}
                            onDelete={loadMeals}
                        />
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = {
    clearButton: {
        color: 'red',
        fontSize: 16,

    },
};