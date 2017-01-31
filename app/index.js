// Dependencies
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { View, Text, StatusBar, Platform, AsyncStorage } from 'react-native';
import {persistStore} from 'redux-persist';
import storage from 'react-native-simple-store';
// Containers, Components

import LoginHandler from './LoginHandler';
import AppStatusBar from './components/statusBar/StatusBar';
// Styles
import {colors} from './themes'

async function setItem() {
  const user2 = await storage.get('reduxPersist:user');
  console.log(user2);
}
setItem();
// AsyncStorage.clear();
const store = configureStore();

class App extends Component {
  constructor () {
    super();
    this.state = {rehydrated:false};
  }
  componentWillMount () {
    this.persistStore();
    if (!__DEV__) {
      this.handleErrors();
    }
  }
  persistStore() {
    persistStore(store, {storage: AsyncStorage},() => {
      this.setState({rehydrated: true});
    });
  }
  handleErrors() {
    this.defaultHandler = ErrorUtils.getGlobalHandler(); // eslint-disable-line no-undef
    ErrorUtils.setGlobalHandler(this.wrapGlobalHandler.bind(this)); // eslint-disable-line no-undef
  }
  wrapGlobalHandler (error, isFatal) {
    if (isFatal && !__DEV__) {AsyncStorage.clear(); }
    if (this.defaultHandler) {this.defaultHandler(error, isFatal)};
  }
  render() {
    if (!this.state.rehydrated) {
      return (
        <View style={{flex:1}}>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <AppStatusBar backgroundColor={colors.black} barStyle="light-content" />
          <LoginHandler />
        </View>
      </Provider>
    )
  }
}

export default App;
