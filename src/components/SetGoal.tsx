import { GoalValues } from '@/storage/goals';
import { colors } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';


type SetGoalProps = {
    goal: GoalValues;
    setGoal: (goal: GoalValues) => void;
};

type GoalFieldProps = {
    label: string;
    unit: string;
    color: string;
    value: string;
    onChangeText: (value: string) => void;
};

function GoalField({ label, unit, color, value, onChangeText }: GoalFieldProps) {
    const [focused, setFocused] = useState(false);

    return (
        <View style={[styles.field, focused && { borderColor: color }]}>
            <View style={styles.fieldLabelRow}>
                <View style={[styles.dot, { backgroundColor: color }]} />
                <Text style={styles.fieldLabel}>{label}</Text>
            </View>
            <View style={styles.inputRow}>
                <TextInput
                    accessibilityLabel={`${label} goal`}
                    keyboardType="number-pad"
                    maxLength={5}
                    onBlur={() => setFocused(false)}
                    onChangeText={(text) => onChangeText(text.replace(/[^0-9]/g, ''))}
                    onFocus={() => setFocused(true)}
                    placeholder="0"
                    placeholderTextColor={colors.textMuted}
                    selectTextOnFocus
                    style={styles.input}
                    value={value}
                />
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
    );
}

export default function SetGoal({ goal, setGoal }: SetGoalProps) {
    const [visible, setVisible] = useState(false);
    const [draft, setDraft] = useState({
        calories: String(goal.calories),
        protein: String(goal.protein),
        carbs: String(goal.carbs),
        fats: String(goal.fats),
    });

    function openEditor() {
        setDraft({
            calories: String(goal.calories),
            protein: String(goal.protein),
            carbs: String(goal.carbs),
            fats: String(goal.fats),
        });
        setVisible(true);
    }

    function updateDraft(field: keyof GoalValues, value: string) {
        setDraft((current) => ({ ...current, [field]: value }));
    }

    function saveGoal() {
        const nextGoal: GoalValues = {
            calories: Number(draft.calories),
            protein: Number(draft.protein),
            carbs: Number(draft.carbs),
            fats: Number(draft.fats),
        };

        if (Object.values(nextGoal).some((value) => !Number.isFinite(value) || value <= 0)) {
            Alert.alert('Check your targets', 'Each daily target must be greater than zero.');
            return;
        }

        setGoal(nextGoal);
        setVisible(false);
    }

    return (
        <>
            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.eyebrow}>Today’s targets</Text>
                    <Text style={styles.summary}>
                        {goal.calories.toLocaleString()} kcal · {goal.protein}P · {goal.carbs}C · {goal.fats}F
                    </Text>
                </View>
                <Pressable
                    accessibilityLabel="Edit daily macro goals"
                    hitSlop={8}
                    onPress={openEditor}
                    style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
                >
                    <Ionicons name="options-outline" size={16} color={colors.primary} />
                    <Text style={styles.editText}>Adjust</Text>
                </Pressable>
            </View>

            <Modal
                animationType="fade"
                onRequestClose={() => setVisible(false)}
                statusBarTranslucent
                transparent
                visible={visible}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.modalBackdrop}
                >
                    <Pressable style={StyleSheet.absoluteFill} onPress={() => setVisible(false)} />
                    <View style={styles.sheet}>
                        <View style={styles.handle} />
                        <View style={styles.modalHeader}>
                            <View style={styles.iconWrap}>
                                <Ionicons name="flag-outline" size={22} color={colors.primary} />
                            </View>
                            <Pressable
                                accessibilityLabel="Close goal editor"
                                hitSlop={10}
                                onPress={() => setVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={21} color={colors.textSecondary} />
                            </Pressable>
                        </View>

                        <Text style={styles.title}>Set daily goals</Text>
                        <Text style={styles.subtitle}>Choose the targets that fit your nutrition plan. You can update them anytime.</Text>

                        <View style={styles.calorieField}>
                            <View>
                                <Text style={styles.calorieLabel}>Daily calories</Text>
                                <Text style={styles.calorieHint}>Your energy target</Text>
                            </View>
                            <View style={styles.calorieInputRow}>
                                <TextInput
                                    accessibilityLabel="Calorie goal"
                                    keyboardType="number-pad"
                                    maxLength={5}
                                    onChangeText={(text) => updateDraft('calories', text.replace(/[^0-9]/g, ''))}
                                    placeholder="2000"
                                    placeholderTextColor={colors.textMuted}
                                    selectTextOnFocus
                                    style={styles.calorieInput}
                                    value={draft.calories}
                                />
                                <Text style={styles.kcal}>kcal</Text>
                            </View>
                        </View>

                        <View style={styles.macroFields}>
                            <GoalField label="Protein" unit="g" color={colors.protein} value={draft.protein} onChangeText={(value) => updateDraft('protein', value)} />
                            <GoalField label="Carbs" unit="g" color={colors.carbs} value={draft.carbs} onChangeText={(value) => updateDraft('carbs', value)} />
                            <GoalField label="Fats" unit="g" color={colors.fats} value={draft.fats} onChangeText={(value) => updateDraft('fats', value)} />
                        </View>

                        <Pressable
                            accessibilityRole="button"
                            onPress={saveGoal}
                            style={({ pressed }) => [styles.saveButton, pressed && styles.savePressed]}
                        >
                            <Ionicons name="checkmark" size={20} color={colors.primaryDark} />
                            <Text style={styles.saveText}>Save goals</Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    eyebrow: { color: colors.text, fontSize: 16, fontWeight: '700' },
    summary: { color: colors.textSecondary, fontSize: 11, fontWeight: '600', marginTop: 4 },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: colors.primaryDark,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 9,
    },
    editText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
    pressed: { opacity: 0.65 },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
    },
    sheet: {
        backgroundColor: colors.surfaceElevated,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    },
    handle: { alignSelf: 'center', width: 42, height: 4, borderRadius: 2, backgroundColor: colors.border, marginBottom: 16 },
    modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    iconWrap: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
    closeButton: { width: 40, height: 40, borderRadius: 13, backgroundColor: colors.surfaceSoft, alignItems: 'center', justifyContent: 'center' },
    title: { color: colors.text, fontSize: 26, fontWeight: '800', letterSpacing: -0.7, marginTop: 16 },
    subtitle: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 20, maxWidth: 340 },
    calorieField: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 16 },
    calorieLabel: { color: colors.text, fontSize: 14, fontWeight: '700' },
    calorieHint: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
    calorieInputRow: { flexDirection: 'row', alignItems: 'baseline' },
    calorieInput: { minWidth: 70, color: colors.text, fontSize: 25, fontWeight: '800', paddingVertical: 0, textAlign: 'right' },
    kcal: { color: colors.textSecondary, fontSize: 11, marginLeft: 5 },
    macroFields: { flexDirection: 'row', gap: 9, marginTop: 10 },
    field: { flex: 1, backgroundColor: colors.surface, borderRadius: 17, borderWidth: 1, borderColor: colors.border, padding: 12 },
    fieldLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    dot: { width: 7, height: 7, borderRadius: 4 },
    fieldLabel: { color: colors.textSecondary, fontSize: 11, fontWeight: '600' },
    inputRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 7 },
    input: { flex: 1, color: colors.text, fontSize: 20, fontWeight: '800', paddingVertical: 0 },
    unit: { color: colors.textMuted, fontSize: 11 },
    saveButton: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: colors.primary, borderRadius: 17, marginTop: 20 },
    savePressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
    saveText: { color: colors.primaryDark, fontSize: 15, fontWeight: '800' },
});
