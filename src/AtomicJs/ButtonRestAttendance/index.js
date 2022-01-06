import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, Alert, View } from 'react-native'
import clearData from "../../Api/clearData";
import LoginRe from "../../Api/LoginRe";
import styles from '../../Style/out'
import AsyncStorage from "@react-native-async-storage/async-storage";
import logicApiRest from '../../Api/logicApiRest'
import Geolocation from '@react-native-community/geolocation';
import moment from "moment";
import 'moment/locale/id'
import logicApiRestOut from "../../Api/logicApiRestOut";
import LoadingScreens from "../LoadingScreens";

export default function ButtonRestAttendance(props) {
    const [statusRest, setStatusRest] = useState(null)
    const [user, setUser] = useState()
    const [email, setEmail] = useState()
    const [restTime, setRestTime] = useState()
    const [statusTapIn, setStatusTapIn] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [titleRest, setTitleRest] = useState()
    const [waktuIstirahat, setWaktuIstirahat] = useState()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        async function fetchStatus() {
            AsyncStorage.getItem('DataHadir', (error, result) => {
                let resultParsed = JSON.parse(result)
                if (result) {
                    setStatusTapIn(resultParsed.statusTapIn)
                }
                console.log(resultParsed)
                console.log(result)
            })
            AsyncStorage.getItem('RestMethod', (error, result) => {
                let resultParsed = JSON.parse(result)
                if (result) {
                    setStatusRest(resultParsed.statusRest)
                    setRestTime(resultParsed.restTime)
                    setTitleRest(resultParsed.titleRest)
                }
            })
        }
        async function userFetch() {
            AsyncStorage.getItem('userEnd', (error, result) => {
                if (result) {
                    let resultParsed = JSON.parse(result)
                    setUser(resultParsed.name)
                    setEmail(resultParsed.email)
                    console.log(user)
                }
            })
        }
        locationStatus()
        fetchStatus()
        userFetch()
    }, [])
    // Alert Istirahat
    const alertIstirahat = () => {
        locationStatus()
        Alert.alert('Perhatian !', `Apa anda berada di lokasi yang tepat untuk absensi Istirahat\nPihak Manajemen akan cek lokasi anda pada sistem absensi`, [
            {
                text: 'Tidak',
                onPress: () => console.log(email),
                style: 'cancel',
            },
            { text: 'Ya', onPress: () => MulaiIstirahat() },
        ]);
    }
    const alertSelesaiIstirahat = () => {
        locationStatus()
        Alert.alert('Perhatian !', `Apa anda berada di lokasi yang tepat untuk absensi Istirahat\nPihak Manajemen akan cek lokasi anda pada sistem absensi`, [
            {
                text: 'Tidak',
                onPress: () => console.log(email),
                style: 'cancel',
            },
            { text: 'Ya', onPress: () => SelesaiIstirahat() },
        ]);
    }
    const alertTry = () => {
        locationStatus()
        Alert.alert('Gagal !', `Aplikasi terdapat gangguan ketika mencoba membaca lokasi anda, coba lagi ?`, [
            { text: 'Ya' },
        ]);
    }
    const alertTry2 = () => {
        locationStatus()
        Alert.alert('Gagal !', `Aplikasi terdapat gangguan ketika mencoba membaca lokasi anda, coba lagi ?`, [
            { text: 'Ya' },
        ]);
    }
    // Cek Status
    function locationStatus() {
        Geolocation.getCurrentPosition(info => {
            console.log(info.coords.longitude)
            setLatitude(info.coords.latitude)
            setLongitude(info.coords.longitude)
        });
    }
    // Mulai Istirahat
    const MulaiIstirahat = () => {
        setIsLoading(true)
        LoginRe()
        locationStatus()
        setTimeout(() => {
            if (longitude !== null && latitude !== null) {
                const payload = {
                    tgl: moment().format("DD-MM-YYYY"),
                    jam: moment().format("h:mm:ss"),
                    add: email,
                    nm: user,
                    ket: "Keluar Istirahat",
                    lat: latitude,
                    long: longitude
                }
                const keyload = {
                    biji: '3 Buah',
                    Tangkai: '2Buah'
                }
                logicApiRest({ payload, keyload }).then(data => {
                    if (data === true) {
                        setStatusRest('OUT')
                        props.navigation.navigate('SplashScreen')
                        setIsLoading(false)
                    }
                    else {
                        setIsLoading(false)
                        alertTry()
                    }
                })
            }
            else {
                setIsLoading(false)
                alertTry()
            }
        }, 3000)
        // logicApiRest()
    }
    const WaktuTersisa = () => {
        let now = moment(new Date())
        let end = moment(restTime)
        setWaktuIstirahat(now.diff(end, 'minutes') + " Menit")
    }
    const SelesaiIstirahat = () => {
        setIsLoading(true)
        locationStatus()
        LoginRe()
        WaktuTersisa()
        setTimeout(()=>{
            if (longitude !== null && latitude !== null) {
                WaktuTersisa()
                const payload = {
                    jam2: moment().format("h:mm:ss"),
                    ket: waktuIstirahat,
                    lat2: latitude,
                    long2: longitude
                }
                const data = {
                    title: titleRest
                }
                logicApiRestOut({ payload, data }).then(data => {
                    if (data === true) {
                        console.log(data)
                        setStatusRest('finish')
                        setIsLoading(false)
                    }
                    else {
                        setIsLoading(false)
                        alertTry2()
                    }
                })
            }
            else {
                setIsLoading(false)
                alertTry2()
            }
        },3000)
    }
    if (isLoading) {
        return(
        <View style={styles.ButtonTutupBawah}>
            <LoadingScreens/>
        </View>
        )
    }
    else {

        if (props.istirahatEn) {
            if (statusTapIn == 'WORK' && !statusRest) {
                return (
                    <TouchableOpacity style={styles.ButtonIstirahat} onPress={() => {
                        alertIstirahat()
                    }}>
                        <Text style={{
                            fontFamily: 'Merriweather_700Bold',
                            color: '#fff'
                        }}>
                            Istirahat
                        </Text>
                    </TouchableOpacity>
                )
            }
            if (statusTapIn == 'WORK' && statusRest == 'OUT') {
                return (
                    <TouchableOpacity style={styles.ButtonSelesaiBawah} onPress={() => {
                        alertSelesaiIstirahat()
                    }}>
                        <Text style={{
                            fontFamily: 'Merriweather_700Bold',
                            color: '#fff',
                            textAlign: 'center'
                        }}>
                            Selesai{`\n`}Istirahat
                        </Text>
                    </TouchableOpacity>
                )
            }
            else {
                return (
                    <TouchableOpacity style={styles.ButtonTutupBawah}>
                        <Text style={{
                            fontFamily: 'Merriweather_700Bold',
                            color: '#fff'
                        }}>
                            Tutup
                        </Text>
                    </TouchableOpacity>
                )
            }

        }
        else {
            return (
                <TouchableOpacity style={styles.ButtonTutupBawah}>
                    <Text style={{
                        fontFamily: 'Merriweather_700Bold',
                        color: '#fff'
                    }}>
                        Tutup
                    </Text>
                </TouchableOpacity>
            )
        }
    }
}