import HomeHeader from '@/components/HomeHeader';
import MacroGrid from '@/components/MacroGrid';
import RecentMeals from '@/components/RecentMeals';
import { getMeals, Meal } from '@/storage/meals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const [meals, setMeals] = useState<Meal[]>([]);

    const loadMeals = useCallback(async () => {
        setMeals(await getMeals());
    }, []);

    useFocusEffect(useCallback(() => { loadMeals(); }, [loadMeals]));

    return (
        <SafeAreaView style={globalStyles.container} edges={['top']}>
            <ScrollView contentContainerStyle={globalStyles.content} showsVerticalScrollIndicator={false}>
                <HomeHeader />
                <MacroGrid meals={meals} />
                <RecentMeals meals={meals} onDelete={loadMeals} />
            </ScrollView>
        </SafeAreaView>
    );
}
