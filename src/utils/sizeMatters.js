import {Dimensions} from 'react-native';

export const deviceHeight = Dimensions.get('window').height;

export const deviceWidth = Dimensions.get('window').width;

export const responsiveHeight = h => deviceHeight * (h / 100);

export const responsiveWidth = w => deviceWidth * (w / 100);
