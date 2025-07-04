import { Dimensions, FlatList, ListRenderItemInfo, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { videos } from '../assets/data';
import Video, { VideoRef } from 'react-native-video';


const { height, width } = Dimensions.get('window')
interface VideoWrapper {
    data: ListRenderItemInfo<string>,
    allVideos: string[],
    visibleIndex: number
}

const VideoWrapper = ({ data, allVideos, visibleIndex }: VideoWrapper) => {
    const { index, item } = data;
    const [isPaused, setIsPaused] = useState(false);
    const videoRef = useRef<VideoRef>(null);
    const isVisible = visibleIndex === index;

    useEffect(() => {
        if (isVisible) {
            videoRef.current?.seek(0); // Auto-reset when it becomes visible
            setIsPaused(false); // Auto-play when visible
        } else {
            setIsPaused(true); // Pause when not visible
        }
    }, [visibleIndex]);

    const paused = isVisible ? isPaused : true;

    return (
        <Pressable
            style={{
                height,
                width,
                backgroundColor: 'black',
            }}
            onLongPress={() => isVisible && setIsPaused(true)}
            onPressOut={() => isVisible && setIsPaused(false)}
        >
            <View style={{
                height,
                width,
                backgroundColor: index % 2 === 0 ? 'red' : 'pink'
            }}>
                <Video
                    ref={videoRef}
                    source={{ uri: allVideos[index] }}
                    style={{
                        height,
                        width
                    }}
                    resizeMode='cover'
                    paused={paused}
                    repeat={true}
                />

                <Text style={{
                    position: 'absolute',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 24,
                    width,
                    height,
                }}>

                </Text>

            </View>
        </Pressable>

    )
}
const HomeScreen = () => {
    const [allVideos, setAllVideos] = useState(videos);
    const [visibleIndex, setVisibleIndex] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const newIndex = Number(viewableItems[0].index);
            setVisibleIndex(newIndex);
        }
    }).current;
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'black'
        }}>
            <FlatList
                pagingEnabled
                initialNumToRender={1}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                data={allVideos}
                renderItem={(data) => {
                    return <VideoWrapper
                        data={data}
                        allVideos={allVideos}
                        visibleIndex={visibleIndex}
                    />
                }}

            />
        </View>

    )
}

export default HomeScreen

const styles = StyleSheet.create({})