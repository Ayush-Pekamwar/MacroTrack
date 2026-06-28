import { colors } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';

type MacroCardProps = {
    label: string;
    value: number;
    goal: number;
    color: string;
};

export default function MacroCard({ label, value, goal, color }: MacroCardProps) {
    const progress = Math.min(value / goal, 1);

    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <View style={[styles.dot, { backgroundColor: color }]} />
                <Text style={styles.label}>{label}</Text>
            </View>
            <View style={styles.valueRow}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.unit}>g</Text>
            </View>
            <View style={styles.track}>
                <View style={[styles.fill, { backgroundColor: color, width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.goal}>{Math.max(goal - value, 0)}g left</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: 96,
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
    topRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    dot: { width: 7, height: 7, borderRadius: 4 },
    label: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
    valueRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 12 },
    value: { color: colors.text, fontSize: 24, fontWeight: '800', letterSpacing: -0.8 },
    unit: { color: colors.textSecondary, fontSize: 12, marginLeft: 2 },
    track: { height: 4, backgroundColor: colors.surfaceSoft, borderRadius: 2, marginTop: 12, overflow: 'hidden' },
    fill: { height: '100%', borderRadius: 2 },
    goal: { color: colors.textMuted, fontSize: 10, fontWeight: '600', marginTop: 8 },
});
