import React from "react";
import { Text } from "react-native";

export default function (props) {
    return (
        <>
            <Text style={{ fontFamily: 'Merriweather-Black', fontSize: 50 }}>{props.text}</Text>
            <Text style={{ fontFamily: 'Merriweather-Bold' ,marginBottom:30}}>{props.sub}</Text>
        </>
    )
}