import AsyncStorage from "@react-native-async-storage/async-storage";
async function LoginRe() {
    let account = await AsyncStorage.getItem('account')
    try {
        let res = await fetch('https://onglai.id/api/method/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: account,
        });
        res = await res.json();
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}
export default LoginRe