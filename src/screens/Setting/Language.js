import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Language = () => {

  return (
    <SafeAreaView style={styles.item}>
      <Text style={styles.itemText}>English (US)</Text>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between left and right content
    alignItems: 'center', // Aligns the content vertically
    paddingVertical: 15, // Vertical padding inside the container
    borderBottomWidth: 1, // Border thickness if 0 no border 
    borderBottomColor: '#131313', // Border color
    width: '85%', // Width of the container
    marginTop: 30, // Top margin for spacing around the container
    marginBottom: 20, // Bottom margin for spacing
    marginLeft: 30, // Left margin for spacing
    marginRight: 20, // Right margin for spacing
  },
  itemText: {
    fontSize: 16, // Font size
    color: '#000', // Text color
    textAlign: 'left', // Text alignment inside the container
  },
});

export default Language;