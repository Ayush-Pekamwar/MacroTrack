import { colors, globalStyles } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeHeader() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });

    return (
        <View style={styles.header}>
            <View>
                <Text style={globalStyles.eyebrow}>Daily overview</Text>
                <Text style={globalStyles.title}>MacroTrack</Text>
                <View style={styles.dateRow}>
                    <Ionicons name="calendar-clear-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.date}>{currentDate}</Text>
                </View>
            </View>
            <View style={styles.avatar}>
                <Ionicons name="leaf" size={22} color={colors.primary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 8,
    },
    date: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: colors.surfaceElevated,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
});
