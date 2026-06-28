import MealItem from '@/components/MealItem';
import { clearMeals, getMeals, Meal } from '@/storage/meals';
import { colors, globalStyles } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AllMealsScreen() {
    const [meals, setMeals] = useState<Meal[]>([]);

    const loadMeals = useCallback(async () => {
        setMeals(await getMeals());
    }, []);

    function handleClearAll() {
        Alert.alert('Delete all meals?', 'This will permanently clear your meal history.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete all', style: 'destructive', onPress: async () => { await clearMeals(); await loadMeals(); } },
        ]);
    }

    useFocusEffect(useCallback(() => { loadMeals(); }, [loadMeals]));

    return (
        <SafeAreaView style={globalStyles.container} edges={['top']}>
            <ScrollView contentContainerStyle={globalStyles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={globalStyles.eyebrow}>Your history</Text>
                        <Text style={globalStyles.title}>All meals</Text>
                        <Text style={[globalStyles.subtitle, styles.count]}>
                            {meals.length} {meals.length === 1 ? 'meal' : 'meals'} logged
                        </Text>
                    </View>
                    {meals.length > 0 && (
                        <Pressable
                            accessibilityLabel="Delete all meals"
                            hitSlop={8}
                            onPress={handleClearAll}
                            style={({ pressed }) => [styles.trashButton, pressed && styles.pressed]}
                        >
                            <Ionicons name="trash-outline" size={20} color={colors.alert} />
                        </Pressable>
                    )}
                </View>

                <View style={styles.list}>
                    {meals.length === 0 ? (
                        <View style={styles.emptyCard}>
                            <View style={styles.emptyIcon}>
                                <Ionicons name="receipt-outline" size={26} color={colors.primary} />
                            </View>
                            <Text style={styles.emptyTitle}>Nothing here yet</Text>
                            <Text style={[globalStyles.empty, styles.emptyText]}>Meals you log will collect here as your nutrition history.</Text>
                        </View>
                    ) : (
                        meals.map((meal) => <MealItem key={meal.id} {...meal} onDelete={loadMeals} />)
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
    count: { marginTop: 7 },
    trashButton: { width: 46, height: 46, borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
    pressed: { opacity: 0.65 },
    list: { marginTop: 28 },
    emptyCard: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 24, padding: 32, borderWidth: 1, borderColor: colors.border },
    emptyIcon: { width: 56, height: 56, borderRadius: 18, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
    emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 6 },
    emptyText: { maxWidth: 240, textAlign: 'center' },
});
