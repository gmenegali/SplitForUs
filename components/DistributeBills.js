import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import styles from './styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddPeople from "./AddPeople";

export default class DistributeBills extends Component {
    constructor(props){
      super(props);
    }

    render() {
        var menu_button;
        if(this.props.distribute_status == 'SelectPeople'){
            menu_button =
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            title="Distribute"
                            color="#467bcc"
                            onPress={() => this.props.updateDistributeStatus('Split')}
                        />
                    </View>
                </View>
        } else if(this.props.distribute_status == 'Split') {
            menu_button =
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button
                            title="Cancel"
                            color="red"
                            onPress={() => this.props.updateDistributeStatus('SelectPeople')}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            title="Split"
                            color="green"
                            onPress={() => this.props.updateDistributeStatus('SelectPeople')}
                        />
                    </View>
                </View>
        }

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

                {menu_button}

                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={styles.digit_button}
                                onPress={() => this.props.updateCurrentValue('1')}
                                underlayColor='#467bcc'>
                                <Text style={styles.digit_button_text}>1</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={styles.digit_button}
                                onPress={() => this.props.updateCurrentValue('2')}
                                underlayColor='#467bcc'>
                                <Text style={styles.digit_button_text}>2</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={styles.digit_button}
                                onPress={() => this.props.updateCurrentValue('3')}
                                underlayColor='#467bcc'>
                                <Text style={styles.digit_button_text}>3</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={styles.digit_button}
                                onPress={() => this.props.updateCurrentValue('4')}
                                underlayColor='#467bcc'>
                                <Text style={styles.digit_button_text}>4</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={styles.digit_button}
                                onPress={() => this.props.updateCurrentValue('5')}
                                underlayColor='#467bcc'>
                                <Text style={styles.digit_button_text}>5</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={styles.digit_button}
                                onPress={() => this.props.updateCurrentValue('6')}
                                underlayColor='#467bcc'>
                                <Text style={styles.digit_button_text}>6</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={styles.digit_button}
                                onPress={() => this.props.updateCurrentValue('7')}
                                underlayColor='#467bcc'>
                                <Text style={styles.digit_button_text}>7</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={styles.digit_button}
                                onPress={() => this.props.updateCurrentValue('8')}
                                underlayColor='#467bcc'>
                                <Text style={styles.digit_button_text}>8</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={styles.digit_button}
                                onPress={() => this.props.updateCurrentValue('9')}
                                underlayColor='#467bcc'>
                                <Text style={styles.digit_button_text}>9</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableHighlight
                            style={styles.digit_button}
                            onPress={() => this.props.updateCurrentValue('0')}
                            underlayColor='#467bcc'>
                            <Text style={styles.digit_button_text}>0</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableHighlight
                            style={styles.digit_button}
                            onPress={() => this.props.updateCurrentValue('-1')}
                            underlayColor='#467bcc'>
                            <Text style={styles.digit_button_text}>⌫</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }  
}  
