import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator , SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontFamily, Color, Border, FontSize } from '../../utils/GlobalStyles'
import { useNavigation, useRoute } from '@react-navigation/native';
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);  // State to track selected option
  const currentQuestion = questions[currentQuestionIndex];
  const [answerSelected, setAnswerSelected] = useState(false);  // New state to track if an answer was selected
  const navigation=useNavigation();
  const fetchQuestions = async () => {
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "user", "content": "Generate 5 general multiple-choice questions about cyber security with 4 short options and the correct answer." }
      ],
      max_tokens: 400,
      temperature: 0.7,
    };

    try {
      const responseData = await fetch(endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!responseData.ok) {
        throw new Error(`Error fetching questions: ${responseData.statusText}`);
      }

      const data = await responseData.json();

      if (data.choices && data.choices[0] && data.choices[0].message) {
        const content = data.choices[0].message.content;

        const questions = content.split('\n\n').map(item => {
          const lines = item.split('\n');
          const question = lines[0].replace(/^\d+\.\s/, '');
          const options = lines.slice(1, 5).map(line => line.replace(/^[A-D]\.\s/, ''));
          const correctAnswer = lines[5].split(': ')[1].trim().replace(/^[A-D]\.\s/, '');
          return { question, options, correctAnswer };
        });

        return questions;
      } else {
        throw new Error('Questions data is missing or malformed');
      }
    } catch (error) {
      console.error('Error fetching questions:', error.message);
      return [];
    }
  };

  const handleOptionPress = (selected) => {
    setSelectedOption(selected); // Set the selected option
    setAnswerSelected(true); // Set answerSelected to true after selecting an answer
  };

  const handleNextPress = () => {
    const correctAnswer = currentQuestion.correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1); // Increase score if the answer is correct
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setAnswerSelected(false);  // Reset the answerSelected state for the next question
      setSelectedOption(null);  // Reset the selected option for the next question
    } else {
      console.log("Final Score",score)
      navigation.navigate('QuizResult', { score: score});
      console.log('Quiz Finished');
    }
  };
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No questions available. Please try again later.</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#F1F0F0', '#F1EEEE', '#F0EAEA', '#F0E5E5', '#F0E5E6']} // Gradual shades of light gray
      locations={[0, 0.25, 0.5, 0.75, 1]} // Control the spread of each color
      start={{ x: 0.5, y: 0.5 }} // Center of the gradient
      end={{ x: 1, y: 1 }} // Gradual fade
      style={styles.container}
    >
      <SafeAreaView >
        <Text style={styles.question}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, selectedOption === option && styles.selectedOption]}  // Apply highlight style if selected
            onPress={() => handleOptionPress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        {answerSelected && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextPress}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </LinearGradient>  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedOption: {
    backgroundColor: '#D1D1D1', // Highlight selected option with a soft gray color
  },
  question: {
    fontSize: 16, // Slightly smaller for better readability
    textAlign: "left",
    color: "#131313", // Darker color
    lineHeight: 24, // Adding spacing between lines
    marginBottom: 60,
    fontWeight: "500", // Medium weight for emphasis
    left: 30,
    marginTop: 30,
    width: 324,
  },
  optionButton: {
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 61,
    width: 339,
    marginLeft: 30,
    marginVertical: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 14, // Slightly smaller for better readability
    fontWeight: "500",
    color: "#131313",
    textAlign: "left",
    lineHeight: 20, // Adding spacing between lines
    marginTop:15,
    marginLeft:25
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    marginTop:60,
    marginLeft:30,
backgroundColor: "#131313",
width: 339,
height: 55
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign:"center",
    marginTop:18
  },

});

export default Quiz;
