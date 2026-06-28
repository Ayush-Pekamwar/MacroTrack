import HomeHeader from '@/components/HomeHeader';
import MacroGrid from '@/components/MacroGrid';
import RecentMeals from '@/components/RecentMeals';
import SetGoal, { GoalValues } from '@/components/SetGoal';
import { getMeals, Meal } from '@/storage/meals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [goal, setGoal] = useState<GoalValues>({
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65,
    });

    const loadMeals = useCallback(async () => {
        setMeals(await getMeals());
    }, []);

    useFocusEffect(useCallback(() => { loadMeals(); }, [loadMeals]));

    return (
        <SafeAreaView style={globalStyles.container} edges={['top']}>
            <ScrollView contentContainerStyle={globalStyles.content} showsVerticalScrollIndicator={false}>
                <HomeHeader />
                <SetGoal goal={goal} setGoal={setGoal} />
                <MacroGrid meals={meals} goal={goal} />
                <RecentMeals meals={meals} onDelete={loadMeals} />
            </ScrollView>
        </SafeAreaView>
    );
}
