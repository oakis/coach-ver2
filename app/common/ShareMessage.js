// Dependencies
import React from 'react';
import { View, Text, TextInput } from 'react-native';
// Components
import ErrorLabel from './ErrorLabel';
// Styles
import { objects, fonts } from '../themes';

export default function Input({
    placeholder = '',
    keyboardType = 'default',
    maxLength = 1000,
    autoCapitalize = 'sentences',
    onChangeText,
    onChange,
    onSubmitEditing,
    onBlur,
    label = '',
    error,
    submitted,
    multiline = true,
    value = '',
    height = 100
  }) {
  return (
    <View style={[objects.share.container, checkErrorForContainer(submitted,error)]} >
      <Text style={[objects.inputs.label, fonts.style.description]}>
        <Text>{label.toUpperCase()}     </Text>
        <ErrorLabel submitted={submitted} error={error} />
      </Text>
      <TextInput
        style={[objects.share.message,{height: height}]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        underlineColorAndroid="transparent"
        maxLength={maxLength}
        onChangeText={onChangeText}
        onChange={onChange}
        onBlur={onBlur}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
        multiline={multiline}
        value={value}
      />
    </View>
  );
}

function checkErrorForContainer (submitted, error) {
  return error || submitted && error === undefined ? objects.inputs.error : null;
}
