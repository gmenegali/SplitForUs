import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    menu: {
        flex: 1,
        backgroundColor: '#5f8dd3',
    },
    interface: {
        flex: 2,
        backgroundColor: '#00A878',
    },
    title_area: {
        backgroundColor: '#5f8dd3',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 65,
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    control_area: {
        flex: 1,
        flexDirection: 'row',
    },
    button_area: {
        flex: 1,
        marginLeft: 25,
    },
    counter_area: {
        flex: 4,
        alignItems: 'center',
    },
    counter: {
        fontSize: 50,
        color: 'white',
    },
    next_area: {
        flex: 1,
    },
    plate: {
      position: 'absolute',
      borderRadius: 50,
      borderWidth: 5,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
    current_value_area: {
        backgroundColor: '#183059',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 65,
    },
    current_value: {
        fontSize: 20,
        color: 'white',
    },
});

export default styles;