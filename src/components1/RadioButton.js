import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const CustomRadioButtons = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.radioButton,
            selectedOption === option.value && styles.radioButtonSelected,
          ]}
          onPress={() => handleOptionSelect(option.value)}
        >
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'gray',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: 'gray',
  },
  label: {
    marginLeft: 8,
    color: 'black',
  },
});

export default CustomRadioButtons;