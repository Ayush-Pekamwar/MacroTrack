import AsyncStorage from '@react-native-async-storage/async-storage';

const MEALS_KEY = 'meals';

export type Meal = {
    id : string,
    name : string,
    calories : number,
    protein : number,
    carbs : number,
    fats : number,
    createdAt : string
};


export async function getMeals() : Promise<Meal[]>{
    const data = await AsyncStorage.getItem(MEALS_KEY);
    return data ? JSON.parse(data) : [];
}

export async function addMeal(
    meal : Omit<Meal , 'id' | 'createdAt'>
) : Promise<Meal>
{
    const allMeals = await getMeals();
    const newMeal : Meal = {
        ...meal,
        id : Date.now().toString(),
        createdAt : new Date().toISOString()
    };

    await AsyncStorage.setItem(MEALS_KEY , JSON.stringify([newMeal, ...allMeals]));
    return newMeal;
}