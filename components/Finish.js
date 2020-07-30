import React, { Component } from 'react';
import {
  Button,
  Text, TouchableHighlight, View,
  TouchableOpacity,
  Share,
} from 'react-native';
import PropTypes from 'prop-types';
import { Slider } from 'react-native-elements';
import styles from './styles';

export default class Finish extends Component {
  onSharePress = () => {
    Share.share({
      title: 'Alert Title',
      message: 'Message goes here.',
    });
  };

  render() {
    const {
      updateMenuStatus, totalValue, taxPercentage, restart, showAlert,
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

          <View style={{ flex: 1, alignItems: 'flex-start', marginBottom: 10 }}>
            <TouchableHighlight
              style={styles.digit_button}
              onPress={() => updateMenuStatus('AddItem')}
              underlayColor="#467bcc"
            >
              <Text style={{ marginLeft: 10, color: 'white' }}>Back</Text>
            </TouchableHighlight>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableHighlight
              style={styles.digit_button}
              onPress={() => showAlert('You will reset everything!', 'Are you sure?', restart)}
              underlayColor="#467bcc"
            >
              <Text style={{ marginRight: 10, color: 'white' }}>Restart</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.title_area}>
          <Text style={styles.title}>
            Subtotal = $
            { totalValue.toFixed(2) }
          </Text>
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
              title="Share"
              color="#467bcc"
              onPress={() => this.onSharePress()}
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
  restart: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};
