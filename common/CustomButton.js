import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

export default function CustomButton({ children, onPress, style = {} }) {
  return (
    <TouchableHighlight
      underlayColor={COLORS.WHITE}
      onPress={onPress}>
      <Text style={[styles.reset, style]}>
        {children}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: COLORS.BLUE
  }
});
