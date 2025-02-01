import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TimeIcon from '../../images/time.svg';
import VideoIcon from '../../images/video.svg';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import BookmarkIcon from '../../images/bookmark.svg';
import { FontFamily,FontSize } from '../../utils/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient';


const Bookmark = () => {
    const [courses, setCourses] = useState([]);
    const [bookmarkedCourses, setBookmarkedCourses] = useState([]);

    const toggleBookmark = async (courseId) => {
            console.log("REMOVE")
            await removeBookmark(courseId);
            setBookmarkedCourses(prevCourses => prevCourses.filter(course => course.id !== courseId)); // Update the list immediately
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


    const renderCourseCard = ({ item }) => (
        <View>
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
                            <TouchableOpacity  onPress={() => {
                                            toggleBookmark(item.id); 
              }}>
                                <BookmarkIcon />
                            </TouchableOpacity>
                            <Text style={styles.bookmark}>Bookmark</Text>
                        </View>

                    </View>


                </View>
            </View>
        </View>



    );
    useEffect(() => {
        // Fetch courses with real-time updates
        const unsubscribeCourses = firestore()
            .collection('courses')
            .limit(10) // Limit to a smaller number of documents
            .onSnapshot((snapshot) => {
                const fetchedCourses = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCourses(fetchedCourses); // Set courses state
            }, (error) => {
                console.error('Error fetching courses:', error);
            });
    
        // Fetch bookmarks with real-time updates
        const unsubscribeBookmarks = firestore()
            .collection('bookmark')
            .doc(auth().currentUser?.uid)
            .onSnapshot((snapshot) => {
                const userBookmark = snapshot.data();
                if (userBookmark) {
                    const bookmarkedCourseIds = userBookmark.coursesIds || [];
                    const matchedCourses = courses.filter(course =>
                        bookmarkedCourseIds.includes(course.id)
                    );
                    setBookmarkedCourses(matchedCourses); // Set bookmarked courses state
                }
            }, (error) => {
                console.error('Error fetching bookmarks:', error);
            });
    
        // Cleanup function to unsubscribe from snapshots when the component unmounts
        return () => {
            unsubscribeCourses();
            unsubscribeBookmarks();
        };
    }, [courses]); // Dependency on `courses` to re-fetch bookmarks whenever courses change
      // Empty dependency array ensures this only runs on component mount
    

    return (

        

    
        <LinearGradient
            colors={['#F1F0F0', '#F1EEEE', '#F0EAEA', '#F0E5E5', '#F0E5E6']} // Gradual shades of light gray
            locations={[0, 0.25, 0.5, 0.75, 1]} // Control the spread of each color
            start={{ x: 0.5, y: 0.5 }} // Center of the gradient
            end={{ x: 1, y: 1 }} // Gradual fade
            style={styles.container}
        >
            <SafeAreaView>

   
            <ScrollView>
                <Text style={styles.header}>Bookmark</Text>
                <Text style={styles.header1}>Saved Courses</Text>
                <FlatList
                    data={bookmarkedCourses}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCourseCard}
                    contentContainerStyle={styles.coursesList}
                />
            </ScrollView>
    </SafeAreaView>
        </LinearGradient>
    
    )

  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        fontSize: 18,
        fontWeight: '500',
        color: "#131313",
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    header1: {
        fontSize: 16,
        fontWeight: '500',
        color: "#131313",
        textAlign: 'left',
        marginTop: 16,
        marginLeft:17
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#131313",
        marginLeft: 16,
        marginVertical: 8,
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


export default Bookmark; 