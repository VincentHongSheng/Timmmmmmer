/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import formatTime from 'minutes-seconds-milliseconds';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    Text,
    View,
} from 'react-native';

export default class Timmmmmmer extends Component {
    state = {
        timeElapsed: null,
        running: false,
        startTime: null,
        laps: []
    };
    handleStartPress = () => {
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({
                running: false
            });
            return;
        }
        this.setState({ startTime: new Date() });
        this.interval = setInterval(() => {
            this.setState({
                timeElapsed: new Date() - this.state.startTime,
                running: true
            });
        }, 30);
    };

    handleLapPress = () => {
        if (this.state.running) {
            const lap = this.state.timeElapsed;
            this.setState({
                startTime: new Date(),
                laps: this.state.laps.concat([lap])
            });
        }
    };
    startStopButton = () => {
        const style = this.state.running ? styles.stopButton : styles.startButton;
        return (
            <TouchableHighlight
                underlayColor="gray"
                onPress={this.handleStartPress}
                style={[styles.button, style]}
            >
                <Text>
                    {this.state.running ? 'Stop' : 'Start'}
                </Text>
            </TouchableHighlight>
        )
    };
    lapButton = () => {
        return (
            <TouchableHighlight
                underlayColor="gray"
                onPress={this.handleLapPress}
                style={styles.button}
            >
                <Text>
                    Lap
                </Text>
            </TouchableHighlight>
        )
    };
    laps = () => {
        return (
            <ScrollView
                ref="scrollView"
                onContentSizeChange={(contentWidth, contentHeight) => {
                    if (contentHeight > 360) {
                        this.refs.scrollView.scrollToEnd({ y: contentHeight, animated: true })
                    }
                }
                }
            >
                {
                    this.state.laps.map((lap, index) => (
                        <Text key={index} style={styles.lap}>
                            {`#Lap ${index}：${formatTime(lap)}`}
                        </Text>
                    ))
                }
            </ScrollView>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.timerWraper}>
                        <Text style={styles.timer}>
                            {
                                formatTime(this.state.timeElapsed)
                            }
                        </Text>
                    </View>
                    <View style={styles.bottonWrapper}>
                        {this.startStopButton()}
                        {this.lapButton()}
                    </View>
                </View>
                <View style={styles.footer}>
                    {this.laps()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        flexDirection: 'column'
    },
    header: {
        flex: 1,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    lap: {
        fontSize: 20
    },
    timerWraper: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottonWrapper: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    timer: {
        fontSize: 60
    },
    button: {
        borderWidth: 2,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButton: {
        borderColor: '#00CC00',
    },
    stopButton: {
        borderColor: '#CC0000',
    }
});

AppRegistry.registerComponent('Timmmmmmer', () => Timmmmmmer);
