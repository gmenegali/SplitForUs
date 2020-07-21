import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import styles from './styles.js';

export default class AddPeople extends Component {
    constructor(props){
      super(props);
    }

    render() {
        return (
            <View style={styles.menu}>
                <View style={styles.title_area}>
                    <Text style={styles.title}> How many people? </Text>
                </View>
                <View style={styles.control_area}>
                    <View style={styles.button_area}>
                        <View style={{marginBottom: 3}}>
                            <Button
                                title="+"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('+')}
                            />
                        </View>
                        <View>
                            <Button
                                title="-"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                        </View>
                    </View>
                    <View style={styles.counter_area}>
                        <Text style={styles.counter}> {this.props.people } </Text>
                    </View>
                </View>
                <View style={styles.next_area}>
                    <Button
                        title="Next"
                        color="#999999"
                        onPress={ () => this.props.updateMenuStatus('DistributeBills') }
                    />
                </View>
            </View>
        );
    }  
}  
