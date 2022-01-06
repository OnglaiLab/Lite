import React from "react";
import moment from "moment";
import 'moment/locale/id'
import AsyncStorage from "@react-native-async-storage/async-storage";

const logicApiRestOut = async (props) => {
    try {
        let res = await fetch('https://onglai.id/api/resource/Lunch/' + props.data.title, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props.payload),
        });
        res = await res.json();
        console.log(res)
        if (res.data.name == props.data.title) {
            const RestMethod = {
                statusRest: 'finish',
                restTime: null,
                titleRest: null
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
export default logicApiRestOut