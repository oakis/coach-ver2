// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, View} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {addTraining} from '../../actions/trainingActions';
import autobind from 'autobind-decorator';
// Components
import Button from '../../common/Button';
import DateInput from '../../common/DateInput';
// Styles
import {objects} from '../../themes';

@autobind
class AddTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }
  componentWillMount(){
    const today = new Date();
    today.setHours(17,0,0);
    this.setState({date: today});
  }
  closeModal() {
    NavigationActions.pop();
  }
  onChangeDate(value) {
    this.setState({date:value});
  }
  submitTraining() {
    const training = {date: this.state.date, attending: []};
    this.props.dispatch(addTraining(training)).then(this.handleAJAXResponse);
  }
  handleAJAXResponse(response) {
    if (response.success) {
      NavigationActions.trainings();
    } else {
      Alert.alert('Träningen lades inte till', response.message);
    }
  }
  render() {
    return (
      <View style={[objects.screen.topContainer]} >
        <DateInput date={this.state.date} onChangeDate={this.onChangeDate} />
        <View style={[objects.screen.marginContainer]}>
          <Button onPress={this.submitTraining} buttonType="cta" text="Lägg till träning" />
          <Button onPress={this.closeModal} buttonType="alert" text="Avbryt" />
        </View>
      </View>
    );
  }
}

export default connect()(AddTraining);
