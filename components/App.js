import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import styles from './styles.js';
import AddPeople from './AddPeople';
import DistributeBills from './DistributeBills';
import Table from './Table';



export default class App extends Component {
    constructor(props){
      super(props);
      this.updateNumPeople = this.updateNumPeople.bind(this);
      this.updateMenuStatus = this.updateMenuStatus.bind(this);
      this.set_layout_dimesions = this.set_layout_dimesions.bind(this);
    }

    state = {  
        people: 2,
        interface_width: 0,
        interface_height: 0,
        people_names: ['You','P1','P2','P3','P4','P5','P6','P7','P8','P9'],
        people_values: [0,0,0,0,0,0,0,0,0,0],
        menu_status: 'AddPeople',
    }

    set_layout_dimesions(layout){
        const { width, height } = layout;
        this.setState({ interface_width: width, interface_height: height })
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
        this.setState({ people: current });
    }

    updateMenuStatus(value){
        this.setState({ menu_status: value });
    }

    render() {
        var menu;
        if(this.state.menu_status == 'AddPeople'){
            menu = 
                <AddPeople 
                    updateNumPeople = {this.updateNumPeople} 
                    people = {this.state.people} 
                    updateMenuStatus = {this.updateMenuStatus} 
                />
        }
        else if(this.state.menu_status == 'DistributeBills'){
            menu = 
                <DistributeBills
                    updateNumPeople = {this.updateNumPeople} 
                    people = {this.state.people} 
                    updateMenuStatus = {this.updateMenuStatus} 
                />   
        }

        return (
            <View style={styles.container}>
                { menu }
                <Table
                    people = {this.state.people}
                    interface_width = {this.state.interface_width}
                    interface_height = {this.state.interface_height}
                    people_names = {this.state.people_names}
                    people_values = {this.state.people_values}
                    set_layout_dimesions = {this.set_layout_dimesions}
                    menu_status = {this.state.menu_status}
                />
            </View>
        );
    }  
}