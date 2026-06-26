import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";
import MealItem from "./MealItem";

export default function RecentMeals() {
    return (
        <View style={{ marginTop: 30 }}>
            <Text style={globalStyles.sectionTitle}> Recent Meals </Text>
            <MealItem
                name='Panner Paratha'
                calories={240}
                protein={20}
                carbs={50}
                fats={12} />
            <MealItem
                name='Chicken & Rice'
                calories={540}
                protein={45}
                carbs={50}
                fats={12}
            />
            <MealItem
                name='Protein Shake'
                calories={280}
                protein={30}
                carbs={20}
                fats={8}
            />
            <MealItem
                name='Salmon Salad'
                calories={430}
                protein={35}
                carbs={10}
                fats={25}
            />
        </View>
    );
}