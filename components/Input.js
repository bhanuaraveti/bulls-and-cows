import { View, TextInput, Button, StyleSheet } from "react-native";

export const Input = (props) => {
    return (
        <View style={styles.inputSection}>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => props.setGuess(text)}
                value={props.guess}
                maxLength={4}
            />
            <Button title="Submit Guess" onPress={props.handleGuess} color="#b180f0" />
        </View>
    );
}

const styles = StyleSheet.create({
    inputSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingBottom: 24,
        // borderBottomWidth: 1,
        // borderBottomColor: "#cccccc",
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#e4d0ff",
        backgroundColor: "#e4d0ff",
        color: "#120438",
        width: "60%",
        marginRight: 10,
        padding: 10,
    },
});