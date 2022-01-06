
import React, { Component } from "react";
import { Text, SafeAreaView, View, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import HeaderIntro from "../../font/HeaderIntro";
import SvgComponent from "../../Background/SvgComponent";
import EyeIconSecure from "../../AtomicJs/EyeIconSecure";
import LoadingScreens from "../../AtomicJs/LoadingScreens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

// import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      usr: '',
      pwd: '',
      brkPass: true,
      showPwd: true,
      isLoading: false
    };
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.CardBroken = this.CardBroken.bind(this)
    this.LoginScreenPages = this.LoginScreenPages.bind(this)
    this.onLoginMount = this.onLoginMount.bind(this)
  }
  componentWillUnmount() {

  }
  onLoading() {
    if (this.state.isLoading) {
      this.setState({
        isLoading: false
      })
    }
    else {
      this.setState({
        isLoading: true
      })
    }
  }
  onUsernameChange = usr => {
    this.setState({ usr,
    brkPass: true });
  };
  // 999
  onPasswordChange = pwd => {
    this.setState({ pwd,
    brkPass: true });
  };
  async onLoginMount() {
    this.onLoading()
    const { usr, pwd } = this.state;
    const payload = { usr, pwd };
    try {
      let res = await fetch('https://onglai.id/api/method/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      res = await res.json();
      if (res.message == 'Logged In') {
        AsyncStorage.setItem('account', JSON.stringify(payload));
        axios.post(`https://onglai.id/api/method/frappe.integrations.oauth2.openid_profile`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'application/json'
            }
          })
            .then((response) => {
              AsyncStorage.setItem('userEnd', JSON.stringify(response.data));
              this.props.navigation.replace('SplashScreen');
            })
            .catch(function (error) {
              // handle error
              console.log('error');
            })
      }
      else {
        this.onLoading()
        this.setState({
          brkPass: false
        })
      }
    } catch (e) {
      this.CardBroken()
    }
  }
  CardBroken() {
    return (
      <TouchableOpacity onPress={() => {
        this.setState({
          brkPass: true
        })
      }}>
        <View style={{ backgroundColor: 'red', marginTop: 50, alignContent: 'center', alignSelf: 'center', width: '50%', borderRadius: 30 }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'Merriweather_300Light', fontSize: 12, paddingHorizontal: 3, paddingVertical: 5 }}>Username / Password Salah !</Text>
        </View>
      </TouchableOpacity>
    )
  }
  LoginScreenPages() {
    return (
      <>
        <View style={[this.state.brkPass ? styles.InputContainer : styles.InputContainerFalse]}>
        <Icon name="ios-person" size={23} color="black" style={styles.iconCont} />
          <TextInput placeholder="Username" style={styles.inputText} onChangeText={this.onUsernameChange} value={this.state.usr} onPress={()=>{}} />
        </View>
        <View style={[this.state.brkPass ? styles.InputContainer : styles.InputContainerFalse]}>
          <Icon name="ios-key" size={23} color="black" style={styles.iconCont} />
          <TextInput placeholder="Password" style={styles.inputText} onChangeText={this.onPasswordChange} secureTextEntry={this.state.showPwd} value={this.state.pwd} onSubmitEditing={() => {
            this.onLoginMount(); // called only when multiline is false
          }}
            onKeyPress={(event) => {
              if (event.nativeEvent.key == "Enter") {
                alert(event.nativeEvent.key) //called when multiline is true
                this.onLoginMount()
              }
            }} />
          <TouchableOpacity onPress={() => {
            if (this.state.showPwd) {
              this.setState({
                showPwd: false
              })
            }
            else {
              this.setState({
                showPwd: true
              })
            }
          }}>
            <EyeIconSecure showPwd={this.state.showPwd} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
          this.onLoginMount()
        }}>
          <Text style={styles.buttonText}>
            Masuk.
          </Text>
          <View style={styles.iconArrow}>
          <Icon name="ios-arrow-forward" size={24} color="#f58220"  />
          </View>
        </TouchableOpacity>
      </>
    )
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <SvgComponent />
        {!this.state.brkPass ? this.CardBroken() : null}
        <View style={styles.container}>
          <HeaderIntro text={!this.state.isLoading ? `Halo !` : `Wait.`} sub={!this.state.isLoading ? `Silahkan masuk ke akun anda` : `Silahkan Tunggu Sebentar`} />
          {!this.state.isLoading ? this.LoginScreenPages() : LoadingScreens()}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', flex: 1, justifyContent: 'center'
  },
  iconArrow: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginLeft: 5,
    borderRadius: 15
  },
  iconCont: {
    padding: 10
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginHorizontal: 30
  },
  buttonText: {
    fontFamily: 'Merriweather-Black',
    fontSize: 20,
    top: 5,
  },
  InputContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    borderRadius: 20,
    paddingHorizontal: 5,
    borderColor: '#000',
    shadowColor: "#52006A",
    shadowOffset: {
      width: -2, height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#fff',
    elevation: 30,
    marginVertical: 5,
  },
  InputContainerFalse: {
    flexDirection: 'row',
    marginHorizontal: 30,
    borderRadius: 20,
    paddingHorizontal: 5,
    borderColor: '#000',
    shadowColor: "#52006A",
    shadowOffset: {
      width: -2, height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#ff837a',
    elevation: 30,
    marginVertical: 5,
  },
  inputText: {
    flex: 1,
    fontFamily: 'Merriweather-Regular'
  }
})