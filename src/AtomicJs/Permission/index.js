import React, { useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, ImageBackground, ActivityIndicator, Linking,TouchableOpacity } from 'react-native'
import SettingFG from '../../Background/settingFG'
// import * as Location from 'expo-location';

export default function Permission() {
    const BukaSettigns = () => {
        Linking.openSettings();
        // alert('tai')
    }
    return (
        <View>
            <View style={styles.containerImage}>
                <SettingFG/>
            </View>
            <Text style={styles.text1}>Untuk menggunakan Aplikasi Kantor, Ijinkan penggunaan lokasi</Text>
            <Text style={styles.text2}>Buka Pengaturan ► Aplikasi ► Ijin Lokasi</Text>
            <TouchableOpacity style={styles.buttonTouch} onPress={() => {
               BukaSettigns()
            }}>
                <Text style={styles.buttonText}>Pengaturan</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerImage: {
        alignSelf: 'center',
        marginBottom: 40
    },
    images: {
        flex: 1,
        justifyContent: 'center'
    },
    text1: {
        paddingHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'Merriweather-Bold'
    },
    text2: {
        backgroundColor: '#8a8a8a',
        color: '#e1f5e7',
        borderRadius: 20,
        paddingHorizontal:20,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        fontSize:11,
        textAlign: 'center',
        fontFamily: 'Merriweather-Regular'
    },
    buttonTouch: {
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 2,
        marginTop:10,
        zIndex:1,
        marginHorizontal: '25%',
        justifyContent: 'center',
        backgroundColor: '#5aff52'
    },
    buttonText: {
        justifyContent: 'center',
        marginHorizontal: 20,
        fontFamily: 'Merriweather-Bold',
        color: '#042e01'

    }
})