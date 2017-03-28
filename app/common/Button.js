// Dependencies
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
// Styles
import {objects} from '../themes';

export default function Button({ text, buttonType, onPress, disabled = false }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[objects.buttons.button, objects.buttons[buttonType], { opacity: (disabled) ? 0.3 : 1 } ]} >
        { (typeof text === 'string') ? <Text style={[objects.buttons.text]} >{text.toUpperCase()}</Text> : text }
      </View>
    </TouchableOpacity>
  );
}
