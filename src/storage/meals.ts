import AsyncStorage from '@react-native-async-storage/async-storage';

const MEALS_KEY = 'meals';

export type Meal = {
    id: string,
    name: string,
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    createdAt: string,
    date: string
};


export async function getMeals(): Promise<Meal[]> {
    const data = await AsyncStorage.getItem(MEALS_KEY);
    return data ? JSON.parse(data) : [];
}

export async function addMeal(
    meal: Omit<Meal, 'id' | 'createdAt' | 'date'>
): Promise<Meal> {
    const allMeals = await getMeals();
    const newMeal: Meal = {
        ...meal,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString("en-CA")
    };

    await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...allMeals]));
    return newMeal;
}

// clearing all meals from Async Storage (only for testing purposes)
export async function clearMeals(): Promise<void> {
    await AsyncStorage.removeItem(MEALS_KEY);
}

// delete meal with specific id from the meals list
export async function deleteMeal(id: string): Promise<void> {
    const meals = await getMeals();
    const filtered = meals.filter((meal) => meal.id !== id );
    console.log(filtered);
    await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(filtered));
}