import { deleteMeal } from '@/storage/meals';
import { colors } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

type MealItemProps = {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    onDelete: () => void;
};

export default function MealItem({ id, name, calories, protein, carbs, fats, onDelete }: MealItemProps) {
    const handleLongPress = () => {
        Alert.alert('Delete meal?', `Remove “${name}” from your log?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await deleteMeal(id);
                    onDelete();
                },
            },
        ]);
    };

    return (
        <Pressable
            accessibilityHint="Long press to delete this meal"
            onLongPress={handleLongPress}
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
            <View style={styles.iconWrap}>
                <Ionicons name="restaurant-outline" size={19} color={colors.primary} />
            </View>
            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    <Text style={styles.calories}>{calories} kcal</Text>
                </View>
                <View style={styles.macrosRow}>
                    <Text style={[styles.macro, { color: colors.protein }]}>{protein}g P</Text>
                    <View style={styles.divider} />
                    <Text style={[styles.macro, { color: colors.carbs }]}>{carbs}g C</Text>
                    <View style={styles.divider} />
                    <Text style={[styles.macro, { color: colors.fats }]}>{fats}g F</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 18,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
    iconWrap: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
    content: { flex: 1, marginLeft: 12 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
    name: { flex: 1, color: colors.text, fontSize: 15, fontWeight: '700' },
    calories: { color: colors.text, fontSize: 13, fontWeight: '700' },
    macrosRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 7 },
    macro: { fontSize: 11, fontWeight: '700' },
    divider: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.textMuted },
});
