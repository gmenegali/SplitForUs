import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    menu: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red',
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'center',
        marginTop: 15,
    },
    interface: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: 'blue',
    },
});

export default class App extends Component {  
    constructor(props){
      super(props);
      this.updateNumPeople = this.updateNumPeople.bind(this)
    }

    state = {  
        people: 2,
        current_value: 0,
        interface_width: 0,
        interface_height: 0,
    }
    
    updateNumPeople(sign){
        var current = this.state.people;
        if(sign === "+"){
            if(current < 10){
                current += 1;
            }
        } else {
            if(current > 2){
                current -= 1;
            }
        }

        this.setState({ people: current })
    }

    set_layout_dimesions(layout){
        const { width, height } = layout;
        this.setState({ interface_width: width, interface_height: height })
    }


    render() {
        const n = this.state.people;
        const interface_width = this.state.interface_width;
        const interface_height = this.state.interface_height;
        const radius = 60;

        const plates = []
        const alpha = 2*Math.PI / n;

        for (let index = 0; index < n; index +=1) {
            plates.push(
                <TouchableHighlight
                    style = {{
                        position: 'absolute',
                        borderRadius: radius,
                        width: radius,
                        height: radius,
                        top: interface_height/2 - radius/2 + 100 * Math.cos(index*alpha),
                        left: interface_width/2 - radius/2 + 100 * Math.sin(index*alpha),
                        backgroundColor:'#f00',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    key = { index }
                    onPress = { () => alert('Yaay!') }
                    underlayColor = '#ccc'
                >
                    <Text> { index ? 'P'+index : "YOU" }</Text>
                </TouchableHighlight>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.menu}>
                    <View style={styles.title}>
                        <Text> How many people? </Text>
                    </View>
                    <Button
                        title="+"
                        color="green"
                        onPress={ () => this.updateNumPeople('+') }
                    />
                    <Button
                        title="-"
                        color="green"
                        onPress={ () => this.updateNumPeople('-') }
                    />
                    <View style={styles.title}>
                        <Text> {this.state.people} </Text>
                    </View>
                </View>
                <View
                    onLayout={(event) => {
                        this.set_layout_dimesions(event.nativeEvent.layout)
                    }}
                    style={styles.interface}>
                        { plates }
                </View>
            </View>
        );  
    }  
}  
