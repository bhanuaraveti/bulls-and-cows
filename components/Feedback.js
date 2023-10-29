import { StyleSheet, Text, View } from "react-native";

export const Feedback = (props) => {
    return (
        <View style={styles.feedbackSection}>
            <Text style={styles.feedbackText}>{props.feedback}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    feedbackSection: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 16,
        marginTop: 12,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    feedbackText: {
        color: "white",
    },
});