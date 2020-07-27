import React, { Component } from 'react';
import {
  View, Alert,
} from 'react-native';
import styles from './styles';
import AddPeople from './AddPeople';
import AddItem from './AddItem';
import DistributeItem from './DistributeItem';
import Table from './Table';
import Finish from './Finish';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPeople: 2,
      interfaceWidth: 0,
      interfaceHeight: 0,
      peopleNames: ['You', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
      peopleValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      peopleUnfairCharges: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      totalValue: 0,
      taxPercentage: 8,
      tipPercentage: 12,
      peopleSelected: [false, false, false, false, false, false, false, false, false, false],
      menuStatus: 'AddPeople',
      currentValue: 0,
    };
  }

  setLayoutDimensions = (layout) => {
    const { width, height } = layout;
    this.setState({ interfaceWidth: width, interfaceHeight: height });
  }

  updatePeopleName = (name, index) => {
    if (name) {
      const { peopleNames } = this.state;
      peopleNames[index] = name;
      this.setState({ peopleNames });
    }
  }

  updateTaxPercentage = (value) => {
    this.setState({ taxPercentage: parseFloat(value) });
  }

  updateTipPercentage = (value) => {
    this.setState({ tipPercentage: parseFloat(value) });
  }

  updateNumPeople = (sign) => {
    let { numPeople } = this.state;
    if (sign === '+') {
      if (numPeople < 10) {
        numPeople += 1;
      }
    } else if (numPeople > 2) {
      numPeople -= 1;
    }
    this.setState({ numPeople });
  }

  updateMenuStatus = (value) => {
    const { peopleSelected } = this.state;
    if (value === 'DistributeItem') {
      for (let i = 0; i < 10; i += 1) peopleSelected[i] = false;
    }
    this.setState({ menuStatus: value, peopleSelected });
  }

  updateCurrentValue = (val) => {
    const { currentValue } = this.state;
    let newValue;
    if (parseFloat(val) !== -1) {
      newValue = (currentValue * 10 + val / 100).toFixed(2);
    } else {
      const removeValue = (
        (((currentValue - Math.floor(currentValue)).toFixed(2) * 10) % 1) / 10).toFixed(2);
      newValue = ((currentValue - removeValue) / 10).toFixed(2);
    }
    newValue = parseFloat(newValue);
    this.setState({ currentValue: newValue });
  }

  updatePeopleSelected = (index) => {
    const { peopleSelected } = this.state;
    peopleSelected[index] = !peopleSelected[index];
    this.setState({ peopleSelected });
  }

  updatePeopleSelectedAll = (command) => {
    const { peopleSelected } = this.state;
    if (command === 1) {
      for (let i = 0; i < 10; i += 1) peopleSelected[i] = true;
    } else if (command === -1) {
      for (let i = 0; i < 10; i += 1) peopleSelected[i] = true;
    }
    this.setState({ peopleSelected });
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }

  splitItem = () => {
    let countSelected = 0;
    const {
      numPeople, peopleSelected, peopleValues, currentValue, totalValue, peopleUnfairCharges,
    } = this.state;

    for (let i = 0; i < numPeople; i += 1) {
      if (peopleSelected[i] === true) countSelected += 1;
    }
    if (countSelected === 0) {
      this.showAlert('Oh ...', 'Select who split the item');
    } else {
      const splitValue = ((Math.floor((currentValue * 100) / countSelected) / 100));
      let change = parseFloat((currentValue - countSelected * splitValue).toFixed(2));
      const newTotalValue = parseFloat(
        (parseFloat(totalValue) + parseFloat(currentValue)).toFixed(2),
      );

      const peopleSelectedIndexes = [];

      for (let i = 0; i < numPeople; i += 1) {
        if (peopleSelected[i] === true) {
          peopleValues[i] += splitValue;
          peopleSelectedIndexes.push(i);
        }
      }

      // Handle the $10/3 problem: Somebody has to pay more, but this should be balanced
      while (change > 0) {
        let min = Number.MAX_SAFE_INTEGER;
        let minIndex = -1;
        for (let i = 0; i < peopleSelectedIndexes.length; i += 1) {
          if (peopleUnfairCharges[peopleSelectedIndexes[i]] < min) {
            min = peopleUnfairCharges[peopleSelectedIndexes[i]];
            minIndex = peopleSelectedIndexes[i];
          }
        }
        peopleValues[minIndex] += 0.01;
        change -= 0.01;
        peopleUnfairCharges[minIndex] += 1;
      }

      this.setState({
        peopleValues,
        peopleUnfairCharges,
        peopleSelected: [false, false, false, false, false, false, false, false, false, false],
        menuStatus: 'AddItem',
        currentValue: 0,
        totalValue: newTotalValue,
      });
    }
  }

  render() {
    let menu;
    const {
      numPeople,
      interfaceWidth,
      interfaceHeight,
      peopleNames,
      peopleValues,
      totalValue,
      taxPercentage,
      tipPercentage,
      peopleSelected,
      menuStatus,
      currentValue,
    } = this.state;

    if (menuStatus === 'AddPeople') {
      menu = (
        <AddPeople
          numPeople={numPeople}
          updateNumPeople={this.updateNumPeople}
          updateMenuStatus={this.updateMenuStatus}
        />
      );
    } else if (menuStatus === 'AddItem') {
      menu = (
        <AddItem
          currentValue={currentValue}
          updateMenuStatus={this.updateMenuStatus}
          updateCurrentValue={this.updateCurrentValue}
          showAlert={this.showAlert}
        />
      );
    } else if (menuStatus === 'DistributeItem') {
      menu = (
        <DistributeItem
          currentValue={currentValue}
          updateMenuStatus={this.updateMenuStatus}
          updatePeopleSelectedAll={this.updatePeopleSelectedAll}
          splitItem={this.splitItem}
        />
      );
    } else if (menuStatus === 'Finish') {
      menu = (
        <Finish
          totalValue={totalValue}
          taxPercentage={taxPercentage}
          tipPercentage={tipPercentage}
          updateMenuStatus={this.updateMenuStatus}
          updateTaxPercentage={this.updateTaxPercentage}
          updateTipPercentage={this.updateTipPercentage}
        />
      );
    }

    return (
      <View style={styles.container}>
        { menu }
        <Table
          numPeople={numPeople}
          interfaceWidth={interfaceWidth}
          interfaceHeight={interfaceHeight}
          menuStatus={menuStatus}
          peopleSelected={peopleSelected}
          peopleNames={peopleNames}
          peopleValues={peopleValues}
          tipPercentage={tipPercentage}
          taxPercentage={taxPercentage}
          setLayoutDimensions={this.setLayoutDimensions}
          updatePeopleSelected={this.updatePeopleSelected}
          updatePeopleName={this.updatePeopleName}
        />
      </View>
    );
  }
}
