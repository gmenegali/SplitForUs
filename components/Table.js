import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import styles from './styles.js';

export default class Table extends Component {
    constructor(props){
      super(props);
    }

    state = {
        dialogInputVisible: false,
        index_selected: -1,
    }

    openDialogInput = (index) => {
        this.setState({dialogInputVisible: true, index_selected: index});
    }

    submitDialogInput = (name) => {
        this.props.updateName(name, this.state.index_selected);
        this.setState({dialogInputVisible: false});
    }

    closeDialogInput = () => {
        this.setState({dialogInputVisible: false});
    }

    render() {
        const n = this.props.people;
        const interface_width = this.props.interface_width;
        const interface_height = this.props.interface_height;
        const plate_radius = 35;
        const table_radius = (interface_height - 2 * plate_radius) / 2 - 10;

        const plate_colors = ['#DC143C', '#008080', '#98473E', '#87CEFA',
            '#505050', '#DA70D6', '#00FA9A', '#F0E68C', '#FF6347', '#191970']
        const plates = []
        const alpha = 2 * Math.PI / n;

        if(this.props.menu_status == 'DistributeBills'){
            plates.push(
                <TouchableHighlight
                    style={{
                        ...styles.plate,
                        borderColor: 'white',
                        backgroundColor: 'white',
                        width: 4 * plate_radius,
                        height: 4 * plate_radius,
                        top: interface_height / 2 - 2* plate_radius,
                        left: interface_width / 2 - 2* plate_radius,
                    }}
                    key={11}
                    onPress={() => this.openDialogInput()}
                    underlayColor='#ccc'
                >
                    <Text>
                        Click who shared
                    </Text>
                </TouchableHighlight>
            )
        }
        if(this.props.distribute_status == 'Split'){
            plates.push(
                <TouchableHighlight
                    style={{
                        backgroundColor: 'green',
                        width: 65,
                        height: 20,
                        top: interface_height - 40,
                        left: interface_width - 70,
                    }}
                    key={12}
                    onPress={() => this.props.updatePeopleSelectedAll(1)}
                    underlayColor='#ccc'
                >
                    <Text style={{color: 'white', marginLeft: 4}}>
                        Select all
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
                        backgroundColor: (
                            this.props.distribute_status == 'SelectPeople' ||
                            this.props.people_selected[index]) ?
                            'white': 'gray',
                        width: 2 * plate_radius,
                        height: 2 * plate_radius,
                        top: interface_height / 2 - plate_radius + table_radius * Math.cos(index * alpha),
                        left: interface_width / 2 - plate_radius + table_radius * Math.sin(index * alpha),
                    }}
                    key={index}
                    onPress={() => this.props.menu_status == 'AddPeople' ? this.openDialogInput(index) : this.props.updatePeopleSelected(index)}
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
                <DialogInput
                    isDialogVisible={this.state.dialogInputVisible}
                    title={"Changing the name"}
                    hintInput ={"Enter the name of the person (Max Length = 5)"}
                    textInputProps={{maxLength:5}}
                    submitInput={ (name) => {this.submitDialogInput(name)} }
                    closeDialog={ () => {this.closeDialogInput()}}>
                </DialogInput>
                {plates}
            </View>

        );
    }  
}  
