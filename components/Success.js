import { View, Text, Button, StyleSheet, Modal } from "react-native";

export const Success = (props) => {
    return (
        <Modal visible={props.gameOver} animationType="fade">
            <View style={styles.congratulationsSection}>
                <Text style={styles.congratulationText}>Congratulations!</Text>
                <Text style={styles.congratulationText}>You guessed the key in {props.attempts} attempts.</Text>
                <Button title="Play Again" onPress={props.handleReset} color="blue" />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    congratulationsSection: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gold",
    },
    congratulationText: {
        fontSize: 24,
        marginBottom: 10,
        color: "#1e085a",
        textAlign: "center",
    },
});


