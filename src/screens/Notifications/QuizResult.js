import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import BlackCircle from '../../images/BlackCircle';
import CorrectSign from '../../images/Correct';
import { useNavigation, useRoute } from '@react-navigation/native';


const QuizResult = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { score } = route.params; // Retrieve score from route params
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.yourResults}>Your results</Text>
      <Text style={styles.resultText}>{score}/5</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  <BlackCircle style={styles.circleContainer} />
  <CorrectSign
    style={{
      position: 'absolute',
    }}
    width={150}
    height={350}
  />
</View>
      <Text style={styles.feedbackText}>Great Job!</Text>
      <TouchableOpacity style={styles.doneButton} onPress={()=>{navigation.navigate('Notifications')}}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  yourResults: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 40,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  circleContainer: {
    width: 275,
    height: 275,
    justifyContent: 'center',
    alignItems: 'center',

  },
  feedbackText: {
    fontSize: 30,
    fontWeight: "500",
    color: '#000',
    marginTop: 40,
  },
  doneButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    height: 55,
    width:339,
    justifyContent:"center",
    alignContent:"center",
    marginTop:90

  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign:'center'
  },
});

export default QuizResult;
