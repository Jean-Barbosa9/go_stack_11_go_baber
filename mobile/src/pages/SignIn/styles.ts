import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { colors, fontFamilies } from '../../styles/variables';

const { light2, dark, primary } = colors;

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin: 64px 0 16px;
  font-family: ${fontFamilies.medium};
  font-size: 25px;
  color: ${light2};
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 16px;
  padding: 16px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: ${fontFamilies.medium};
  font-size: 16px;
  color: ${light2};
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${dark};
`;

export const CreateAccoutText = styled.Text`
  margin-left: 16px;
  font-family: ${fontFamilies.medium};
  font-size: 16px;
  color: ${primary};
`;
