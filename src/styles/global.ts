import { StyleSheet } from 'react-native';

export const colors = {
    background: '#0C100E',
    surface: '#161C18',
    surfaceElevated: '#1D2520',
    surfaceSoft: '#222B25',
    border: '#2B352E',
    primary: '#B7F34D',
    primaryDark: '#17210D',
    text: '#F5F7F2',
    textSecondary: '#9DA89F',
    textMuted: '#69746C',
    protein: '#72D7FF',
    carbs: '#FFB866',
    fats: '#E69CFF',
    alert: '#FF7B72',
};

export const spacing = {
    screen: 20,
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: spacing.screen,
        paddingTop: 14,
        paddingBottom: 120,
    },
    eyebrow: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.4,
        textTransform: 'uppercase',
    },
    title: {
        color: colors.text,
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -1,
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 15,
        lineHeight: 22,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 19,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    empty: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
