import React, { Component } from 'react';
import {
  Text, View, Button, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class DistributeItem extends Component {
  render() {
    const {
      currentValue, updateMenuStatus, splitItem, updatePeopleSelectedAll, showAlert, restart,
    } = this.props;

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
        <View style={styles.currentValue_area}>
          <Text style={styles.currentValue}>
            {' '}
            $
            { currentValue.toFixed(2) }
          </Text>
        </View>

        <View style={styles.title_area_spaced}>
          <Text style={styles.title}> Who split this item? </Text>
          <Text style={styles.subtitle}> (Tap plates to select) </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginBottom: 10 }}>
            <Button
              title="Split"
              color="green"
              onPress={() => splitItem()}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Button
              title="Cancel"
              color="red"
              onPress={() => updateMenuStatus('AddItem')}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Select all"
              color="#999999"
              onPress={() => updatePeopleSelectedAll(1)}
            />
          </View>
        </View>
      </View>
    );
  }
}

DistributeItem.propTypes = {
  currentValue: PropTypes.number.isRequired,
  splitItem: PropTypes.func.isRequired,
  updateMenuStatus: PropTypes.func.isRequired,
  updatePeopleSelectedAll: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};
