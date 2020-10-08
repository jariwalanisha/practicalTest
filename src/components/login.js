/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  GRAY,
  LIGHT_GRAY,
  ORANGE,
  WHITE,
  LIGHT_ORANGE,
  BLACK,
  ERROR_COLOR,
} from '../utils/colors';
import {
  deviceWidth,
  responsiveHeight,
  responsiveWidth,
} from '../utils/sizeMatters';

const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      urlError: '',
      isRememberMeChecked: false,
      isAcceptTC: false,
    };
  }

  onChangeInput = (key, value) => {
    this.setState({usernameError: '', passwordError: '', urlError: ''});
    this.setState({[key]: value});
  };

  renderInputView = (
    key,
    placeholder,
    value,
    image,
    isCenter,
    index,
    errorKey,
  ) => {
    return (
      <>
        <View key={index} style={styles.inputContainer(isCenter)}>
          <Image source={image} style={styles.inputIcon} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={LIGHT_GRAY}
            style={styles.inputView}
            value={value}
            onChangeText={text => this.onChangeInput(key, text)}
            secureTextEntry={index === 2}
          />
        </View>
        {errorKey !== '' ? (
          <Text style={{color: ERROR_COLOR}}>{errorKey}</Text>
        ) : null}
      </>
    );
  };

  renderCheckBoxView = (key, isChecked, buttonText, index) => {
    return (
      <TouchableOpacity key={index} style={styles.checkViewContainer(index)}>
        <>
          <TouchableOpacity style={styles.imageView(isChecked)}>
            {isChecked ? (
              <Image
                source={require('../assets/check-symbol.png')}
                style={styles.image}
              />
            ) : null}
          </TouchableOpacity>
          <Text style={{fontSize: 15}}>{buttonText}</Text>
        </>
        {index === 0 ? (
          <Text style={styles.forgotpwdText}>Forgot Password?</Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  isValidateUsername = () => {
    const expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const {username} = this.state;
    if (username !== '' && expression.test(username.toLowerCase())) {
      return true;
    } else {
      this.setState({usernameError: 'username must be characater'});
      return false;
    }
  };

  isValidatePassword = () => {
    const {password} = this.state;
    if (password !== '') {
      return true;
    } else {
      this.setState({passwordError: 'password must be characater'});
      return false;
    }
  };

  isValidateUrl = () => {
    const {url} = this.state;
    if (url !== '') {
      return true;
    } else {
      this.setState({urlError: 'url must be characater'});
      return false;
    }
  };

  onPressSignin = () => {
    const {username, password, url} = this.state;
    const validateUsername = this.isValidateUsername();
    const validatePassword = this.isValidatePassword();
    const validateUrl = this.isValidateUrl();
    if (validateUsername && validatePassword && validateUrl) {
      axios
        .post('http://demo.ciaoworks.com/practical/login.php', {
          username,
          password,
          url,
          multiple_user_login: {
            device_token: 'dMChrtBklsU:APA91bGv-',
            device_type: 'android',
            dedevicevice_model: 'Nokia 4.2',
            _version: '10',
            app_version: '2.0',
            device_name: 'Nokia',
            device_uid: 'f123447630d7c358',
          },
        })
        .then(function(response) {
          if (response.data.code === 200) {
            alert(response.data.message);
            // console.log(response.data.data);
            // this.props.navigation.navigate('Home', {data: response.data.data});
          } else {
            alert("Cannot Login");
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  };

  render() {
    const {
      url,
      username,
      password,
      isRememberMeChecked,
      isAcceptTC,
      usernameError,
      passwordError,
      urlError,
    } = this.state;
    const inputData = [
      {
        index: 0,
        key: 'url',
        placeholder: 'URL',
        value: url,
        image: require('../assets/link1.png'),
        errorKey: urlError, 
      },
      {
        index: 1,
        key: 'username',
        placeholder: 'Username',
        value: username,
        image: require('../assets/user1.png'),
        errorKey: usernameError,
      },
      {
        index: 2,
        key: 'password',
        placeholder: 'Password',
        value: password,
        image: require('../assets/padlock1.png'),
        errorKey: passwordError,
      },
    ];
    const checkBoxData = [
      {
        index: 0,
        key: 'isRememberMeChecked',
        isChecked: isRememberMeChecked,
        buttonText: 'Remember me',
      },
      {
        index: 1,
        key: 'isAcceptTC',
        isChecked: isAcceptTC,
        buttonText: 'I accept Terms & Condition',
      },
    ];
    return (
      <SafeAreaView style={styles.parentView}>
        <View style={styles.grayView} />
        <View style={styles.orangeView} />

        <ScrollView style={styles.loginContainer}>
          <Image
            source={require('../assets/app_logo.png')}
            style={styles.appLogo}
          />
          {inputData.map(input => {
            return this.renderInputView(
              input.key,
              input.placeholder,
              input.value,
              input.image,
              input.index === 1 ? true : false,
              input.index,
              input.errorKey,
            );
          })}
          {checkBoxData.map(checkData => {
            return this.renderCheckBoxView(
              checkData.key,
              checkData.isChecked,
              checkData.buttonText,
              checkData.index,
            );
          })}
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => this.onPressSignin()}>
            <Text style={{color: WHITE, fontSize: 19}}>Sign In</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: ORANGE,
              width: '100%',
              textAlign: 'center',
            }}>
            Privacy Policy
            <Text style={{fontSize: 16, color: BLACK}}> and </Text>
            {'Terms & Condition'}
          </Text>
        </ScrollView>
        <Text style={styles.versionStyle}>Version 1.6</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
  },
  grayView: {
    backgroundColor: GRAY,
    height: responsiveHeight(30),
    width: deviceWidth,
  },
  orangeView: {
    backgroundColor: ORANGE,
    height: responsiveHeight(70),
    width: deviceWidth,
  },
  loginContainer: {
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(10),
    backgroundColor: WHITE,
    elevation: 7,
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveWidth(5),
    zIndex: 999,
    position: 'absolute',
  },
  appLogo: {
    alignSelf: 'center',
    width: responsiveWidth(18),
    resizeMode: 'contain',
    marginVertical: responsiveHeight(2),
  },
  textLogin: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
  },
  inputContainer: isCenter => ({
    borderWidth: 0.5,
    borderColor: LIGHT_GRAY,
    width: deviceWidth - responsiveWidth(20),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: isCenter ? responsiveHeight(3) : 0,
  }),
  inputIcon: {
    width: responsiveWidth(10),
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
  },
  inputView: {
    width: deviceWidth - responsiveWidth(37),
  },
  checkViewContainer: index => ({
    width: deviceWidth - responsiveWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: index === 0 ? responsiveHeight(3) : responsiveHeight(1),
    paddingVertical: responsiveHeight(1),
  }),
  imageView: isChecked => ({
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    borderRadius: 3,
    borderColor: isChecked ? ORANGE : LIGHT_GRAY,
    borderWidth: 1,
    backgroundColor: isChecked ? ORANGE : WHITE,
    marginRight: responsiveWidth(2),
  }),
  image: {
    resizeMode: 'contain',
    width: responsiveWidth(4),
    tintColor: WHITE,
  },
  forgotpwdText: {
    fontSize: 15,
    color: ORANGE,
    width: '61%',
    textAlign: 'right',
  },
  buttonView: {
    backgroundColor: ORANGE,
    paddingHorizontal: responsiveWidth(8),
    paddingVertical: responsiveHeight(2.2),
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: responsiveHeight(2),
  },
  versionStyle: {
    position: 'absolute',
    bottom: responsiveHeight(2),
    left: (deviceWidth - responsiveWidth(15)) / 2,
    color: LIGHT_ORANGE,
  },
});

export default Login;
