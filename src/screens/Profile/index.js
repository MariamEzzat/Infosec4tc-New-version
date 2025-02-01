import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { FontFamily, Color, Border } from '../../utils/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import { useUser } from '../../../UserContext'
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const profile = () => {

  // const { username, setUsername } = useUser(); 
  const [articles, setArticles] = useState(0);
  const [courses, setCourses] = useState(0);
  const [tests, setTests] = useState(0);
  const [points, setPoints] = useState(0);
  const [highlightedBadge, setHighlightedBadge] = useState('Quiz Master');
  const [badgesCount, setBagdesCount] = useState(0);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) {
      console.log("No authenticated user found");
      return;
    }

    const userRef = firestore().collection('users-progress').doc(user.uid);

    // Real-time listener using onSnapshot
    const unsubscribe = userRef.onSnapshot(async (doc) => {
      if (doc.exists) {
        const dataDoc = doc.data();
        const badges = dataDoc.badges || [];

        // Update local state
        setArticles(dataDoc.articles);
        setTests(dataDoc.tests);
        setCourses(dataDoc.courses);
        setPoints(dataDoc.points);
        setBagdesCount(dataDoc.badges.length)
        console.log("Fetched user data:", dataDoc); // Log to ensure data is correct

        let newBadges = []; // Array to hold new badges

        if (dataDoc.articles >= 20 && !badges.includes('Quiz Master')) {
          newBadges.push('Quiz Master');
        }
        if (dataDoc.articles >= 20 && !badges.includes('Knowledge Seeker')) {
          newBadges.push('Knowledge Seeker');
        }
        if (dataDoc.courses >= 4 && !badges.includes('Video Buff')) {
          newBadges.push('Video Buff');
        }

        // Log new badges
        console.log("New badges to unlock:", newBadges);

        // If new badges are earned, update Firestore with the new badges
        if (newBadges.length > 0) {
          await userRef.update({
            badges: firestore.FieldValue.arrayUnion(...newBadges), // Add new badges to Firestore
          });
          console.log(`New badges unlocked: ${newBadges.join(', ')}`);
        } else {
          console.log("No new badges unlocked."); // If no new badges were added
        }


        // Highlight badges based on progress
        if (dataDoc.tests >= 20) {
          setHighlightedBadge('Quiz Master');
        } else if (dataDoc.articles >= 20) {
          setHighlightedBadge('Knowledge Seeker');
        } else if (dataDoc.courses >= 4) {
          setHighlightedBadge('Video Buff');
        }
      } else {
        console.log("No user progress data found for this user.");
      }
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);


  // Apply dynamic styles for highlighting
  const getBadgeStyle = (badge) => {
    return highlightedBadge === badge ? styles.highlighted : styles.default;
  };

  return (

    <LinearGradient
      colors={['#F1F0F0', '#F1EEEE', '#F0EAEA', '#F0E5E5', '#F0E5E6']} // Gradual shades of light gray
      locations={[0, 0.25, 0.5, 0.75, 1]} // Control the spread of each color
      start={{ x: 0.5, y: 0.5 }} // Center of the gradient
      end={{ x: 1, y: 1 }} // Gradual fade
      style={styles.container}
    >

      <ScrollView>
        <SafeAreaView>
          <View style={styles.Profilecontainer}>
            <View style={styles.profileImageContainer}>
              <Image style={styles.profileImage} source={require('../../images/profile.jpg')} resizeMode='contain' />
            </View>
            {/* <Text style={styles.name}>{username}</Text> */}
          </View>

          <Text style={styles.badges}>Badges</Text>


          <SafeAreaView style={styles.rectangleView}>
            <View style={styles.diamondContainer}>
              <View style={[styles.rectangleView1, getBadgeStyle('Quiz Master')]}>
                <View style={styles.rectangleView2} />
              </View>
              <Text style={styles.label1}>Quiz Master</Text>
            </View>

            <View style={styles.diamondContainer}>
              <View style={[styles.rectangleView3, getBadgeStyle('Video Buff')]}>
                <View style={styles.rectangleView4} />
              </View>
              <Text style={styles.label2}>Video Buff</Text>
            </View>

            <View style={styles.diamondContainer}>
              <View style={[styles.rectangleView5, getBadgeStyle('Knowledge Seeker')]}>
                <View style={styles.rectangleView6} />
              </View>
              <Text style={styles.label3}>Knowledge Seeker</Text>
            </View>
          </SafeAreaView>


          <View style={styles.rectangleView7}>
            <Image
              style={styles.imageIcon}
              resizeMode="contain"
              source={require('../../images/img.png')}
            />
            {/* Top Summary Section */}

            <View style={styles.item}>
              <Text style={styles.label}>Articles</Text>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressCurrent}>{articles}</Text>
              </View>
              <ProgressBar progress={1} color="#E63946" style={styles.progressBar} />
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Courses</Text>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressCurrent}>{courses}</Text>
              </View>
              <ProgressBar progress={1} color="#E63946" style={styles.progressBar} />
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Tests</Text>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressCurrent}>{tests}</Text>
              </View>
              <ProgressBar progress={1} color="#E63946" style={styles.progressBar} />
            </View>

          </View>


          <View style={styles.overallProgressContainer}>
            <Text style={styles.sectionTitle}>Your overall progress</Text>

            <View style={styles.row}>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{courses}</Text>
                <Text style={styles.statLabel}>Completed Courses</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{articles}</Text>
                <Text style={styles.statLabel}>Read Articles</Text>
              </View>

            </View>

            <View style={styles.row}>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{badgesCount}</Text>
                <Text style={styles.statLabel}>Badges</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{tests}</Text>
                <Text style={styles.statLabel}>CompletedTests</Text>
              </View>

            </View>

            <View style={styles.scoreContainer}>
              <Text style={styles.scorePoints}>Score Points</Text>
              <Text style={styles.scoreValue}>{points}</Text>
            </View>

          </View>
        </SafeAreaView>
      </ScrollView>

    </LinearGradient>

  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1'
  },
  Profilecontainer: {
    flexDirection: 'row', // Align image and name horizontally
    alignItems: 'center', // Vertically center the name with the image
    marginTop: 20, // Spacing from the top
    paddingHorizontal: 20, // Horizontal padding
  },
  profileImageContainer: {
    width: 65, // Circle width
    height: 65, // Circle height
    borderRadius: 38, // Half of width/height for a perfect circle
    overflow: 'hidden', // Ensures the image respects the circular boundary
    backgroundColor: '#ccc', // Optional: Fallback background if image doesn't load
    marginRight: 10, // Space between image and name
    marginTop: 1
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#131313', // Text color
  },
  badges: {
    width: 54,
    marginTop: 6,
    left: 24,
    fontSize: 14, // Text size
    fontWeight: "500", // Font weight for label text
    color: "#333", // Text color
  },
  rectangleView: {
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: 'row',
    height: 140
  }
  ,
  rectangleView1: {
    width: 80, // Width of the diamond
    height: 80, // Height of the diamond
    transform: [{ rotate: "45deg" }], // Rotates the square to make it a diamond
    borderWidth: 10,
    borderColor: "#f5a8b8", // Border color
    justifyContent: "center",
    alignItems: "center", // Centers the inner diamond
    borderRadius: Border.br_mid,
    marginTop: 20,
    marginLeft: 20, // Move diamond slightly to the right
  }
  ,
  rectangleView2: {
    width: 70, // Size of the inner diamond (proportional to outer diamond)
    height: 70,
    backgroundColor: "#ffd6de", // Inner pink fill color
    transform: [{ rotate: "90deg" }],
    justifyContent: "center",
    alignItems: "center", // Centers the inner diamond
    borderRadius: Border.br_smi,

  }
  ,
  rectangleView3: {
    width: 80, // Width of the diamond
    height: 80, // Height of the diamond
    transform: [{ rotate: "45deg" }], // Rotates the square to make it a diamond
    borderWidth: 10,
    borderColor: "#2b68d6",
    justifyContent: "center",
    alignItems: "center", // Centers the inner diamond
    borderRadius: Border.br_mid,
    marginTop: 20,
    marginLeft: 38, // Move diamond slightly to the right
  }
  ,
  rectangleView4: {
    width: 70, // Size of the inner diamond (proportional to outer diamond)
    height: 70,
    backgroundColor: "#a3d4f7", // Inner pink fill color
    transform: [{ rotate: "90deg" }],
    justifyContent: "center",
    alignItems: "center", // Centers the inner diamond
    borderRadius: Border.br_smi,

  }
  ,
  rectangleView5: {
    width: 80, // Width of the diamond
    height: 80, // Height of the diamond
    transform: [{ rotate: "45deg" }], // Rotates the square to make it a diamond
    borderWidth: 10,
    borderColor: "#b0b0b0", // Border color
    justifyContent: "center",
    alignItems: "center", // Centers the inner diamond
    borderRadius: Border.br_mid,
    marginTop: 20,
    marginLeft: 38, // Move diamond slightly to the right
  }
  ,
  rectangleView6: {
    width: 70, // Size of the inner diamond (proportional to outer diamond)
    height: 70,
    backgroundColor: "#dedcdc", // Inner pink fill color
    transform: [{ rotate: "90deg" }],
    justifyContent: "center",
    alignItems: "center", // Centers the inner diamond
    borderRadius: Border.br_smi,

  },
  diamondContainer: {
    alignItems: "center", // Center the diamond and its label
  },
  label1: {
    marginTop: 10, // Space between the diamond and the label
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    fontSize: 10,
    lineHeight: 20,
    fontFamily: FontFamily.interRegular,
    left: 10
  },
  label2: {
    marginTop: 10, // Space between the diamond and the label
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    fontSize: 10,
    lineHeight: 20,
    fontFamily: FontFamily.interRegular,
    left: 14
  },
  label3: {
    marginTop: 10, // Space between the diamond and the label
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    fontSize: 10,
    lineHeight: 20,
    fontFamily: FontFamily.interRegular,
    left: 14
  },
  rectangleView7: {
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: 'row',
    height: 100
  },
  imageIcon: {
    backgroundColor: "#ffd6de", // Inner pink fill color
    borderColor: '#ffd6de', // Light red border 
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    width: 80,
    height: 80,
    left: 18,
    position: "absolute"
  },
  progressBar: {
    width: 28,
    height: 4,
    borderRadius: 4,
  },
  progressCurrent: {
    fontSize: 20, // Larger size for the current value
    fontWeight: 'bold',
    color: '#333',
  },
  progressTotal: {
    fontSize: 14, // Smaller size for the total value
    color: '#666',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  item: {
    marginTop: 20,
    marginHorizontal: 10,
    left: 105
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  overallProgressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginLeft: 20,
    marginRight: 20,
    height: 250
  },
  sectionTitle: {
    fontSize: 15,
    lineHeight: 15,
    fontFamily: FontFamily.interRegular,
    color: '#333',
    marginBottom: 16,
    textAlign: 'left', // Centers the section title
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    backgroundColor: Color.colorGainsboro_100,
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
    height: 50
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 3
  },
  scorePoints: {
    fontSize: 14,
    color: '#666',
    marginBottom: 1,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 1,
    //paddingTop: 12,
  },
  scoreTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  scoreValue: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  default: {
    backgroundColor: '#E0E0E0',
  },
  highlighted: {
    backgroundColor: '#FF5722',
  },

})
export default profile;