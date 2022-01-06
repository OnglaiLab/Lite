import AsyncStorage from "@react-native-async-storage/async-storage";

async function clearData(){
    await AsyncStorage.removeItem('RestMethod');
    await AsyncStorage.removeItem('DataHadir');
    await AsyncStorage.removeItem('statusRest');
    let data = true
    return data
}

export default clearData