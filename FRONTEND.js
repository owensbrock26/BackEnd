import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function EmailPassword({ route, navigation }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Destructure the parameters passed from GoalPossibilityScreen.js
  const { age, gender, name, goal, hear, socialMedia, affiliateCode } = route.params;

  const handleNext = () => {
    if (!username || !password) {
      setErrorMessage("Username and password must be filled");
      console.log(errorMessage);
    } else {
      setErrorMessage("");

      // Send a POST request to the backend
      fetch('http://localhost:3000/workouts/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: age,
          gender: gender,
          name: name,
          goal: goal,
          hear: hear,
          socialMedia: socialMedia,
          affiliateCode: affiliateCode,
          username: username,
          password: password,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(data.message);  // Logs 'User signed up!'
          navigation.navigate('CalorieTrackerLogic');
        } else {
          setErrorMessage(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Done</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="username"
          style={styles.input}
          placeholderTextColor="white"
          onChangeText={setUsername}
          value={username || ''}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="white"
          onChangeText={setPassword}
          value={password || ''}
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#17181a",
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "#232526",
    padding: 10,
    height: 50,
    width: 100,
  },
  backButtonText: {
    color: "white",
  },
  nextButton: {
    backgroundColor: "#232526",
    padding: 10,
    height: 50,
    width: 100,
  },
  nextButtonText: {
    color: "white",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: "0",
  },
  input: {
    height: 40,
    backgroundColor: "#232526", // Set the background color
    color: "white", // Set the text color
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    placeholderTextColor: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#232526",
    borderRadius: 20,
    padding: 20,
    width: "80%",
  },
  option: {
    padding: 10,
  },
  optionText: {
    color: "white",
  },
  errorText: {
    color: 'red',
  },
});