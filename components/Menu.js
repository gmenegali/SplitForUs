import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import AddPeople from './AddPeople';
import AddItem from './AddItem';
import DistributeItem from './DistributeItem';
import Finish from './Finish';

export default class Menu extends Component {
  render() {
    let menu;
    const {
      numPeople,
      totalValue,
      taxPercentage,
      tipPercentage,
      menuStatus,
      currentValue,
      history,
      updateNumPeople,
      updateMenuStatus,
      updateCurrentValue,
      showAlert,
      historyPop,
      restart,
      updatePeopleSelectedAll,
      splitItem,
      onSharePress,
      updateTaxPercentage,
      updateTipPercentage,
    } = this.props;

    if (menuStatus === 'AddPeople') {
      menu = (
        <AddPeople
          numPeople={numPeople}
          updateNumPeople={updateNumPeople}
          updateMenuStatus={updateMenuStatus}
        />
      );
    } else if (menuStatus === 'AddItem') {
      menu = (
        <AddItem
          currentValue={currentValue}
          history={history}
          updateMenuStatus={updateMenuStatus}
          updateCurrentValue={updateCurrentValue}
          showAlert={showAlert}
          historyPop={historyPop}
          restart={restart}
        />
      );
    } else if (menuStatus === 'DistributeItem') {
      menu = (
        <DistributeItem
          currentValue={currentValue}
          updateMenuStatus={updateMenuStatus}
          updatePeopleSelectedAll={updatePeopleSelectedAll}
          splitItem={splitItem}
          showAlert={showAlert}
          restart={restart}
        />
      );
    } else if (menuStatus === 'Finish') {
      menu = (
        <Finish
          totalValue={totalValue}
          taxPercentage={taxPercentage}
          tipPercentage={tipPercentage}
          updateMenuStatus={updateMenuStatus}
          updateTaxPercentage={updateTaxPercentage}
          updateTipPercentage={updateTipPercentage}
          restart={restart}
          showAlert={showAlert}
          onSharePress={onSharePress}
        />
      );
    }

    return (
      <View style={styles.container}>
        { menu }
      </View>
    );
  }
}

Menu.propTypes = {
  numPeople: PropTypes.number.isRequired,
  tipPercentage: PropTypes.number.isRequired,
  taxPercentage: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired,
  currentValue: PropTypes.number.isRequired,
  menuStatus: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  updateNumPeople: PropTypes.func.isRequired,
  updateCurrentValue: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  historyPop: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  updatePeopleSelectedAll: PropTypes.func.isRequired,
  splitItem: PropTypes.func.isRequired,
  onSharePress: PropTypes.func.isRequired,
  updateTaxPercentage: PropTypes.func.isRequired,
  updateTipPercentage: PropTypes.func.isRequired,
  updateMenuStatus: PropTypes.func.isRequired,
};
