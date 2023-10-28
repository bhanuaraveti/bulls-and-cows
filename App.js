// App.js

import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// Function to generate a random 4-letter key
const generateRandomKey = () => {
  const characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
  let key = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.pop(randomIndex);
  }
  return key;
};

export default function App() {
  const [key, setKey] = useState(generateRandomKey());
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(`Bulls: 0, Cows: 0`);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([]); // [ { guess: 'ABCD', feedback: 'Bulls: 2, Cows: 1' }, ...

  // Function to handle the "Reset" button
  const handleReset = () => {
    setKey(generateRandomKey());
    setGuess("");
    setAttempts(0);
    setFeedback(`Bulls: 0, Cows: 0`);
    setGameOver(false);
    setHistory([]);
  };

  // Function to handle the "Submit Guess" button
  const handleGuess = () => {
    if (guess.length !== 4 || !/^[A-Z]{4}$/.test(guess)) {
      setFeedback("Invalid guess. Please enter a 4-letter word in uppercase.");
      return;
    }

    let bulls = 0;
    let cows = 0;

    console.log("key", key);
    for (let i = 0; i < 4; i++) {
      if (guess[i] === key[i]) {
        bulls++;
      } else if (key.includes(guess[i])) {
        cows++;
      }
    }

    setAttempts(attempts + 1);

    if (bulls === 4) {
      setFeedback(
        `Congratulations! You guessed the key in ${attempts + 1} attempts.`
      );
      setGameOver(true);
    } else {
      setFeedback(`Bulls: ${bulls}, Cows: ${cows}`);
      setHistory((currentHistory) => [...currentHistory, { guess, feedback: `Bulls: ${bulls}, Cows: ${cows}`, id: (history.length+1).toString() }]);
    }
  };

  return gameOver ? (
    <View style={styles.appContainer}>
      <View style={styles.congratulationsSection}>
        <Text style={styles.congratulationText}>Congratulations!</Text>
        <Text style={styles.congratulationText}>You guessed the key in {attempts} attempts.</Text>
        <Button title="Play Again" onPress={handleReset} color="#b180f0"/>
      </View>
    </View>
  ) : (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Bulls and Cows</Text>
      </View>

      <View style={styles.resetSection}>
        <Text style={styles.attemptText}>Attempts: {attempts}</Text>
        <Button title="Reset" onPress={handleReset} color="#f31282" />
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setGuess(text)}
          value={guess}
          maxLength={4}
        />
        <Button title="Submit Guess" onPress={handleGuess} color="#b180f0" />
      </View>

      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackText}>{feedback}</Text>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Guesses</Text>
        <FlatList data={history} renderItem={itemData => {
          return (
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>
                {itemData.item.id}                         {itemData.item.guess} - {itemData.item.feedback}
              </Text>
            </View>
          )
        }}
        keyExtractor={(item, index)=>{
          return item.id;
        }} 
        alwaysBounceVertical={false} />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
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
  historySection: {
    flex: 15,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  historyTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
    color: "white",
  },
  historyItem: {
    margin: 2,
    padding: 4,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  historyText: {
    color: "white",
    textAlign: "left",
  },
  congratulationsSection: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  congratulationText: {
    fontSize: 24,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
});
