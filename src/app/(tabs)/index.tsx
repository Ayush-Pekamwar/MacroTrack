import HomeHeader from "@/components/HomeHeader";
import MacroGrid from "@/components/MacroGrid";
import RecentMeals from "@/components/RecentMeals";
import { getMeals, Meal } from "@/storage/meals";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";


export default function Homescreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMeals() {
    const data = await getMeals();
    setMeals(data);
    console.log("Loaded Meals : ", data);
  }

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [])
  );

  return (
    <ScrollView style={globalStyles.container}>

      <Text style={globalStyles.title}>MacroTrack</Text>
      <HomeHeader />
      <MacroGrid />
      <RecentMeals meals={meals} />

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

