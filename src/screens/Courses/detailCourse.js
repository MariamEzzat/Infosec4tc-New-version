import * as React from "react";
import { useState, useCallback, Alert } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import GreyCircle from '../../images/GreyCircle'
import PlayIcon from '../../images/Play'
import { FontFamily } from "../../utils/GlobalStyles";
import { incrementProgress } from '../../../progressService';


const detailCourse = ({ route }) => {
    const { videolink, videoname, videodescription } = route.params || {};

    console.log("Video Link:", videolink);  // Make sure this is a valid YouTube ID
    console.log("Video Name:", videoname);
    console.log("Video Description ", videodescription)

    const [playing, setPlaying] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);

    const onStateChange = useCallback(state => {
        if (state === 'ended') {
            setPlaying(false);
            Alert.alert('Video has finished playing!');
        }
    }, []);

    const onFullScreenChange = useCallback((isFullScreen) => {
        setIsFullScreen(isFullScreen);
    }, []);
    const onPress = async() => {
      await incrementProgress('courses')
        setPlaying(true);
        setShowOverlay(false); // Hide the overlay when the video plays
    };
    return (
        <LinearGradient
            colors={['#F1F0F0', '#F1EEEE', '#F0EAEA', '#F0E5E5', '#F0E5E6']}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >

            <View style={styles.container}>
                <YoutubePlayer
                    height={190}
                    width={340}
                    play={playing}
                    onChangeState={onStateChange}
                    onFullScreenChange={onFullScreenChange}
                    videoId={videolink}
                />
                {showOverlay && (
                    <TouchableOpacity style={styles.overlay} onPress={onPress}>
                        <View style={styles.iconContainer}>
                            <GreyCircle style={styles.greyCircle} />
                            <PlayIcon style={styles.playIcon} />
                        </View>
                    </TouchableOpacity>
                )}

            </View>
<View style={styles.Textcontainer}>
<Text style={styles.VideoName}>{videoname}</Text>
<Text style={styles.VideoDescription}>{videodescription}</Text>
</View>
     
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    videoContainer: {
        borderRadius: 17,
        width: 354,
        height: 194,
        marginleft: 337,
        marginRight: 17,
        borderColor: 'white',
        marginTop: 10,
    

    },
    overlay: {
        position: 'absolute',
        top: -3, left: -7,
        right: 0,
        width: 354,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // fully opaque white
        borderRadius: 17,

    },
    iconContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    greyCircle: {
        position: 'absolute',
    },
    playIcon: {
        position: 'absolute',
    },
    VideoName:{
        fontSize: 15,
       fontWeight: '500',
        color: "#131313",
        textAlign: "left",
        width: 345,
       
    },
    VideoDescription:{
        fontSize: 12,
        fontFamily: FontFamily.interRegular,
        color: "#131313",
        textAlign: "left",
        width: 345,
        height: 390,
        opacity: 0.6,
        marginTop:10
    },
    Textcontainer:{
        marginBottom:-30,
    }

});




export default detailCourse;
