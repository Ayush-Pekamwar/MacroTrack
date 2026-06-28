import AsyncStorage from '@react-native-async-storage/async-storage';

export type GoalValues = {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
};

const GOALS_KEY = 'macro-goals';

export const DEFAULT_GOALS: GoalValues = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65,
};

export async function getGoals(): Promise<GoalValues> {
    const storedGoals = await AsyncStorage.getItem(GOALS_KEY);

    return storedGoals
        ? JSON.parse(storedGoals)
        : DEFAULT_GOALS;
}

export async function saveGoals(goal: GoalValues): Promise<void> {
    await AsyncStorage.setItem(GOALS_KEY, JSON.stringify(goal));
}