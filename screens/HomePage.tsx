import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    HomePage: undefined;
    HomeScreen: undefined;
    LiveStreaming: {
        userName: string;
        userID: string;
        liveID: string;
        isHost: boolean;
    };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomePage'>;
const HomePage = () => {
    const [name, setName] = useState('');
    const [liveID, setLiveID] = useState('');
    const [mode, setMode] = useState(''); // 'host' or 'join'
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const startLiveStream = () => {
        if (!name.trim()) {
            Alert.alert("Please enter your name");
            return;
        }
        // const userID = 'user_' + Date.now();
        const userID = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

        const generatedLiveID = 'live_' + Date.now();

        console.log('Starting live stream with params:', {
            userName: name,
            userID,
            liveID: generatedLiveID,
            isHost: true
        });

        navigation.navigate('LiveStreaming', {
            userName: name,
            userID,
            liveID: generatedLiveID,
            isHost: true
        });
    };

    const joinLiveStream = () => {
        if (!name.trim()) {
            Alert.alert("Please enter your name");
            return;
        }

        if (!liveID.trim()) {
            Alert.alert("Please enter Live ID");
            return;
        }

        const userID = 'user_' + Date.now();

        console.log('Joining live stream with params:', {
            userName: name,
            userID,
            liveID: liveID,
            isHost: false
        });

        navigation.navigate('LiveStreaming', {
            userName: name,
            userID,
            liveID: liveID,
            isHost: false
        });
    };

    if (mode === '') {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Choose an option</Text>
                <TouchableOpacity style={styles.optionButton} onPress={() => setMode('host')}>
                    <Text style={styles.optionText}>Start Live Stream</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => setMode('join')}>
                    <Text style={styles.optionText}>Join Live Stream</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (mode === 'host') {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => setMode('')}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Start Live Stream</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}
                />
                <Button title="Start Live Stream" onPress={startLiveStream} />
            </View>
        );
    }

    if (mode === 'join') {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => setMode('')}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Join Live Stream</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Live ID (e.g., live_1234567890)"
                    value={liveID}
                    onChangeText={setLiveID}
                />
                <Button title="Join Live Stream" onPress={joinLiveStream} />
            </View>
        );
    }

    return null;
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    },
    optionButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center'
    },
    optionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20
    },
    backText: {
        fontSize: 16,
        color: '#007AFF'
    }
});