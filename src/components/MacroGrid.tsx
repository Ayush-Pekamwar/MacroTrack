import { StyleSheet, View } from "react-native";
import MacroCard from "./MacroCard";
import {Meal} from "@/storage/meals"

type MacroGridProps = {
    meals : Meal[] 
}

export default function MacroGrid({meals}:MacroGridProps) {
    // displays today's total calories, uses device's local time to track today's meal
    let total = {
        calories : 0,
        protein : 0, // in gms
        carbs : 0,
        fats : 0
    }

    const todayDate = new Date().toLocaleDateString("en-CA");
    for(let i=0; i<meals.length; i++){
        if(meals[i].date == todayDate){
            total.calories += meals[i].calories;
            total.protein += meals[i].protein;
            total.carbs += meals[i].carbs;
            total.fats += meals[i].fats;
        }
    }

    return (
        <View style={styles.grid}>
            <MacroCard label='Calories' value={String(total.calories)} goal='2,000' color='#ff6b6b' />
            <MacroCard label='Protein' value={String(total.protein) + 'g'} goal='150g' color='#4ecdc4' />
            <MacroCard label='Carbs' value={String(total.carbs) + 'g'} goal='250g' color='#6bcb77' />
            <MacroCard label='Fats' value={String(total.fats) + 'g'} goal='65g' color='#ffd93d' />
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    }
});