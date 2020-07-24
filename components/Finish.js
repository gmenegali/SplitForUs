import React, { Component } from 'react';
import {
  Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Finish extends Component {
  render() {
    const {
      updateMenuStatus, totalValue, taxPercentage, tipPercentage,
    } = this.props;

    return (
      <View style={styles.menu}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Icon.Button
              name="arrow-left"
              color="white"
              backgroundColor="#5f8dd3"
              onPress={() => updateMenuStatus('AddPeople')}
            />
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Icon.Button
              name="undo"
              color="white"
              backgroundColor="#5f8dd3"
              onPress={() => updateMenuStatus('AddPeople')}
            />
          </View>
        </View>
        <View style={styles.title_area}>
          <Text style={styles.title}>Subtotal</Text>
          <Text style={styles.title}>
            $
            { totalValue }
          </Text>
        </View>
        <View style={styles.title_area}>
          <Text style={styles.title}>Tax</Text>
          <Text style={styles.title}>
            (
            { taxPercentage }
            %) = $
            {((totalValue * taxPercentage) / 100).toFixed(2)}
          </Text>
        </View>
        <View style={styles.title_area}>
          <Text style={styles.title}>Tip</Text>
          <Text style={styles.title}>
            (
            { tipPercentage }
            %) = $
            {((totalValue * tipPercentage) / 100).toFixed(2) }
          </Text>
        </View>
        <View style={styles.title_area}>
          <Text style={styles.title}>Grand Total</Text>
          <Text style={styles.title}>$175</Text>
        </View>
      </View>
    );
  }
}

Finish.propTypes = {
  tipPercentage: PropTypes.number.isRequired,
  taxPercentage: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired,
  updateMenuStatus: PropTypes.func.isRequired,
};
