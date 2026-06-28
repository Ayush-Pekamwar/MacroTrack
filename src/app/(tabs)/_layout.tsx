import { colors } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
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
        height: Platform.OS === 'ios' ? 88 : 72,
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 22 : 9,
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
