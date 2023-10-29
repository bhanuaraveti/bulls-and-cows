import { StyleSheet, Text, View } from "react-native";

export const Title = () => {
    return (
        <View style={styles.titleSection}>
            <Text style={styles.title}>Bulls and Cows</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleSection: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: "white",
    },
});