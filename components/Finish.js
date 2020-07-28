import React, { Component } from 'react';
import {
  Button,
  Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { Slider } from 'react-native-elements';
import styles from './styles';

export default class Finish extends Component {
  render() {
    const {
      updateMenuStatus, totalValue, taxPercentage, reset,
      tipPercentage, updateTaxPercentage, updateTipPercentage,
    } = this.props;

    const tipValue = ((totalValue * tipPercentage) / 100).toFixed(2);
    const taxValue = ((totalValue * taxPercentage) / 100).toFixed(2);
    const grandTotal = (
      parseFloat(totalValue) + parseFloat(tipValue) + parseFloat(taxValue)
    ).toFixed(2);

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
          <Text style={styles.title}>Subtotal = ${ totalValue.toFixed(2) }</Text>
        </View>
        <View style={styles.title_area}>
          <Text style={styles.title}>
            Tax (
            { taxPercentage }
            % = $
            {taxValue}
            )
          </Text>
        </View>
        <View style={{
          marginLeft: 10, marginRight: 10, alignItems: 'stretch', justifyContent: 'center',
        }}
        >
          <Slider
            value={taxPercentage}
            maximumValue={20}
            minimumValue={0}
            thumbTintColor="#eeeeee"
            minimumTrackTintColor="#eeeeee"
            // maximumTrackTintColor='white'
            step={0.5}
            onValueChange={(slider) => updateTaxPercentage(slider)}
          />
        </View>
        <View style={styles.title_area}>
          <Text style={styles.title}>
            Tip (
            { tipPercentage }
            % = $
            {tipValue}
            )
          </Text>
        </View>
        <View style={{
          marginLeft: 10, marginRight: 10, alignItems: 'stretch', justifyContent: 'center',
        }}
        >
          <Slider
            value={tipPercentage}
            maximumValue={25}
            minimumValue={0}
            thumbTintColor="#eeeeee"
            minimumTrackTintColor="#eeeeee"
            // maximumTrackTintColor='white'
            step={0.5}
            onValueChange={(slider2) => updateTipPercentage(slider2)}
          />
        </View>
        <View style={styles.title_area}>
          <Text style={styles.title}>
            Grand Total = $
            {grandTotal}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Button
              title="Restart"
              color="#999999"
              onPress={() => reset()}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Share"
              color="#467bcc"
              // onPress={() => updatePeopleSelectedAll(1)}
            />
          </View>
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
  updateTipPercentage: PropTypes.func.isRequired,
  updateTaxPercentage: PropTypes.func.isRequired,
};
