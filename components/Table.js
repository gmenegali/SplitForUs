import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogChangeNameVisible: false,
      personSelected: -1,
      interfaceWidth: 0,
      interfaceHeight: 0,
    };
  }

  openDialogChangeName = (index) => {
    this.setState({ dialogChangeNameVisible: true, personSelected: index });
  }

  submitDialogChangeName = (name) => {
    const { updatePeopleName } = this.props;
    const { personSelected } = this.state;
    updatePeopleName(name, personSelected);
    this.setState({ dialogChangeNameVisible: false });
  }

  closeDialogChangeName = () => {
    this.setState({ dialogChangeNameVisible: false });
  }

  setLayoutDimensions = (layout) => {
    const { width, height } = layout;
    this.setState({ interfaceWidth: width, interfaceHeight: height });
  }

  render() {
    const {
      numPeople,
      menuStatus,
      peopleSelected,
      peopleNames,
      peopleValues,
      updatePeopleSelected,
      taxPercentage,
      tipPercentage,
    } = this.props;

    const {
      interfaceWidth,
      interfaceHeight,
    } = this.state;

    const { dialogChangeNameVisible } = this.state;

    const plateRadius = 35;
    const tableRadius = (interfaceHeight - 2 * plateRadius) / 2 - 10;

    const plateColors = ['#DC143C', '#008080', '#98473E', '#87CEFA',
      '#505050', '#DA70D6', '#00FA9A', '#F0E68C', '#FF6347', '#191970'];
    const plates = [];
    const alpha = (2 * Math.PI) / numPeople;

    // Adds the table
    plates.push(
      <TouchableHighlight
        style={{
          ...styles.plate,
          borderColor: 'white',
          backgroundColor: 'white',
          width: 4 * plateRadius,
          height: 4 * plateRadius,
          top: interfaceHeight / 2 - 2 * plateRadius,
          left: interfaceWidth / 2 - 2 * plateRadius,
        }}
        key={11}
            // onPress={() => this.openDialogChangeName()}
        underlayColor="#ccc"
      >
        <Text>
          {/* Click who shared */}
        </Text>
      </TouchableHighlight>,
    );

    for (let index = 0; index < numPeople; index += 1) {
      let plateText;
      if (menuStatus === 'Finish') {
        const tipValue = ((peopleValues[index] * tipPercentage) / 100);
        const taxValue = ((peopleValues[index] * taxPercentage) / 100);
        plateText = `${peopleNames[index]}\n$${(peopleValues[index] + tipValue + taxValue).toFixed(2)}`;
      } else {
        plateText = `${peopleNames[index]}\n$${peopleValues[index].toFixed(2)}`;
      }
      plates.push(
        <TouchableHighlight
          style={{
            ...styles.plate,
            borderColor: plateColors[index],
            backgroundColor: (
              menuStatus === 'AddPeople'
              || menuStatus === 'AddItem'
              || menuStatus === 'Finish'
              || peopleSelected[index]
            ) ? 'white' : 'gray',
            width: 2 * plateRadius,
            height: 2 * plateRadius,
            top: interfaceHeight / 2 - plateRadius + tableRadius * Math.cos(index * alpha),
            left: interfaceWidth / 2 - plateRadius + tableRadius * Math.sin(index * alpha),
          }}
          key={index}
          onPress={() => (menuStatus === 'AddPeople' ? this.openDialogChangeName(index) : updatePeopleSelected(index))}
          underlayColor="#ccc"
        >
          <Text>
            { plateText }
          </Text>
        </TouchableHighlight>,
      );
    }

    return (
      <View
        onLayout={(event) => {
          this.setLayoutDimensions(event.nativeEvent.layout);
        }}
        style={styles.interface}
      >
        <DialogInput
          isDialogVisible={dialogChangeNameVisible}
          title="Changing the name"
          hintInput="Enter the name of the person (Max Length = 5)"
          textInputProps={{ maxLength: 5 }}
          submitInput={(name) => { this.submitDialogChangeName(name); }}
          closeDialog={() => { this.closeDialogChangeName(); }}
        />
        {plates}
      </View>

    );
  }
}

Table.propTypes = {
  numPeople: PropTypes.number.isRequired,
  tipPercentage: PropTypes.number.isRequired,
  taxPercentage: PropTypes.number.isRequired,
  menuStatus: PropTypes.string.isRequired,
  peopleSelected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  peopleNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  peopleValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  updatePeopleSelected: PropTypes.func.isRequired,
  updatePeopleName: PropTypes.func.isRequired,
};
