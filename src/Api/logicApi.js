import React from "react";
import moment from "moment";
import 'moment/locale/id'
import AsyncStorage from "@react-native-async-storage/async-storage";

const logicApi = async (props) => {
    try {
        let data
        let res = await fetch('https://onglai.id/api/resource/Employee%20Checkin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props.payload),
        });
        res = await res.json();
        console.log(res)
        if (props.payload.log_type === 'IN') {
            const payl = {
                statusTapIn:'WORK',
                tanggalTerakhir:moment().format("D")
            }
            try{
                AsyncStorage.setItem('DataHadir', JSON.stringify(payl))
            }
            catch(e){
                console(e)
            }
            let data = true
            return data
        }
        if (props.payload.log_type === 'OUT') {
            const Jso = {
                statusTapIn: 'HOME',
                tanggalTerakhir: moment().format("D")
            }
            await AsyncStorage.setItem('DataHadir', JSON.stringify(Jso));
            let data = true
            return data
        }
        else{
            let data = false
            return data
        }
    } catch (e) {
        console.error(e);
        const data = false
        return data
    }
}
export default logicApi