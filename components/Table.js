import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import styles from './styles.js';

export default class Table extends Component {
    constructor(props){
      super(props);
    }

    render() {
        const n = this.props.people;
        const interface_width = this.props.interface_width;
        const interface_height = this.props.interface_height;
        const plate_radius = 35;
        const table_radius = (interface_height - 2 * plate_radius) / 2 - 10;

        const plate_colors = ['#DC143C', '#008080', '#98473E', '#87CEFA',
            '#808080', '#DA70D6', '#00FA9A', '#F0E68C', '#FF6347', '#191970']
        const plates = []
        const alpha = 2 * Math.PI / n;

        console.log(this.props.menu_status)

        if(this.props.menu_status == 'DistributeBills'){
            plates.push(
                <TouchableHighlight
                    style={{
                        ...styles.plate,
                        borderColor: 'white',
                        width: 4 * plate_radius,
                        height: 4 * plate_radius,
                        top: interface_height / 2 - 2* plate_radius,
                        left: interface_width / 2 - 2* plate_radius,
                    }}
                    key={11}
                    onPress={() => alert('Yaay!')}
                    underlayColor='#ccc'
                >
                    <Text>
                        Drag your item here
                    </Text>
                </TouchableHighlight>
            )
        }

        for (let index = 0; index < n; index += 1) {
            plates.push(
                <TouchableHighlight
                    style={{
                        ...styles.plate,
                        borderColor: plate_colors[index],
                        width: 2 * plate_radius,
                        height: 2 * plate_radius,
                        top: interface_height / 2 - plate_radius + table_radius * Math.cos(index * alpha),
                        left: interface_width / 2 - plate_radius + table_radius * Math.sin(index * alpha),
                    }}
                    key={index}
                    onPress={() => alert('Yaay!')}
                    underlayColor='#ccc'
                >
                    <Text>
                        { this.props.people_names[index] + "\n$" + this.props.people_values[index] }
                    </Text>
                </TouchableHighlight>
            )
        }

        return (
            <View
                onLayout={(event) => {
                    this.props.set_layout_dimesions(event.nativeEvent.layout)
                }}
                style={styles.interface}>
                {plates}
            </View>
        );
    }  
}  
