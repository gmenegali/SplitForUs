import React, { Component } from 'react';
import {
  View, Alert, Share,
} from 'react-native';
import styles from './styles';
import Table from './Table';
import Menu from './Menu';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPeople: 2,
      peopleNames: ['You', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
      peopleValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      peopleUnfairCharges: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      totalValue: 0,
      taxPercentage: 8,
      tipPercentage: 12,
      peopleSelected: [false, false, false, false, false, false, false, false, false, false],
      menuStatus: 'AddPeople',
      currentValue: 0,
      history: [],
    };
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

  showAlert = (title, message, func) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
        },
        { text: 'OK', onPress: () => func() },
      ],
      { cancelable: false },
    );
  }

  splitItem = () => {
    let countSelected = 0;
    const {
      numPeople, peopleSelected, peopleValues, currentValue,
      totalValue, peopleUnfairCharges, history,
    } = this.state;

    const historyDiff = peopleValues.slice();

    for (let i = 0; i < numPeople; i += 1) {
      if (peopleSelected[i] === true) countSelected += 1;
    }
    if (countSelected === 0) {
      this.showAlert('Oh ...', 'Select who split the item', () => {});
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

      for (let i = 0; i < numPeople; i += 1) {
        historyDiff[i] = peopleValues[i] - historyDiff[i];
      }
      history.push(historyDiff);

      this.setState({
        peopleValues,
        peopleUnfairCharges,
        history,
        peopleSelected: [false, false, false, false, false, false, false, false, false, false],
        menuStatus: 'AddItem',
        currentValue: 0,
        totalValue: newTotalValue,
      });
    }
  }

  restart = () => {
    this.setState({
      numPeople: 2,
      peopleNames: ['You', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
      peopleValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      peopleUnfairCharges: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      totalValue: 0,
      taxPercentage: 8,
      tipPercentage: 12,
      peopleSelected: [false, false, false, false, false, false, false, false, false, false],
      menuStatus: 'AddPeople',
      currentValue: 0,
      history: [],
    });
  }

  historyPop = () => {
    const {
      numPeople, peopleValues, history,
    } = this.state;
    let { totalValue, menuStatus } = this.state;

    if (history.length > 0) {
      const targetValues = history.pop();
      let targetTotal = 0;
      for (let i = 0; i < numPeople; i += 1) {
        peopleValues[i] = Math.abs(peopleValues[i] - targetValues[i]);
        targetTotal += targetValues[i];
      }
      totalValue -= targetTotal;
    } else {
      menuStatus = 'AddPeople';
    }

    this.setState({
      peopleValues,
      totalValue,
      menuStatus,
    });
  }

  onSharePress = () => {
    const {
      peopleNames, peopleValues, totalValue,
      taxPercentage, tipPercentage, numPeople,
    } = this.state;
    let message = `(When values are not exact, we round it on a fair manner)\n\n`;
    message += `Subtotal = $ ${(totalValue).toFixed(2)}\n`;
    message += `Tax = ${taxPercentage}%\n`;
    message += `Tip = ${tipPercentage}%\n`;
    message += `Total = $ ${(totalValue * (1 + (taxPercentage / 100) + (tipPercentage / 100))).toFixed(2)}\n`;
    message += '--- * --- * ---\n';
    for (let i = 0; i < numPeople; i += 1) {
      message += `${peopleNames[i]}\n`; //= $ ${(peopleValues[i] * (1 + (taxPercentage / 100) + (tipPercentage / 100))).toFixed(2)}\n`;
      message += `Subtotal = $ ${(peopleValues[i]).toFixed(2)}\n`;
      message += `Tax = ${(peopleValues[i] * ((taxPercentage / 100))).toFixed(2)}\n`;
      message += `Tip = ${(peopleValues[i] * ((tipPercentage / 100))).toFixed(2)}\n`;
      message += `Total = $ ${(peopleValues[i] * (1 + (taxPercentage / 100) + (tipPercentage / 100))).toFixed(2)}\n`;
      message += '--- * --- * ---\n';
    }
    Share.share({
      title: 'Split info',
      message,
    });
  };

  render() {
    const {
      numPeople, peopleNames, peopleValues, totalValue,
      taxPercentage, tipPercentage, peopleSelected,
      menuStatus, currentValue, history,
    } = this.state;

    return (
      <View style={styles.container}>
        <Menu
          numPeople={numPeople}
          totalValue={totalValue}
          taxPercentage={taxPercentage}
          tipPercentage={tipPercentage}
          menuStatus={menuStatus}
          currentValue={currentValue}
          history={history}
          updateNumPeople={this.updateNumPeople}
          updateMenuStatus={this.updateMenuStatus}
          updateCurrentValue={this.updateCurrentValue}
          showAlert={this.showAlert}
          historyPop={this.historyPop}
          restart={this.restart}
          updatePeopleSelectedAll={this.updatePeopleSelectedAll}
          splitItem={this.splitItem}
          updateTaxPercentage={this.updateTaxPercentage}
          updateTipPercentage={this.updateTipPercentage}
          onSharePress={this.onSharePress}
        />
        <Table
          numPeople={numPeople}
          menuStatus={menuStatus}
          peopleSelected={peopleSelected}
          peopleNames={peopleNames}
          peopleValues={peopleValues}
          tipPercentage={tipPercentage}
          taxPercentage={taxPercentage}
          updatePeopleSelected={this.updatePeopleSelected}
          updatePeopleName={this.updatePeopleName}
        />
      </View>
    );
  }
}