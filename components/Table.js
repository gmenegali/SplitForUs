import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogInputVisible: false,
      indexSelected: -1,
    };
  }

    openDialogInput = (index) => {
      this.setState({ dialogInputVisible: true, indexSelected: index });
    }

    submitDialogInput = (name) => {
      const { updatePeopleName } = this.props;
      const { indexSelected } = this.state;
      updatePeopleName(name, indexSelected);
      this.setState({ dialogInputVisible: false });
    }

    closeDialogInput = () => {
      this.setState({ dialogInputVisible: false });
    }

    render() {
      const {
        numPeople,
        interfaceWidth,
        interfaceHeight,
        menuStatus,
        peopleSelected,
        setLayoutDimensions,
        peopleNames,
        peopleValues,
        updatePeopleSelected,
      } = this.props;

      const { dialogInputVisible } = this.state;

      const plateRadius = 35;
      const tableRadius = (interfaceHeight - 2 * plateRadius) / 2 - 10;

      const plateColors = ['#DC143C', '#008080', '#98473E', '#87CEFA',
        '#505050', '#DA70D6', '#00FA9A', '#F0E68C', '#FF6347', '#191970'];
      const plates = [];
      const alpha = (2 * Math.PI) / numPeople;

      // plates.push(
      //     <TouchableHighlight
      //         style={{
      //             ...styles.plate,
      //             borderColor: 'white',
      //             backgroundColor: 'white',
      //             width: 4 * plateRadius,
      //             height: 4 * plateRadius,
      //             top: interfaceHeight / 2 - 2* plateRadius,
      //             left: interface_width / 2 - 2* plateRadius,
      //         }}
      //         key={11}
      //         // onPress={() => this.openDialogInput()}
      //         underlayColor='#ccc'
      //     >
      //         <Text>
      //             {/*Click who shared*/}
      //         </Text>
      //     </TouchableHighlight>
      // )

      for (let index = 0; index < numPeople; index += 1) {
        plates.push(
          <TouchableHighlight
            style={{
              ...styles.plate,
              borderColor: plateColors[index],
              backgroundColor: (
                menuStatus === 'AddPeople'
                || menuStatus === 'AddItem'
                || menuStatus === 'Finish'
                || peopleSelected[index]
              ) ? 'white' : 'gray',
              width: 2 * plateRadius,
              height: 2 * plateRadius,
              top: interfaceHeight / 2 - plateRadius + tableRadius * Math.cos(index * alpha),
              left: interfaceWidth / 2 - plateRadius + tableRadius * Math.sin(index * alpha),
            }}
            key={index}
            onPress={() => (menuStatus === 'AddPeople' ? this.openDialogInput(index) : updatePeopleSelected(index))}
            underlayColor="#ccc"
          >
            <Text>
              { `${peopleNames[index]}\n$${peopleValues[index]}` }
            </Text>
          </TouchableHighlight>,
        );
      }

      return (
        <View
          onLayout={(event) => {
            setLayoutDimensions(event.nativeEvent.layout);
          }}
          style={styles.interface}
        >
          <DialogInput
            isDialogVisible={dialogInputVisible}
            title="Changing the name"
            hintInput="Enter the name of the person (Max Length = 5)"
            textInputProps={{ maxLength: 5 }}
            submitInput={(name) => { this.submitDialogInput(name); }}
            closeDialog={() => { this.closeDialogInput(); }}
          />
          {plates}
        </View>

      );
    }
}

Table.propTypes = {
  numPeople: PropTypes.number.isRequired,
  interfaceWidth: PropTypes.number.isRequired,
  interfaceHeight: PropTypes.number.isRequired,
  menuStatus: PropTypes.string.isRequired,
  peopleSelected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  peopleNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  peopleValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  setLayoutDimensions: PropTypes.func.isRequired,
  updatePeopleSelected: PropTypes.func.isRequired,
  updatePeopleName: PropTypes.func.isRequired,
};
