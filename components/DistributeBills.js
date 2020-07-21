import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import styles from './styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DistributeBills extends Component {
    constructor(props){
      super(props);
    }

    state = {
        current_value: 0,
    }

    render() {
        return (
            <View style={styles.menu}>
                <View style = {{marginLeft: 5}}>
                    <Icon.Button 
                        name="arrow-left" 
                        color="white" 
                        backgroundColor='#5f8dd3'
                        onPress={ () => this.props.updateMenuStatus('AddPeople') }
                      />
                </View>
                <View style={styles.current_value_area}>
                    <Text style={styles.current_value}> Calc </Text>
                </View>
                <View style={styles.control_area}>
                    <View style={styles.button_area}>
                        <View style={{marginBottom: 3}}>

                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <Button
                                title="1"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                            <Button
                                title="2"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                            <Button
                                title="3"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <Button
                                title="4"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                            <Button
                                title="5"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                            <Button
                                title="6"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <Button
                                title="7"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                            <Button
                                title="8"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                            <Button
                                title="9"
                                color="#999999"
                                onPress={() => this.props.updateNumPeople('-')}
                            />
                        </View>
                    </View>
                    <View style={styles.counter_area}>

                    </View>
                </View>
                <View style={styles.next_area}>
                    
                </View>
            </View>
        );
    }  
}  
