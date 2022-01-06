import React, { Component } from "react";
import { SafeAreaView, View,Text } from "react-native";
import BackgroundSavage from "../../Background/BackgroundSavage";
import moment from "moment";
import 'moment/locale/id'
import HeaderIntro from "../../font/HeaderIntro";
import ButtonAttendance from "../../AtomicJs/ButtonAttendance";
import Permission from "../../AtomicJs/Permission";
import { PermissionsAndroid } from 'react-native';

export default class AttendanceScreen extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            LocationNotGrant: true,
        }
    }
    componentDidMount() {
        this.getCurrentLocation()
    }
    async getCurrentLocation() {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.setState({
                LocationNotGrant: granted
            })
        } else {
            this.setState({
                LocationNotGrant: granted
            })
        }
    }
    calling() {
        if (this.state.LocationNotGrant) {
            return (
                <ButtonAttendance navigation={this.props.navigation} />
                // <Text>Berhasil</Text>
            )
        }
        else {
            return (
                <Permission />
            )
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <BackgroundSavage />
                <View style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                    <HeaderIntro text="Attendance." />
                </View>
                <View style={{ alignItems: 'center', alignSelf: 'center', flex: 1, justifyContent: 'center', position: 'absolute', marginTop: 20, height: '100%' }}>
                    {this.calling()}
                </View>
            </SafeAreaView>
        )
    }
}