import { addMeal } from '@/storage/meals';
import { colors, globalStyles } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NutrientFieldProps = {
    label: string;
    unit: string;
    value: string;
    color: string;
    onChangeText: (value: string) => void;
};

function NutrientField({ label, unit, value, color, onChangeText }: NutrientFieldProps) {
    const [focused, setFocused] = useState(false);

    return (
        <View style={[styles.nutrientField, focused && { borderColor: color }]}>
            <View style={[styles.nutrientDot, { backgroundColor: color }]} />
            <Text style={styles.nutrientLabel}>{label}</Text>
            <View style={styles.nutrientInputRow}>
                <TextInput
                    style={styles.nutrientInput}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={colors.textMuted}
                    returnKeyType="done"
                />
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
    );
}

export default function AddMealScreen() {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');

    const [nameFocused, setNameFocused] = useState(false);
    const [saving, setSaving] = useState(false);

    const canSave = name.trim().length > 0 && Number(calories) > 0 && !saving;

    function resetForm() {
        setName('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFats('');
        setNameFocused(false);
        setSaving(false);
    }

    async function handleAddMeal() {
        if (!canSave) {
            Alert.alert('Almost there', 'Add a meal name and a calorie amount greater than zero.');
            return;
        }

        try {
            setSaving(true);
            await addMeal({
                name: name.trim(),
                calories: Number(calories),
                protein: Number(protein) || 0,
                carbs: Number(carbs) || 0,
                fats: Number(fats) || 0,
            });
            resetForm();
            router.replace('/');
        } catch {
            Alert.alert(`Couldn't save meal', 'Please try again in a moment.`);
            setSaving(false);
        }
    }

    return (
        <SafeAreaView style={globalStyles.container} edges={['top']}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={globalStyles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Text style={globalStyles.eyebrow}>Quick log</Text>
                        <Text style={globalStyles.title}>Add a meal</Text>
                        <Text style={[globalStyles.subtitle, styles.subtitle]}>
                            Capture what you ate. You can keep it simple or add the full macro split.
                        </Text>
                    </View>

                    <Text style={styles.sectionLabel}>Meal details</Text>
                    <View style={[styles.nameField, nameFocused && styles.nameFieldFocused]}>
                        <View style={styles.fieldIcon}>
                            <Ionicons name="restaurant-outline" size={20} color={nameFocused ? colors.primary : colors.textSecondary} />
                        </View>
                        <View style={styles.nameInputWrap}>
                            <Text style={styles.inputLabel}>Meal name</Text>
                            <TextInput
                                style={styles.nameInput}
                                placeholder="e.g. Rice bowl"
                                placeholderTextColor={colors.textMuted}
                                value={name}
                                onChangeText={setName}
                                onFocus={() => setNameFocused(true)}
                                onBlur={() => setNameFocused(false)}
                                returnKeyType="next"
                            />
                        </View>
                    </View>

                    <Text style={[styles.sectionLabel, styles.nutritionLabel]}>Nutrition</Text>
                    <View style={styles.calorieField}>
                        <View>
                            <Text style={styles.calorieLabel}>Total calories</Text>
                            <Text style={styles.calorieHint}>Required</Text>
                        </View>
                        <View style={styles.calorieInputRow}>
                            <TextInput
                                style={styles.calorieInput}
                                placeholder="0"
                                placeholderTextColor={colors.textMuted}
                                keyboardType="decimal-pad"
                                value={calories}
                                onChangeText={setCalories}
                                returnKeyType="done"
                            />
                            <Text style={styles.kcal}>kcal</Text>
                        </View>
                    </View>

                    <View style={styles.nutrientRow}>
                        <NutrientField label="Protein" unit="g" value={protein} color={colors.protein} onChangeText={setProtein} />
                        <NutrientField label="Carbs" unit="g" value={carbs} color={colors.carbs} onChangeText={setCarbs} />
                        <NutrientField label="Fats" unit="g" value={fats} color={colors.fats} onChangeText={setFats} />
                    </View>

                    <View style={styles.tip}>
                        <Ionicons name="bulb-outline" size={18} color={colors.primary} />
                        <Text style={styles.tipText}>No macro details? That’s okay—calories alone are enough to save.</Text>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        disabled={!canSave}
                        onPress={handleAddMeal}
                        style={({ pressed }) => [
                            styles.button,
                            !canSave && styles.buttonDisabled,
                            pressed && canSave && styles.buttonPressed,
                        ]}
                    >
                        <Ionicons name={saving ? 'hourglass-outline' : 'add'} size={21} color={colors.primaryDark} />
                        <Text style={styles.buttonText}>{saving ? 'Saving…' : 'Add to today'}</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    header: { marginBottom: 30 },
    subtitle: { marginTop: 10, maxWidth: 340 },
    sectionLabel: { color: colors.textSecondary, fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 },
    nutritionLabel: { marginTop: 26 },
    nameField: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 14 },
    nameFieldFocused: { borderColor: colors.primary },
    fieldIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.surfaceSoft, alignItems: 'center', justifyContent: 'center' },
    nameInputWrap: { flex: 1, marginLeft: 12 },
    inputLabel: { color: colors.textSecondary, fontSize: 11, fontWeight: '600' },
    nameInput: { color: colors.text, fontSize: 16, fontWeight: '600', paddingVertical: 3, marginTop: 2 },
    calorieField: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surfaceElevated, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: colors.border },
    calorieLabel: { color: colors.text, fontSize: 15, fontWeight: '700' },
    calorieHint: { color: colors.primary, fontSize: 11, fontWeight: '600', marginTop: 4 },
    calorieInputRow: { flexDirection: 'row', alignItems: 'baseline' },
    calorieInput: { minWidth: 70, color: colors.text, fontSize: 28, fontWeight: '800', textAlign: 'right', paddingVertical: 0 },
    kcal: { color: colors.textSecondary, fontSize: 12, marginLeft: 5 },
    nutrientRow: { flexDirection: 'row', gap: 9, marginTop: 10 },
    nutrientField: { flex: 1, backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 13 },
    nutrientDot: { width: 7, height: 7, borderRadius: 4, marginBottom: 8 },
    nutrientLabel: { color: colors.textSecondary, fontSize: 11, fontWeight: '600' },
    nutrientInputRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 4 },
    nutrientInput: { flex: 1, color: colors.text, fontSize: 21, fontWeight: '800', paddingVertical: 0 },
    unit: { color: colors.textMuted, fontSize: 11 },
    tip: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 22, paddingHorizontal: 4 },
    tipText: { flex: 1, color: colors.textSecondary, fontSize: 12, lineHeight: 17 },
    button: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.primary, borderRadius: 18, marginTop: 28 },
    buttonDisabled: { opacity: 0.35 },
    buttonPressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
    buttonText: { color: colors.primaryDark, fontSize: 16, fontWeight: '800' },
});
