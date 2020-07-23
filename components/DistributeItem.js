import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import styles from './styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddPeople from "./AddPeople";

export default class DistributeItem extends Component {
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
                <View style={styles.current_value_area}>
                    <Text style={styles.current_value}> $ {this.props.current_value} </Text>
                </View>

                <View style={styles.title_area_spaced}>
                    <Text style={styles.title}> Who split this item? </Text>
                    <Text style={styles.subtitle}> (Tap plates to select) </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginBottom: 10}}>
                        <Button
                            title="Split"
                            color="green"
                            onPress={() => this.props.splitItem()}
                        />
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button
                            title="Cancel"
                            color="red"
                            onPress={() => this.props.updateMenuStatus('AddItem')}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            title="Select all"
                            color="#999999"
                            onPress={() => this.props.updatePeopleSelectedAll(1)}
                        />
                    </View>
                </View>
            </View>
        );
    }  
}  
