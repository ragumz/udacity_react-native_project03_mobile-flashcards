import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../utils/constants';

/**
 * @description Function component to draw a button like touchable
 */
export default CustomButton = ({ children, onPress, style = {}, disabled=false }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.4}
      onPress={onPress}>
      <Text style={[styles.reset, Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                    style,
                    disabled ? styles.disabled : styles.enabled ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * @description Component Flexbox styles definitions
 */
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
  disabled: {
    opacity: 0.5
  },
  enabled: {
    opacity: 1.0
  }
});
