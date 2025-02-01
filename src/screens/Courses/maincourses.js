import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontFamily, Color, Border, FontSize } from '../../utils/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient';
import TimeIcon from '../../images/time.svg';
import VideoIcon from '../../images/video.svg';
import BookmarkIcon from '../../images/bookmark.svg';
import BookmarkIcon1 from'../../images/bookmark1.svg'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const maincourses = () => {

    const [courses, setCourses] = useState([]); // State to store courses
    const [featuredPrograms, setFeaturedPrograms] = useState([]);
    const [bookmarkedCourses, setBookmarkedCourses] = useState({});
    const navigation = useNavigation();
    
    const toggleBookmark = async (courseId) => {
    const isBookmarked = bookmarkedCourses[courseId]; // Get the current bookmark status of the course
        
        if (isBookmarked) {
          console.log("REMOVE");
          await removeBookmark(courseId); // Assuming removeBookmark is defined elsewhere
        } else {
          console.log("ADD");
          await addBookmark(courseId); // Assuming addBookmark is defined elsewhere
        }
    
        // Update the state to reflect the new bookmark status for the clicked course
        setBookmarkedCourses((prevState) => ({
          ...prevState,
          [courseId]: !isBookmarked, // Toggle the bookmark status
        }));
      };

    const addBookmark = async (courseId) => {
        const user = auth().currentUser;
        if (user) {
          const userRef = firestore().collection('bookmark').doc(user.uid);
          const doc = await userRef.get();
      
          if (!doc.exists) {
            // If the document doesn't exist, create it
            try {
              await userRef.set({
                uid: user.uid,
                coursesIds: [courseId], // Initialize with the first courseId
              });
              console.log('Bookmark added successfully (new document)');
            } catch (error) {
              console.error('Error adding bookmark:', error);
            }
          } else {
            // If the document exists, update the coursesIds array with arrayUnion
            try {
              await userRef.update({
                coursesIds: firestore.FieldValue.arrayUnion(courseId), // Safely add the courseId
              });
              console.log('Bookmark updated successfully');
            } catch (error) {
              console.error('Error adding bookmark:', error);
            }
          }
        }
      };
      

    const removeBookmark = async (courseId) => {
        const user = auth().currentUser;
        const userRef = firestore().collection('bookmark').doc(user.uid);

        try {
            await userRef.update({
                coursesIds: firestore.FieldValue.arrayRemove(courseId),
            });
            console.log('Bookmark removed successfully');
        } catch (error) {
            console.error('Error removing bookmark:', error);
        }
    };

    useEffect(() => {
        // Fetch data from Firestore
        const fetchCourses = async () => {
            try {
                const coursesCollection = await firestore().collection('courses').get();
                const fetchedCourses = coursesCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCourses(fetchedCourses); // Set courses state
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
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

        fetchCourses();
        fetchFeatureprograms();
    }, []);


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

    const renderCourseCard = ({ item }) => (
        <View>
            <Text style={styles.courseTitleAboveCard}>{item.coursesTitle}</Text>


            <View style={styles.courseCard}>
                <View style={styles.courseThumbnail} />
                <View style={styles.courseContent}>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('detailCourse', {
                            videolink: item.link,
                            videoname: item.title,
                            videodescription: item.description
                        });
                    }}>
                        <Text style={styles.courseTitleCourse}>{item.title}</Text>
                    </TouchableOpacity>


                    <Text style={styles.authorCourse}>{item.author}</Text>

                    <View style={styles.courseInfo}>

                        <View style={styles.courseCardPair}>
                            <TimeIcon />
                            <Text style={styles.durationText}>{item.duration}</Text>
                        </View>

                        <View style={styles.courseCardPair}>
                            <TouchableOpacity  onPress={() => {toggleBookmark(item.id); }}>
                            {bookmarkedCourses[item.id] ? <BookmarkIcon /> : <BookmarkIcon1 />}
                            </TouchableOpacity>
                            <Text style={styles.bookmark}>Bookmark</Text>
                        </View>

                    </View>


                </View>
            </View>
        </View>

    );


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
                <Text style={styles.header}>Courses</Text>

                <Text style={styles.sectionTitle}>Featured Programs</Text>
                <FlatList
                    horizontal
                    data={featuredPrograms}
                    keyExtractor={(item) => item.id}
                    renderItem={renderFeaturedCard}
                    contentContainerStyle={styles.featuredList}
                />


                <FlatList
                    data={courses}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCourseCard}
                    contentContainerStyle={styles.coursesList}
                />
                </SafeAreaView>
            </ScrollView>

        </LinearGradient>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#131313",
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#131313",
        marginLeft: 16,
        marginVertical: 8,
    },
    featuredList: {
        marginTop: 10,
        paddingLeft: 16,
    },
    featuredCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginRight: 16,
        width: 223,
        height: 133,
        elevation: 3,
        marginBottom: 10
    },
    courseCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        height: 133,
        width: 350,
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 15
    },
    courseThumbnail: {
        width: 120,
        height: 113,
        backgroundColor: '#e43944',
        borderRadius: 6,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    courseContent: {
        flex: 1,
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
    courseInfo: {
        flexDirection: 'row',        // Align items horizontally (side by side)
        justifyContent: 'space-between', // Distribute items across the available space
        alignItems: 'center',        // Vertically center the items
        marginTop: 20,
        marginRight: 20
    },
    courseCardPair: {
        flexDirection: 'row',        // Align items in each pair horizontally
        alignItems: 'center',        // Vertically center the items in each pair
        marginHorizontal: 10, // Add margin to create more space between the pairs

    },
    infoText: {
        fontSize: 10,
        fontWeight: "600",
        fontFamily: FontFamily.interExtra,
        color: "#131313",
    },
    coursesList: {
        paddingBottom: 16,
    },
    IconFeature: {
        marginRight: 8,
    },
    featuredPair: {
        flexDirection: "row", // Arrange icon and text in a row
        alignItems: "center",
        marginRight: 20, // Space between pairs
        marginLeft: 10,
    },

    courseTitleCourse: {
        marginTop: 29,
        marginLeft: 1,
        fontSize: 13,
        fontWeight: "600",
        fontFamily: FontFamily.interExtra,
        color: "#131313",
    },
    authorCourse: {
        color: '#A1A1A1',
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_3xs,
        marginTop: 8,
        marginLeft: 1,
    },
    durationText: {
        fontSize: 10,
        fontWeight: "600",
        fontFamily: FontFamily.interSemiBold,
        color: "#131313",
        textAlign: "left",
        marginLeft: 8,               // Add some space between the icon and text
    },
    bookmark: {
        fontSize: 10,
        fontWeight: "600",
        fontFamily: FontFamily.interSemiBold,
        color: "#131313",
        textAlign: "left",
        marginLeft: 8

    },
    courseTitleAboveCard: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#131313",            // Keep the same text color
        marginLeft: 23,               // Align with the card's margin
        marginTop: 4,              // Space between title and card
        marginBottom: -5
    },
})


export default maincourses;