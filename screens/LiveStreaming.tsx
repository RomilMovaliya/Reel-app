import { StyleSheet, Text, View, Alert, Share } from 'react-native'
import React from 'react'
import ZegoUIKitPrebuiltLiveStreaming, {
    HOST_DEFAULT_CONFIG,
    AUDIENCE_DEFAULT_CONFIG
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native'

type RootStackParamList = {
    LiveStreaming: {
        userID: string;
        userName: string;
        liveID: string;
        isHost: boolean;
    },
    HomePage: undefined;
};

const LiveStreaming = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'LiveStreaming'>>();
    const { userID, userName, liveID, isHost } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // Debug log to check if parameters are received correctly
    console.log('LiveStreaming params:', { userID, userName, liveID, isHost });

    // Ensure all required parameters are present
    if (!userID || !userName || !liveID) {
        console.error('Missing required parameters:', { userID, userName, liveID });
        Alert.alert(
            'Error',
            'Missing required parameters. Please go back and try again.',
            [{ text: 'OK', onPress: () => navigation.navigate('HomePage') }]
        );
        return null;
    }

    // Function to share live stream ID
    // const shareLiveID = async () => {
    //     try {
    //         const result = await Share.share({
    //             message: `Join my live stream! Use this Live ID: ${liveID}`,
    //             title: 'Join Live Stream',
    //         });
    //     } catch (error) {
    //         console.error('Error sharing:', error);
    //     }
    // };

    // Configuration for host
    const hostConfig = {
        ...HOST_DEFAULT_CONFIG,
        // enableCoHostin: true,
        onLeaveLiveStreaming: () => {
            navigation.navigate('HomePage');
        },
        onLiveStreamingStateUpdate: (state: any) => {
            console.log('Live streaming state:', state);
        },
        // Ensure bottom menu bar is visible with audio/video controls
        bottomMenuBarConfig: {
            ...HOST_DEFAULT_CONFIG.bottomMenuBarConfig,
            buttons: [
                'toggleMicrophoneButton',
                'toggleCameraButton',
                'switchCameraButton',
                'leaveButton',
            ],
            maxCount: 5,
            showInRoomMessageButton: true,
            showScreenSharingButton: false,
        },
        // Ensure audio/video controls are enabled
        audioVideoViewConfig: {
            ...HOST_DEFAULT_CONFIG.audioVideoViewConfig,
            showMicrophoneStateOnView: true,
            showCameraStateOnView: true,
            showUserNameOnView: true,
        }
    };

    // Configuration for audience/viewer
    const audienceConfig = {
        ...AUDIENCE_DEFAULT_CONFIG,
        onLeaveLiveStreaming: () => {
            navigation.navigate('HomePage');
        },
        onLiveStreamingStateUpdate: (state: any) => {
            console.log('Live streaming state:', state);
            // Handle connection issues for viewers
            if (state.error) {
                Alert.alert(
                    'Connection Error',
                    'Unable to connect to the live stream. Please check the Live ID and try again.',
                    [
                        { text: 'OK', onPress: () => navigation.navigate('HomePage') }
                    ]
                );
            }
        },
        // Audience bottom menu configuration
        bottomMenuBarConfig: {
            ...AUDIENCE_DEFAULT_CONFIG.bottomMenuBarConfig,
            buttons: [
                'leaveButton'
            ],
            maxCount: 5,
            showInRoomMessageButton: true,
        },
        // Audio/video view configuration for audience
        audioVideoViewConfig: {
            ...AUDIENCE_DEFAULT_CONFIG.audioVideoViewConfig,
            showMicrophoneStateOnView: true,
            showCameraStateOnView: true,
            showUserNameOnView: true,
        }
    };

    return (
        <View style={styles.container}>
            {/* Display role and live ID info */}
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    {isHost ? `🔴 LIVE - ID: ${liveID}` : `👁️ Watching: ${liveID}`}
                </Text>
            </View>

            <ZegoUIKitPrebuiltLiveStreaming
                appID={1261431626}
                appSign={"be38c63673a36488bd07449d0f9f2e8af0e020798d1a9f3729d81c61e745f501"}
                userID={userID}
                userName={userName}
                liveID={liveID}
                config={isHost ? hostConfig : audienceConfig}
            />
        </View>
    );
};

export default LiveStreaming;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    infoContainer: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        zIndex: 1000, // Increased z-index to ensure it's on top
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 8,
        borderRadius: 8,
    },
    infoText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});