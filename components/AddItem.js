import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class AddItem extends Component {
  render() {
    const {
      currentValue, showAlert, updateMenuStatus,
      updateCurrentValue, historyPop, restart, history,
    } = this.props;
    return (
      <View style={styles.menu}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flex: 1, alignItems: 'flex-start', marginBottom: 10 }}>
            <TouchableHighlight
              style={styles.digit_button}
              onPress={() => {
                if (history.length > 0) {
                  historyPop();
                } else {
                  updateMenuStatus('AddPeople');
                }
              }}
              underlayColor="#467bcc"
            >
              <Text style={{ marginLeft: 10, color: 'white' }}>{history.length > 0 ? 'Undo' : 'Back' }</Text>
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
          <Text style={styles.title}> Add item </Text>
        </View>
        <View style={styles.currentValue_area}>
          <Text style={styles.currentValue}>
            {' '}
            $
            {currentValue.toFixed(2)}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Button
              title="Finish"
              color="#999999"
              onPress={() => updateMenuStatus('Finish')}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Distribute"
              color="#467bcc"
              onPress={() => {
                if (currentValue !== 0) {
                  updateMenuStatus('DistributeItem');
                } else {
                  showAlert('Oh ...', 'Add the value of an item to split!', () => {});
                }
              }}
            />
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.digit_button}
                onPress={() => updateCurrentValue('1')}
                underlayColor="#467bcc"
              >
                <Text style={styles.digit_button_text}>1</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.digit_button}
                onPress={() => updateCurrentValue('2')}
                underlayColor="#467bcc"
              >
                <Text style={styles.digit_button_text}>2</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.digit_button}
                onPress={() => updateCurrentValue('3')}
                underlayColor="#467bcc"
              >
                <Text style={styles.digit_button_text}>3</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.digit_button}
                onPress={() => updateCurrentValue('4')}
                underlayColor="#467bcc"
              >
                <Text style={styles.digit_button_text}>4</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.digit_button}
                onPress={() => updateCurrentValue('5')}
                underlayColor="#467bcc"
              >
                <Text style={styles.digit_button_text}>5</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.digit_button}
                onPress={() => updateCurrentValue('6')}
                underlayColor="#467bcc"
              >
                <Text style={styles.digit_button_text}>6</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.digit_button}
                onPress={() => updateCurrentValue('7')}
                underlayColor="#467bcc"
              >
                <Text style={styles.digit_button_text}>7</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.digit_button}
                onPress={() => updateCurrentValue('8')}
                underlayColor="#467bcc"
              >
                <Text style={styles.digit_button_text}>8</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.digit_button}
                onPress={() => updateCurrentValue('9')}
                underlayColor="#467bcc"
              >
                <Text style={styles.digit_button_text}>9</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableHighlight
              style={styles.digit_button}
              onPress={() => updateCurrentValue('0')}
              underlayColor="#467bcc"
            >
              <Text style={styles.digit_button_text}>0</Text>
            </TouchableHighlight>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableHighlight
              style={styles.digit_button}
              onPress={() => updateCurrentValue('-1')}
              underlayColor="#467bcc"
            >
              <Text style={styles.digit_button_text}>⌫</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

AddItem.propTypes = {
  currentValue: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  showAlert: PropTypes.func.isRequired,
  updateMenuStatus: PropTypes.func.isRequired,
  updateCurrentValue: PropTypes.func.isRequired,
  historyPop: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
};
