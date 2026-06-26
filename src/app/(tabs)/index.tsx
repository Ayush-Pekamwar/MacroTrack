import HomeHeader from "@/components/HomeHeader";
import MacroGrid from "@/components/MacroGrid";
import RecentMeals from "@/components/RecentMeals";
import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";


export default function Homescreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroTrack</Text>
      <HomeHeader />

      <MacroGrid />

      <Link href='./meals' style={globalStyles.linkText}>
        Go to Meals
      </Link>

      <Link href='./add-meal' style={globalStyles.linkText}>
        Add new meal
      </Link>

      <RecentMeals />

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    color: '#a0a0b0',
    marginTop: 4,
    marginBottom: 30,
  },
});

