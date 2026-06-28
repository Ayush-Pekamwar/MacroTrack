import { Meal } from '@/storage/meals';
import { GoalValues } from '@/storage/goals';
import { colors } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import MacroCard from './MacroCard';

type MacroGridProps = {
    meals: Meal[];
    goal: GoalValues;
};

export default function MacroGrid({ meals, goal }: MacroGridProps) {
    const today = new Date().toLocaleDateString('en-CA');
    const total = meals
        .filter((meal) => meal.date === today)
        .reduce(
            (sum, meal) => ({
                calories: sum.calories + meal.calories,
                protein: sum.protein + meal.protein,
                carbs: sum.carbs + meal.carbs,
                fats: sum.fats + meal.fats,
            }),
            { calories: 0, protein: 0, carbs: 0, fats: 0 }
        );
    const calorieProgress = Math.min(total.calories / goal.calories, 1);

    return (
        <View>
            <View style={styles.hero}>
                <View style={styles.heroTop}>
                    <View>
                        <Text style={styles.heroLabel}>Calories today</Text>
                        <View style={styles.calorieRow}>
                            <Text style={styles.calorieValue}>{total.calories.toLocaleString()}</Text>
                            <Text style={styles.calorieGoal}> / {goal.calories.toLocaleString()} kcal</Text>
                        </View>
                    </View>
                    <View style={styles.flameBadge}>
                        <Ionicons name="flame" size={20} color={colors.primary} />
                    </View>
                </View>
                <View style={styles.heroTrack}>
                    <View style={[styles.heroFill, { width: `${calorieProgress * 100}%` }]} />
                </View>
                <Text style={styles.remaining}>
                    {Math.max(goal.calories - total.calories, 0).toLocaleString()} kcal remaining
                </Text>
            </View>

            <View style={styles.grid}>
                <MacroCard label="Protein" value={total.protein} goal={goal.protein} color={colors.protein} />
                <MacroCard label="Carbs" value={total.carbs} goal={goal.carbs} color={colors.carbs} />
                <MacroCard label="Fats" value={total.fats} goal={goal.fats} color={colors.fats} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hero: {
        backgroundColor: colors.primary,
        borderRadius: 26,
        padding: 20,
    },
    heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    heroLabel: { color: '#34431E', fontSize: 13, fontWeight: '700' },
    calorieRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 4 },
    calorieValue: { color: '#11180B', fontSize: 36, fontWeight: '900', letterSpacing: -1.5 },
    calorieGoal: { color: '#425524', fontSize: 13, fontWeight: '600' },
    flameBadge: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#18210F', alignItems: 'center', justifyContent: 'center' },
    heroTrack: { height: 7, backgroundColor: '#96CA3B', borderRadius: 4, marginTop: 18, overflow: 'hidden' },
    heroFill: { height: '100%', borderRadius: 4, backgroundColor: '#17210D' },
    remaining: { color: '#425524', fontSize: 12, fontWeight: '700', marginTop: 9 },
    grid: { flexDirection: 'row', gap: 10, marginTop: 12 },
});
