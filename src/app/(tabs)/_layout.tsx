import { colors } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: [
                    styles.tabBar,
                    {
                        height: 64 + insets.bottom,
                        paddingBottom: Math.max(insets.bottom, 8),
                    },
                ],
                tabBarItemStyle: styles.tabItem,
                tabBarLabelStyle: styles.tabLabel,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Today',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="add-meal"
                options={{
                    title: 'Add meal',
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.addButton, focused && styles.addButtonFocused]}>
                            <Ionicons name="add" size={28} color={colors.primaryDark} />
                        </View>
                    ),
                    tabBarLabelStyle: styles.hiddenLabel,
                }}
            />
            <Tabs.Screen
                name="all-meals"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={22} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        paddingTop: 8,
        paddingHorizontal: 22,
        backgroundColor: colors.surfaceElevated,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        elevation: 0,
    },
    tabItem: { paddingTop: 2 },
    tabLabel: { fontSize: 10, fontWeight: '700', marginTop: 3 },
    addButton: { width: 52, height: 52, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: -18, borderWidth: 4, borderColor: colors.background },
    addButtonFocused: { transform: [{ scale: 1.04 }] },
    hiddenLabel: { display: 'none' },
});
