import { Button, StyleSheet, Text, View } from "react-native";

export const Reset = (props) => {
    return (
        <View style={styles.resetSection}>
            <Text style={styles.attemptText}>Attempts: {props.attempts}</Text>
            <Button title="Reset" onPress={props.handleReset} color="#f31282" />
        </View>
    );
}

const styles = StyleSheet.create({
    resetSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    attemptText: {
        fontSize: 12,
        width: "70%",
        justifyContent: "center",
        paddingTop: 15,
        paddingLeft: 70,
        color: "white",
    },
});