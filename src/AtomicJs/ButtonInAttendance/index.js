

// Author: Kevin Adhi Krisma
// Website: kepsgurih.github.io
// email: kepsgurih@gmail.com


import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, Alert, View } from "react-native";
import LoginRe from "../../Api/LoginRe";
import moment from "moment";
import 'moment/locale/id'
import styles from '../../Style/in'
import AsyncStorage from "@react-native-async-storage/async-storage";
import clearData from '../../Api/clearData'
import logicApi from "../../Api/logicApi";
import Geolocation from '@react-native-community/geolocation';
import LoadingScreen from '../LoadingScreens'

export default function ButtonInAttendance(props) {
    // Ini Adalah state
    const [user, setUser] = useState()
    const [sekarang, setSekarang] = useState(moment().format("D"))
    const [statusTapIn, setStatusTapIn] = useState()
    const [tanggalTerakhir, setTanggalTerakhir] = useState()
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        function sTanggal() {
            setSekarang(moment().format("D"))
        }
        async function fetchStatus() {
            AsyncStorage.getItem('DataHadir', (error, result) => {
                let resultParsed = JSON.parse(result)
                if (result) {
                    setStatusTapIn(resultParsed.statusTapIn)
                    setTanggalTerakhir(resultParsed.tanggalTerakhir)
                }
                console.log(resultParsed)
                console.log(result)
            })
        }
        async function userFetch() {
            AsyncStorage.getItem('userEnd', (error, result) => {
                if (result) {
                    let resultParsed = JSON.parse(result)
                    setUser(resultParsed.name)
                    console.log(user)
                }
            })
        }
        locationStatus()
        hariAbsen()
        sTanggal()
        fetchStatus()
        userFetch()
    }, [])
    const clearAbsen = () => {
        clearData().then(data => {
            if (data === true) {
                props.navigation.navigate('SplashScreen')
            }
        })
    }
    // Cek Hari Terakhir absen
    const hariAbsen = () => {
        const A1222 = tanggalTerakhir
        const A1223 = sekarang
        if (A1222 > 0 && A1222 <= 31 && A1223 > 0 && A1223 < 31) {
            if (A1222 !== A1223) {
                clearAbsen()
            }
        }
    }


    // Komponen di jalankan
    const alertMasuk = () => {
        locationStatus()
        Alert.alert('Perhatian !', `Apa anda berada di lokasi yang tepat untuk absensi Masuk\nPihak Manajemen akan cek lokasi anda pada sistem absensi`, [
            {
                text: 'Tidak',
                onPress: () => console.log(user),
                style: 'cancel',
            },
            { text: 'Ya', onPress: () => Masuk() },
        ]);
    }
    const alertPulang = () => {
        locationStatus()
        Alert.alert('Perhatian !', `Apa anda berada di lokasi yang tepat untuk absensi Pulang\nPihak Manajemen akan cek lokasi anda pada sistem absensi`, [
            {
                text: 'Tidak',
                onPress: () => console.log(user),
                style: 'cancel',
            },
            { text: 'Ya', onPress: () => Pulang() },
        ]);
    }
    const alertTelat = () => {
        locationStatus()
        Alert.alert('Peringatan !', `Apa anda berada di lokasi yang tepat untuk absensi\nPihak Manajemen akan cek lokasi anda pada sistem absensi\n\nSaya Akan menanggung konsekuensi bahwa saya telat`, [
            {
                text: 'Tidak',
                onPress: () => console.log(user),
                style: 'cancel',
            },
            { text: 'Ya', onPress: () => Masuk() },
        ]);
    }
    const alertTry = () => {
        locationStatus()
        Alert.alert('Gagal !', `Aplikasi terdapat gangguan ketika mencoba membaca lokasi anda, coba lagi ?`, [

            { text: 'Ya' },
        ]);
    }
    function locationStatus() {
        Geolocation.getCurrentPosition(info => {
            console.log(info.coords.longitude)
            setLatitude(info.coords.latitude)
            setLongitude(info.coords.longitude)
        });
    }
    const test = () => {
        console.log(1)
        console.log(2)
        setTimeout(() => {
            console.log(3)
        }, 5000)
        console.log(4)
    }
    const Masuk = () => {
        setIsLoading(true)
        LoginRe()
        locationStatus()
        setTimeout(() => {
            if (longitude !== null && latitude !== null) {
                let payload = {
                    employee_name: user,
                    log_type: 'IN',
                    timestame: moment().format("DD-MM-YYYY") + ' ' + moment().format("h:mm:ss"),
                    longitude: longitude,
                    latitude: latitude,
                }
                logicApi({ payload }).then(data => {
                    if (data === true) {
                        setStatusTapIn('WORK')
                        console.log(statusTapIn)
                        props.navigation.navigate('SplashScreen')
                        setIsLoading(false)
                    }
                    else {
                        setIsLoading(false)
                        console.log('error')
                    }
                })
            }
            else {
                setIsLoading(false)
                alertTry()
            }
        }, 3000)
    }
    const Pulang = () => {
        setIsLoading(true)
        LoginRe()
        locationStatus()
        setTimeout(() => {
            if (longitude !== null && latitude !== null) {
                let payload = {
                    employee_name: user,
                    log_type: 'OUT',
                    timestame: moment().format("DD-MM-YYYY") + ' ' + moment().format("h:mm:ss"),
                    longitude: longitude,
                    latitude: latitude,
                }
                logicApi({ payload }).then(data => {
                    if (data === true) {
                        setStatusTapIn('HOME')
                        console.log(statusTapIn)
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
    }
    if (isLoading) {
        return (
            <View style={styles.ButtonCancel}>
                <LoadingScreen />
            </View>
        )
    }
    else {

        if (props.shiftType == 'IN') {
            if (statusTapIn == 'WORK') {
                return (
                    <TouchableOpacity style={styles.ButtonWork} >
                        <Text style={{
                            fontFamily: 'Merriweather_700Bold',
                            color: '#fff'
                        }}>
                            Bekerja
                        </Text>
                    </TouchableOpacity>

                )
            }
            return (
                <TouchableOpacity style={styles.ButtonMasuk} onPress={() => {
                    alertMasuk()
                }}>
                    <Text style={{
                        fontFamily: 'Merriweather_700Bold',
                        color: '#fff'
                    }}>
                        Masuk
                    </Text>
                </TouchableOpacity>
            )
        }
        else if (props.shiftType == 'LEAVEIN') {
            if (statusTapIn == 'WORK') {
                return (
                    <TouchableOpacity style={styles.ButtonWork}>
                        <Text style={{
                            fontFamily: 'Merriweather_700Bold',
                            color: '#fff'
                        }}>
                            Bekerja
                        </Text>
                    </TouchableOpacity>

                )
            }
            return (
                <TouchableOpacity style={styles.ButtonTelat} onPress={() => {
                    alertTelat()
                }}>
                    <Text style={{
                        fontFamily: 'Merriweather_700Bold',
                        color: '#fff'
                    }}>
                        Telat
                    </Text>
                </TouchableOpacity>
            )
        }
        else if (props.shiftType == 'LEAVEOUT') {
            if (statusTapIn == 'HOME') {
                return (
                    <TouchableOpacity style={styles.ButtonCancel}>
                        <Text style={{
                            fontFamily: 'Merriweather_700Bold',
                            color: '#fff'
                        }}>
                            Tutup
                        </Text>
                    </TouchableOpacity>

                )
            }
            return (
                <TouchableOpacity style={styles.ButtonQOut}>
                    <Text style={{
                        fontFamily: 'Merriweather_700Bold',
                        color: '#fff'
                    }}>
                        Pulang Cepat
                    </Text>
                </TouchableOpacity>
            )
        }
        else if (props.shiftType == 'OUT') {
            if (statusTapIn == 'HOME') {
                return (
                    <TouchableOpacity style={styles.ButtonCancel}>
                        <Text style={{
                            fontFamily: 'Merriweather_700Bold',
                            color: '#fff'
                        }}>
                            Tutup
                        </Text>
                    </TouchableOpacity>

                )
            }
            return (
                <TouchableOpacity style={styles.ButtonOut} onPress={() => {
                    alertPulang()
                }}>
                    <Text style={{
                        fontFamily: 'Merriweather_700Bold',
                        color: '#fff'
                    }}>
                        Pulang
                    </Text>
                </TouchableOpacity>
            )

        }
        else {
            return (
                <TouchableOpacity style={styles.ButtonCancel}>
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