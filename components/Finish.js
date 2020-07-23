import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import styles from './styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddPeople from "./AddPeople";

export default class Finish extends Component {
    constructor(props){
      super(props);
    }

    render() {
        return (
            <View style={styles.menu}>
                <View style={{flexDirection: 'row'}}>

                    <View style={{flex:1, alignItems: 'flex-start'}}>
                        <Icon.Button
                            name="arrow-left"
                            color="white"
                            backgroundColor='#5f8dd3'
                            onPress={() => this.props.updateMenuStatus('AddPeople')}
                        />
                    </View>
                    <View style={{flex:1, alignItems: 'flex-end'}}>
                        <Icon.Button
                            name="undo"
                            color="white"
                            backgroundColor='#5f8dd3'
                            onPress={() => this.props.updateMenuStatus('AddPeople')}
                        />
                    </View>
                </View>
                <View style={styles.title_area}>
                    <Text style={styles.title}>Subtotal</Text>
                    <Text style={styles.title}>$ {this.props.total_value}</Text>
                </View>
                <View style={styles.title_area}>
                    <Text style={styles.title}>Tax</Text>
                    <Text style={styles.title}>({this.props.tax_percentage}%) = $ {(this.props.total_value * this.props.tax_percentage / 100).toFixed(2)}</Text>
                </View>
                <View style={styles.title_area}>
                    <Text style={styles.title}>Tip</Text>
                    <Text style={styles.title}>({this.props.tip_percentage}%) = $ {(this.props.total_value * this.props.tip_percentage / 100).toFixed(2) }</Text>
                </View>
                <View style={styles.title_area}>
                    <Text style={styles.title}>Grand Total</Text>
                    <Text style={styles.title}>$175</Text>
                </View>
            </View>
        );
    }  
}  
