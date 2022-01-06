import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  ToastAndroid
} from 'react-native';
import axios from 'axios';

import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderIntro from '../../font/HeaderIntro';
import LoadingScreens from '../../AtomicJs/LoadingScreens';
import SplashBg from '../../Background/SplashBg';

function SplashScreen({ navigation }) {
  //State for ActivityIndicator animation
  let rotateValueHolder = new Animated.Value(0);
  const [animating, setAnimating] = useState(true);
  const LoginUlang = async () => {
    let account = await AsyncStorage.getItem('account')
    axios.post(`https://onglai.id/api/method/login`, account, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'application/json'
      }
    })
      .then((response) => {
        ToastAndroid.show("Welcome to .LITE", ToastAndroid.SHORT);
          datass()
      })
      .catch(function (error) {
        ToastAndroid.show("Data Error", ToastAndroid.SHORT);
        datass()
      })
  }
  const datass = () => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('account', (error, result) => {
        navigation.replace(result === null ? 'Auth' : 'AttendanceScreen')
      });
    }, 5000);
  }
  useEffect(() => {
    LoginUlang()
  }, []);

  return (
    <View style={styles.container}>
      <SplashBg/>
      <View style={{position:'absolute'}}>
      <HeaderIntro text=".Lite" sub="Versi ringan aplikasi absensi"/>
      <LoadingScreens />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});