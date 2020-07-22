import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import styles from './styles.js';
import AddPeople from './AddPeople';
import DistributeBills from './DistributeBills';
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
        people_selected: [false,false,false,false,false,false,false,false,false,false],
        menu_status: 'AddPeople',
        current_value: 0,
        distribute_status: 'SelectPeople',
    }

    set_layout_dimesions = (layout) => {
        const { width, height } = layout;
        this.setState({ interface_width: width, interface_height: height })
    }

    updateName = (name, index) => {
        let names = this.state.people_names;
        names[index] = name;
        this.setState({people_names: names});
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
        this.setState({ menu_status: value });
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

    updateDistributeStatus = (value) => {
        let selected = this.state.people_selected;
        if(value == 'Split'){
            for(let i=0; i<10; i+=1)
                selected[i] = false;
        }
        this.setState({distribute_status: value, people_selected: selected});
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
        else {
            menu = 
                <DistributeBills
                    {...this.state}
                    updateNumPeople = {this.updateNumPeople}
                    updateMenuStatus = {this.updateMenuStatus}
                    updateCurrentValue = {this.updateCurrentValue}
                    updateDistributeStatus = {this.updateDistributeStatus}

                />
        }

        return (
            <View style={styles.container}>
                { menu }
                <Table
                    {...this.state}
                    set_layout_dimesions = {this.set_layout_dimesions}
                    updatePeopleSelected = {this.updatePeopleSelected}
                    updatePeopleSelectedAll = {this.updatePeopleSelectedAll}
                    updateName = {this.updateName}
                />
            </View>
        );
    }  
}