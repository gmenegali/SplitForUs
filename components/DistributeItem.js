import React, { Component } from 'react';
import {
  Text, View, Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

export default class DistributeItem extends Component {
  render() {
    const {
      currentValue, updateMenuStatus, splitItem, updatePeopleSelectedAll,
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
        <View style={styles.currentValue_area}>
          <Text style={styles.currentValue}>
            {' '}
            $
            { currentValue }
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
};
