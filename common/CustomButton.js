import React from 'react';
import { Text, TouchableHighlight, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../utils/constants';

export default function CustomButton({ children, onPress, style = {} }) {
  return (
    <TouchableHighlight
      underlayColor={COLORS.WHITE}
      onPress={onPress}>
      <Text style={[styles.reset, Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn, style]}>
        {children}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: COLORS.BLUE
  },
  androidBtn: {
    backgroundColor: COLORS.BLUE,
    color: COLORS.WHITE,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosBtn: {
    backgroundColor: COLORS.BLUE,
    color: COLORS.WHITE,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
});
