import { addMeal } from "@/storage/meals";
import { colors, globalStyles } from "@/styles/global";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddMealScreen() {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');


    async function handleAddMeal() {
        if (!name || !calories) {
            Alert.alert('Error', 'Please enter a meal name and calories.');
            return;
        }
        console.log("adding this meal to AsyncStorage: " + { name, calories, protein, carbs, fats });
        const newMeal = {
            name: name,
            calories: Number(calories),
            protein: Number(protein),
            carbs: Number(carbs),
            fats: Number(fats)
        }

        await addMeal(newMeal);
        console.log("meal added successfully");
        Alert.alert("Meal added Successfully");
        
        // resetting values back to empty after adding it to the storage
        setName('') , setCalories(''), setProtein(''), setCarbs(''), setFats('');
        router.replace('/');
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Add Meal</Text>

            <TextInput
                style={styles.input}
                placeholder="Meal name"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder='Calories'
                placeholderTextColor={colors.textSecondary}
                keyboardType='numeric'
                value={calories}
                onChangeText={setCalories}
            />

            <View style={styles.row}>
                <TextInput
                    style={[styles.input, styles.rowInput]}
                    placeholder='Protein (g)'
                    placeholderTextColor={colors.textSecondary}
                    keyboardType='numeric'
                    value={protein}
                    onChangeText={setProtein}
                />
                <TextInput
                    style={[styles.input, styles.rowInput]}
                    placeholder='Carbs (g)'
                    placeholderTextColor={colors.textSecondary}
                    keyboardType='numeric'
                    value={carbs}
                    onChangeText={setCarbs}
                />
                <TextInput
                    style={[styles.input, styles.rowInput]}
                    placeholder='Fat (g)'
                    placeholderTextColor={colors.textSecondary}
                    keyboardType='numeric'
                    value={fats}
                    onChangeText={setFats}
                />
            </View>


            <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
                <Text style={styles.buttonText} >Add meal</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.surface,
        color: colors.text,
        padding: 16,
        borderRadius: 10,
        fontSize: 16,
        marginTop: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    rowInput: {
        flex: 1,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
});