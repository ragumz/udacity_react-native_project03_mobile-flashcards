import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar } from 'react-native';

/**
 * @description Definition of the top status bar layout
 * @param {Object} object Status bar arguments structure with 'backgroundColor' field
 */
export default function FCStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};
