'use strict';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';

const Footer = ({ loading }) => (
  <View style={{ borderColor: '#ced0ce', borderTopWidth: 1, paddingVertical: 20 }}>
    <ActivityIndicator animating size='large' />
  </View>
);

Footer.propTypes = {
  loading: PropTypes.bool.isRequired
}

export { Footer };