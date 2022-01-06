import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import moment from "moment";
import 'moment/locale/id'
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonInAttendance from "../ButtonInAttendance";
import ButtonRestAttendance from "../ButtonRestAttendance";
import Geolocation from '@react-native-community/geolocation';

export default class ButtonAttendance extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            timeShow: moment().format('llll'),
            location: {},
            shiftType: null,
            istirahatEn: true,
            statusTapIn: '',
            restTime: '',
            dayLife: ''

        }
    }
    componentDidMount() {
        this.TimeUp()
        moment.locale('id');
        this.setState({
            timeShow: moment().format('llll')
        })
        setInterval(() => {
            AsyncStorage.getItem('RestMethod', (error, result) => {
                let resultParsed = JSON.parse(result)
                if (result) {
                    this.setState({
                        restTime: resultParsed.restTime
                    })
                }
            })
            let Hours = moment().format("H")
            let now = moment(new Date())
            let end = moment(this.state.restTime)
            let menit = now.diff(end, 'minutes') + " Menit"
            if(menit < 1){
                this.setState({
                    dayLife: 'Baru dimulai'
                })
            }
            else{
                this.setState({
                    dayLife: now.diff(end, 'minutes') + " Menit"
                })
            }
            let Minutes = moment().format("m")
            if (Hours >= 7 && Hours <= 8) {
                // Masuk

                this.setState({
                    shiftType: 'IN'
                    // shiftType: 'LEAVEIN'
                })
            }
            else if (Hours >= 10 && Hours <= 13) {
                // Masuk
                this.setState({
                    shiftType: 'LEAVEIN'
                    // shiftType: 'IN'
                })
            }
            else if (Hours == 9) {
                // Masuk
                if (Minutes <= 0) {
                    this.setState({
                        shiftType: 'IN',
                        istirahatEn: false
                    })
                }
                else {
                    this.setState({
                        shiftType: 'LEAVEIN'
                        // shiftType: 'IN'
                    })
                }
            }
            else if (Hours >= 14 && Hours <= 18) {
                this.setState({
                    shiftType: 'LEAVEOUT'
                    // shiftType: 'IN'
                })
            }
            else if (Hours >= 19 && Hours <= 21) {
                this.setState({
                    shiftType: 'OUT',
                    istirahatEn: false
                })
            }
            else {
                this.setState({
                    shiftType: 'CANCEL',
                    istirahatEn: false
                })
            }
        }, 2000)
    }
    TimeUp() {
        setInterval(() => {
            this.setState({
                timeShow: moment().format('llll')
            })
        }, 10000)
    }
    render() {
        return (
            <>
                {/* longitude={this.state.location.coords.longitude} latitude={this.state.location.coords.latitude} */}
                <View>
                    <ButtonInAttendance shiftType={this.state.shiftType} navigation={this.props.navigation} />
                </View>
                {this.state.restTime ? <Text style={{ fontFamily: 'Merriweather_400Regular', color: '#0F4C75' }}>Istirahat {this.state.dayLife}</Text> : <Text style={{ fontFamily: 'Merriweather_400Regular', color: '#0F4C75' }}>{this.state.timeShow}</Text>}

                <View>
                    <ButtonRestAttendance shiftType={this.state.shiftType} navigation={this.props.navigation} istirahatEn={this.state.istirahatEn} />
                </View>
            </>
        )
    }
}