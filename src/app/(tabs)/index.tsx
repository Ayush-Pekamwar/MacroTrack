import HomeHeader from '@/components/HomeHeader';
import MacroGrid from '@/components/MacroGrid';
import RecentMeals from '@/components/RecentMeals';
import SetGoal from '@/components/SetGoal';
import { DEFAULT_GOALS, getGoals, GoalValues, saveGoals } from '@/storage/goals';
import { getMeals, Meal } from '@/storage/meals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    // Meals state management for Recent Meals and MacroGrid component
    const [meals, setMeals] = useState<Meal[]>([]);
    const loadMeals = useCallback(async () => {
        setMeals(await getMeals());
    }, []);
    useFocusEffect(useCallback(() => { loadMeals(); }, [loadMeals]));


    // Goals state manangement , loading from local storage and setting it via SetGoal component
    const [goal, setGoal] = useState<GoalValues>(DEFAULT_GOALS);
    useEffect(() => {
        getGoals().then(setGoal);
    }, []);

    async function handleGoalChange(newGoal: GoalValues) {
        //set the current state (goal)
        setGoal(newGoal);
        // saving this newGoal back to Async storage
        await saveGoals(newGoal);
    }


    return (
        <SafeAreaView style={globalStyles.container} edges={['top']}>
            <ScrollView contentContainerStyle={globalStyles.content} showsVerticalScrollIndicator={false}>
                <HomeHeader />
                <SetGoal goal={goal} setGoal={handleGoalChange} />
                <MacroGrid meals={meals} goal={goal} />
                <RecentMeals meals={meals} onDelete={loadMeals} />
            </ScrollView>
        </SafeAreaView>
    );
}
