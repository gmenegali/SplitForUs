import React, { Component } from 'react';
import {
  Text, View, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class AddPeople extends Component {
  render() {
    const { numPeople, updateNumPeople, updateMenuStatus } = this.props;

    return (
      <View style={styles.menu}>
        <View style={styles.title_area_spaced}>
          <Text style={styles.title}> How many people? </Text>
          <Text style={styles.subtitle}> (Tap plate to change the name) </Text>
        </View>
        <View style={styles.control_area}>
          <View style={styles.button_area}>
            <View style={{ marginBottom: 3 }}>
              <Button
                title="+"
                color="#999999"
                onPress={() => updateNumPeople('+')}
              />
            </View>
            <View>
              <Button
                title="-"
                color="#999999"
                onPress={() => updateNumPeople('-')}
              />
            </View>
          </View>
          <View style={styles.counter_area}>
            <Text style={styles.counter}>
              {' '}
              { numPeople }
              {' '}
            </Text>
          </View>
        </View>
        <View style={styles.next_area}>
          <Button
            title="Next"
            color="#999999"
            onPress={() => updateMenuStatus('AddItem')}
          />
        </View>
      </View>
    );
  }
}

AddPeople.propTypes = {
  numPeople: PropTypes.number.isRequired,
  updateNumPeople: PropTypes.func.isRequired,
  updateMenuStatus: PropTypes.func.isRequired,
};
