import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import styles from './styles.js';
import AddPeople from './AddPeople';
import AddItem from './AddItem';
import DistributeItem from './DistributeItem';
import Finish from './Finish';
import Table from './Table';



export default class App extends Component {
    constructor(props){
      super(props);
    }

    state = {  
        people: 2,
        interface_width: 0,
        interface_height: 0,
        people_names: ['You','P1','P2','P3','P4','P5','P6','P7','P8','P9'],
        people_values: [0,0,0,0,0,0,0,0,0,0],
        total_value: 0,
        tax_percentage: 8,
        tip_percentage: 10,
        people_selected: [false,false,false,false,false,false,false,false,false,false],
        menu_status: 'AddPeople',
        current_value: 0,
    }

    set_layout_dimesions = (layout) => {
        const { width, height } = layout;
        this.setState({ interface_width: width, interface_height: height })
    }

    updatePeopleName = (name, index) => {
        if(name){
            let names = this.state.people_names;
            names[index] = name;
            this.setState({people_names: names});
        }
    }

    updateNumPeople = (sign) => {
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

    updateMenuStatus = (value) => {
        let selected = this.state.people_selected;
        if(value == 'DistributeItem'){
            for(let i=0; i<10; i+=1)
                selected[i] = false;
        }
        this.setState({menu_status: value, people_selected: selected});
    }

    updateCurrentValue = (val) => {
        let new_value;
        let current = this.state.current_value;
        if(val != -1){
            new_value =  (current * 10 + val/100).toFixed(2);
        } else {
            let remove_value = ((current - Math.floor(current)).toFixed(2) * 10 % 1 / 10).toFixed(2);
            new_value = ((current-remove_value)/10).toFixed(2);
        }
        this.setState({ current_value: new_value });
    }

    updatePeopleSelected = (index) => {
        let selected = this.state.people_selected;
        selected[index] = !selected[index];
        this.setState({ people_selected: selected});
    }

    updatePeopleSelectedAll = (command) => {
        let selected = this.state.people_selected;
        if(command == 1){
            for(let i=0; i<10; i+=1)
                selected[i] = true;
        } else if(command == -1){
            for(let i=0; i<10; i+=1)
                selected[i] = true;
        }
        this.setState({ people_selected: selected});
    }

    showAlert = (title, message) => {
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    splitItem = () => {
        let count_selected = 0;
        let num_people = this.state.people;
        let selected = this.state.people_selected;
        let current_values = this.state.people_values;
        let newTotal = this.state.total_value;

        for(let i=0; i<num_people; i+=1){
            if(selected[i] === true)
                count_selected += 1;
        }
        if(count_selected === 0){
            this.showAlert('Oh ...', 'Select who split the item')
        } else{
            let total_value = this.state.current_value;
            let split_value = (Math.ceil(total_value/count_selected * 100) /100).toFixed(2);
            newTotal = (parseFloat(newTotal) + parseFloat(total_value)).toFixed(2);

            for(let i=0; i<num_people; i+=1){
                if(selected[i] == true){
                    current_values[i] = (parseFloat(current_values[i]) +  parseFloat(split_value)).toFixed(2);
                }
            }

            this.setState({
                people_values: current_values,
                people_selected: [false,false,false,false,false,false,false,false,false,false],
                menu_status: 'AddItem',
                current_value: 0,
                total_value: newTotal,
            });
        }
    }

    restart = () => {
        this.setState({
            people: 2,
            interface_width: 0,
            interface_height: 0,
            people_names: ['You','P1','P2','P3','P4','P5','P6','P7','P8','P9'],
            people_values: [0,0,0,0,0,0,0,0,0,0],
            people_selected: [false,false,false,false,false,false,false,false,false,false],
            menu_status: 'AddPeople',
            current_value: 0,
            distribute_status: 'SelectPeople',
        });
    }

    render() {
        var menu;
        if(this.state.menu_status == 'AddPeople'){
            menu =
                <AddPeople
                    {...this.state}
                    updateNumPeople={this.updateNumPeople}
                    updateMenuStatus={this.updateMenuStatus}
                />;
        }
        else if(this.state.menu_status == 'AddItem') {
            menu =
                <AddItem
                    {...this.state}
                    updateMenuStatus = {this.updateMenuStatus}
                    updateCurrentValue = {this.updateCurrentValue}
                    showAlert = {this.showAlert}
                />
        }
        else if(this.state.menu_status == 'DistributeItem') {
            menu =
                <DistributeItem
                    {...this.state}
                    updateNumPeople = {this.updateNumPeople}
                    updateMenuStatus = {this.updateMenuStatus}
                    updateCurrentValue = {this.updateCurrentValue}
                    updatePeopleSelectedAll = {this.updatePeopleSelectedAll}v
                    splitItem = {this.splitItem}
                />
        }
        else if(this.state.menu_status == 'Finish') {
            menu =
                <Finish
                    {...this.state}
                    updateMenuStatus = {this.updateMenuStatus}
                />
        }

        return (
            <View style={styles.container}>
                { menu }
                <Table
                    {...this.state}
                    set_layout_dimesions = {this.set_layout_dimesions}
                    updatePeopleSelected = {this.updatePeopleSelected}
                    updatePeopleName = {this.updatePeopleName}
                />
            </View>
        );
    }  
}