import { getMeals } from "@/storage/meals";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Meal } from "@/storage/meals";
import MealItem from "@/components/MealItem";


export default function AllMealsScreen() {
    const [meals, setMeals] = useState<Meal[]>([]);

    async function loadMeals() {
        const data = await getMeals();
        setMeals(data);
        console.log("Loaded Meals : ", data);
    }

    useFocusEffect(
        useCallback(() => {
            loadMeals();
        }, [])
    );

    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.title}>All Meals</Text>
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