import { Meal } from '@/storage/meals';
import { colors, globalStyles } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MealItem from './MealItem';

type RecentMealProps = { meals: Meal[]; onDelete: () => void };

export default function RecentMeals({ meals, onDelete }: RecentMealProps) {
    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={globalStyles.sectionTitle}>Recent meals</Text>
                {meals.length > 0 && (
                    <Link href="/(tabs)/all-meals" asChild>
                        <Pressable hitSlop={10} style={styles.link}>
                            <Text style={styles.linkText}>See all</Text>
                            <Ionicons name="arrow-forward" size={14} color={colors.primary} />
                        </Pressable>
                    </Link>
                )}
            </View>
            {meals.length === 0 ? (
                <View style={styles.emptyCard}>
                    <View style={styles.emptyIcon}>
                        <Ionicons name="sparkles-outline" size={22} color={colors.primary} />
                    </View>
                    <Text style={styles.emptyTitle}>Your log is ready</Text>
                    <Text style={globalStyles.empty}>Add your first meal and your daily nutrition will appear here.</Text>
                </View>
            ) : (
                meals.slice(0, 5).map((meal) => (
                    <MealItem key={meal.id} {...meal} onDelete={onDelete} />
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    section: { marginTop: 28 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    link: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    linkText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
    emptyCard: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 24 },
    emptyIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 5 },
});
