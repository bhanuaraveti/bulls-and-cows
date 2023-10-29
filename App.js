// App.js

import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { Success } from "./components/Success";
import { Title } from "./components/Title";
import { Reset } from "./components/Reset";
import { Input } from "./components/Input";
import { Feedback } from "./components/Feedback";
import { History } from "./components/History";

// Function to generate a random 4-letter key
const generateRandomKey = () => {
  const characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
  let key = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.splice(randomIndex, 1);
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
      <Success attempts={attempts} handleReset={handleReset} gameOver={gameOver} />
    </View>
  ) : (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Title />
      <Reset attempts={attempts} handleReset={handleReset} />
      <Input handleGuess={handleGuess} guess={guess} setGuess={setGuess} />
      <Feedback feedback={feedback} />
      <History history={history} />
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
  }
});
