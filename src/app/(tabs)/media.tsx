import { useState } from "react";

import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Container } from "@/components/ui/container";

const MediaScreen = () => {
    const [currentVideo, setCurrentVideo] = useState(0)
    const videos = [
        require(`../../../assets/videos/cat1.mp4`),
        require(`../../../assets/videos/cat2.mp4`),
        require(`../../../assets/videos/cat3.mp4`),
        require(`../../../assets/videos/cat4.mp4`),
    ]

    const player = useVideoPlayer(videos[currentVideo], player => {
        player.loop = true;
    })




    return (
        <Container style={{ height: 500, paddingVertical: 15, gap: 2 }}>
            <VideoView style={styles.video} player={player} allowsPictureInPicture />
            <TouchableOpacity style={styles.nextButton} onPress={() => {

                player.replace(videos[currentVideo + 1])
                setCurrentVideo(currentVideo + 1)
                if (currentVideo + 1 === videos.length) {
                    setCurrentVideo(0)
                }
            }}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </Container>
    )
}

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: '90%',
        objectFit: 'contain',
        borderRadius: 8,
        marginBottom: 5
    },
    nextButton: {
        height: '10%',
        width: '100%',
        backgroundColor: '#91345b',
        borderRadius: 8,
        justifyContent: 'center',
        paddingVertical: 10
    },
    nextButtonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        textTransform: "uppercase",
        fontWeight: 'bold'
    }
})

export default MediaScreen;