// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, View} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {createValidator,checkValidation} from '../../common/validation.js';
import {addPlayer} from '../../actions/playerActions';
// Components
import Input from '../../common/Input';
import Button from '../../common/Button';
// Styles
import {objects} from '../../themes';

class AddTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: {},
      submitted: false
    };
    this.validators = {name: false ,phone: true };
    this.closeModal = this.closeModal.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.submitPlayer = this.submitPlayer.bind(this);
    this.createValidator = createValidator.bind(this);
    this.checkValidation = checkValidation.bind(this);
  }
  closeModal() {
    NavigationActions.pop();
  }
  onChangeName(value) {
    this.createValidator('name','username')(value);
  }
  onChangePhone(value) {
    this.createValidator('phone','number')(value);
  }
  submitPlayer() {
    this.setState({submitted: true});
    if (this.checkValidation()) {
      const player = {
        name: this.state.name.value,
        phone: this.state.phone.value
      }
      this.props.dispatch(addPlayer(player)).then(this.handleAJAXResponse);
    }
  }
  handleAJAXResponse(response) {
    if (response.success) {
      NavigationActions.pop();
    } else {
      Alert.alert("Spelaren lades inte till", response.message);
    }
  }
  render() {
    const {name,phone,submitted} = this.state;
    return (
      <View style={[objects.screen.topContainer]} >
        <Input
          label="Namn*"
          autoFocus
          autoCapitalize={'none'}
          onChangeText={this.onChangeName}
          error={name.error}
          value={name.value}
          submitted={submitted}
        />
        <Input
          label="Telefonnummer"
          onChangeText={this.onChangePhone}
          error={phone.error}
          value={phone.value}
          submitted={submitted}
        />
        <View style={[objects.screen.marginContainer]}>
          <Button onPress={this.submitPlayer} buttonType="cta" text="Lägg till spelare" />
          <Button onPress={this.closeModal} buttonType="alert" text="Avbryt" />
        </View>
      </View>
    );
  }
}

export default connect()(AddTraining);
