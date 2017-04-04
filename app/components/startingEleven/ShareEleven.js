import React, { Component } from 'react';
import { ScrollView, Alert, View, Text, Picker, Image, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import Button from '../../common/Button';
import ShareMessage from '../../common/ShareMessage';
import { objects, fonts, colors } from '../../themes';

export default class ShareEleven extends Component {
  constructor(props) {
		super(props);
		this.state = {
			message: '',
			loading: false
		};
  }

	async postToFB() {
		this.setState({loading:true});
		const { message } = this.state;
		// const getToken = await AccessToken.getCurrentAccessToken();
		// if (message.length < 5) {
		// 	Alert.alert('', 'Din post var kortare än 5 tecken.\nFyll på med mer information och försök igen.');
		// 	return;
		// }
		// if (!getToken) {
		// 	Alert.alert('','Du måste logga in först!');
		// 	return;
		// }
		// const access_token = getToken.accessToken.toString();
		const access_token = 'EAACEdEose0cBAF8DrlSMJotM0OTb82nZAzZCmdkdawXZBrrQodZCRsAq7qnVjszVudVSZCZAUIMa44mePQqZA06F9dwLPqZCzTjnb0XqQM1VBZAsfhN4ggfMr87EqvK66SJUJ1mjMbbsTSYMTcJRjnD0fc3fLu9ozBIFTNmZCFkJiuvf8vOmYQMvvd';
		const feedID = '1017038678426598';
		const xhr = new XMLHttpRequest();

		const photo = {
			uri: this.props.imgUri,
			type: 'image/jpeg',
			name: 'photo.jpg',
		};

		let body = new FormData();
		body.append('photo', photo);

		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				this.setState({
					message: '',
					loading: false
				});
				Actions.pop();
				Alert.alert('', 'Ditt meddelande delades!');
      }
    };

    xhr.ontimeout = (e) => {
			Alert.alert('Error', e);
    };

		xhr.open('POST', `https://graph.facebook.com/v2.8/${feedID}/photos?caption=${message}&access_token=${access_token}`);
		xhr.send(body);
  }
  render() {
		const { width, height, imgUri } = this.props;
		return (
			<ScrollView style={objects.screen.scrollViewContainer}>
				<View style={objects.screen.marginContainer}>
					<Text style={[objects.inputs.label, fonts.style.description]}>{'Välj grupp att dela till'.toUpperCase()}</Text>
					<Picker>
						<Picker.Item label="Temp" value="1" />
						<Picker.Item label="Rödbo IF" value="2" />
					</Picker>
					<View style={{ flex:1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
						<ShareMessage label="Meddelande att dela" onChangeText={(message) => this.setState({ message })} value={this.state.message} height={height / 4} />
						<Image source={{ uri: imgUri }} style={{ width: width / 4, height: height / 4, resizeMode: 'contain', marginTop: 15, marginLeft: 10 }} />
					</View>
					<Button text={(this.state.loading) ? <ActivityIndicator color={colors.offWhite} /> : 'Dela på facebook'} buttonType="cta" onPress={() => this.postToFB()}/>
					<LoginButton
						publishPermissions={['publish_actions']}
						onLoginFinished={
							(error, result) => {
								if (error) {
									Alert.alert('Fel vid inloggning', result, error);
								} else if (result.isCancelled) {
									Alert.alert('', 'Du avbröt kopplingen till Facebook.');
								} else {
									AccessToken.getCurrentAccessToken().then(
										() => {
											Alert.alert('Inloggningen lyckades!', 'Du kan nu posta till Facebook.');
										}
									);
								}
							}
						}
						onLogoutFinished={() => Alert.alert('', 'Kopplingen mellan dig och Facebook är nu upphävd.')}
					/>
				</View>
			</ScrollView>
		);
  }
}
