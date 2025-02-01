import React ,{useState , useEffect}from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import TimeIcon from '../../images/time.svg';
import VideoIcon from '../../images/video.svg';
import { FontFamily, Color, Border, FontSize } from '../../utils/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredPrograms,setFeaturedPrograms]=useState([]);
  const [articles, setArticles] = useState(0);
  const [courses, setCourses] = useState(0);
  const [tests, setTests] = useState(0);
  const [achievements , setAchievements]=useState("Beginner")
  const [points,setPoints]=useState(0);


  const renderFeaturedCard = ({ item }) => (
    <View style={styles.featuredCard}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <View style={styles.featuredInfo}>
        <View style={styles.featuredPair}>
          <TimeIcon style={styles.IconFeature} />
          <Text style={styles.infoText}>{item.duration}</Text>
        </View>
        <View style={styles.featuredPair}>
          <VideoIcon style={styles.IconFeature} />
          <Text style={styles.infoText}>{item.videos}</Text>
        </View>
      </View>
    </View>
  );

  useEffect(() => {

    const fetchFeatureprograms = async () => {
      try {
        const FeatureprogramsCollection = await firestore().collection('featuredPrograms').get();
        const fetchedprograms = FeatureprogramsCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedPrograms(fetchedprograms); // Set courses state
      } catch (error) {
        console.error('Error fetching programs:', error);
      } 
    };
    fetchFeatureprograms();

    const user = auth().currentUser;
    if (user) {
      const userRef = firestore().collection('users-progress').doc(user.uid);
      
      // Real-time listener using onSnapshot
      const unsubscribe = userRef.onSnapshot((doc) => {
        if (doc.exists) {
          const dataDoc = doc.data();
          const userArticles = dataDoc.articles || 0;
          const userCourses = dataDoc.courses || 0;
          const userTests = dataDoc.tests || 0;
          const userPoints = dataDoc.points || 0;

          setArticles(userArticles);
          setCourses(userCourses);
          setTests(userTests);
          setPoints(userPoints);

          // Calculate achievements based on points
          if (userPoints >= 1001) {
            setAchievements('Expert');
          } else if (userPoints >= 501) {
            setAchievements('Intermediate');
          } else {
            setAchievements('Beginner');
          }
        }
      });

      // Cleanup listener on component unmount
      return () => unsubscribe();
    }
  }, []);
  return (
 
    <ScrollView style={styles.container}>
         <SafeAreaView> 
      <View style={styles.Profilecontainer}>
        <Image
          style={styles.infosec4tcPng11}
          resizeMode="contain"
          source={require('../../images/infosec4tcPng11.png')}
        />
   <TouchableOpacity onPress={() => navigation.navigate("Profile")}>

        <Image style={styles.profileImage} source={require('../../images/profile.jpg')} resizeMode='contain' />

        </TouchableOpacity>

      </View>

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
            {/* <Text style={styles.progressTotal}>/40</Text> */}
          </View>
          <ProgressBar progress={1} color="#E63946" style={styles.progressBar} />
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Courses</Text>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressCurrent}>{courses}</Text>
            {/* <Text style={styles.progressTotal}>/40</Text> */}
          </View>
          <ProgressBar progress={1} color="#E63946" style={styles.progressBar} />
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Tests</Text>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressCurrent}>{tests}</Text>
            {/* <Text style={styles.progressTotal}>/40</Text> */}
          </View>
          <ProgressBar progress={1} color="#E63946" style={styles.progressBar} />
        </View>


      </View>

      <View style={styles.rectangleView7}>
        <Image
          style={styles.imageIcon1}
          resizeMode="contain"
          source={require('../../images/Achieve.png')}
        />
        <View style={styles.item}>
          <Text style={styles.label1}>Achievements</Text>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressType}>{achievements}</Text>

          </View>
          <ProgressBar progress={1} color="#E63946" style={styles.progressBar1} />
        </View>

      </View>

      <Text style={styles.sectionTitle}>Featured Programs</Text>
      <ScrollView>
      <FlatList
        horizontal
        data={featuredPrograms}
        keyExtractor={(item) => item.id}
        renderItem={renderFeaturedCard}
        contentContainerStyle={styles.featuredList}
      />
      </ScrollView>
  
  <View>
  <Text style={styles.sectionTitle}>Latest Updates</Text>
  <View style={styles.rectangleViewLinkedin}>

  </View>
  </View>


  
    </SafeAreaView>
    </ScrollView>
  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infosec4tcPng11: {
    width: 128,
    height: 34,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 70


  },
  profileImage: {
    width: 51, // Circle width
    height: 51, // Circle height
    borderRadius: 25, // Half of width/height for a perfect circle
    overflow: 'hidden', // Ensures the image respects the circular boundary
    backgroundColor: '#ccc', // Optional: Fallback background if image doesn't load
    marginLeft: 100, // Space between image and name
    marginTop: 15,
  },
  Profilecontainer: {
    flexDirection: 'row', // Align image and name horizontally
    alignItems: 'center', // Vertically center the name with the image
    marginTop: 1, // Spacing from the top

  },
  rectangleView7: {
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
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
  imageIcon1: {
    backgroundColor: "#E43944", // Inner pink fill color
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
    height: 4,
    borderRadius: 4,
  },
  progressBar1: {
    height: 4,
    borderRadius: 17,
    width: 215
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
    fontSize: 10,
    fontWeight: '400',
    color: "#131313",
  },
  label1: {
    fontSize: 10,
    fontWeight: '400',
    color: "#131313",
  },
  item: {
    marginTop: 20,
    marginHorizontal: 10,
    left: 105
  }, progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  progressType: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 7
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    //padding: 16,
    marginRight: 16,
    width: 223,
    height: 133,
    elevation: 1,
    marginBottom: 10,
    marginLeft:6,
  }, 
  featuredInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between', //why we remove it it ensure the space between elements and even with modifiying the margins no changes
    marginLeft: 10,
    marginTop: 20
  }, 
  courseTitle: {
    marginTop: 29,
    marginLeft: 19,
    fontSize: 13,
    fontWeight: "600",
    fontFamily: FontFamily.interExtra,
    color: "#131313",
  },
  author: {
    color: '#A1A1A1',
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_3xs,
    marginTop: 8,
    marginLeft: 19,
  },
  featuredInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between', //why we remove it it ensure the space between elements and even with modifiying the margins no changes
    marginLeft: 10,
    marginTop: 20
  },
  featuredPair: {
    flexDirection: "row", // Arrange icon and text in a row
    alignItems: "center",
    marginRight: 20, // Space between pairs
    marginLeft: 10,
  },
  IconFeature: {
    marginRight: 8,
  }, infoText: {
    fontSize: 10,
    fontWeight: "600",
    fontFamily: FontFamily.interExtra,
    color: "#131313",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: "#131313",
    marginLeft: 25,
    marginVertical: 8,
},
featuredList: {
    marginTop: 10,
    paddingLeft: 16,
},
rectangleViewLinkedin: {
  borderRadius: 17,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  marginLeft: 20,
  marginRight: 20,
  marginTop: 20,
  flexDirection: 'row',
  height: 176,
  width:345,
},

});
export default HomeScreen;