import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
export default function EyeIconSecure(props) {
    if (props.showPwd) {
        return (
            <Icon name="ios-eye-off" size={25} color="black" style={{ padding: 10 }}  />
        )
    }
    else {
        return (
            <Icon name="ios-eye" size={25} color="black" style={{ padding: 10 }}  />
        )
    }
}