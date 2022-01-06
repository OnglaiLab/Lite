import React from "react";
import moment from "moment";
import 'moment/locale/id'
import AsyncStorage from "@react-native-async-storage/async-storage";

const logicApiRest = async (props) => {
    try {
        let res = await fetch('https://onglai.id/api/resource/Lunch', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props.payload),
        });
        res = await res.json();
        console.log(res)
        if (res.data.ket == "Keluar Istirahat") {
            const RestMethod = {
                statusRest: 'OUT',
                restTime: moment().format(),
                titleRest: res.data.name,
            }
            AsyncStorage.setItem('RestMethod', JSON.stringify(RestMethod));
            const data = true
            return data
        }
        else {
            const data = false
            return data
        }
    } catch (e) {
        console.error(e);
        const data = false
        return data
    }
}
export default logicApiRest