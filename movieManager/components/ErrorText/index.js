import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
/**
 * 
 * @param {*} props : touched and error
 */

const ErrorText =(props) =>{
    if (!props.touched || !props.error){
        return null;
    }
    return (
            <View>
                <Text style={styles.errorText}>{props.error}</Text>
            </View>
        );
 };

 const styles=StyleSheet.create({
     errorText:{
        color: 'red',
        fontSize: 20,
     },
 })

export default ErrorText;