'use strict';
import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-native-material-dropdown';

const Sources = ({ onChangeSource, source, sources }) => {
  return (
    <View>
      <Dropdown
        animationDuration={0}
        containerStyle={{ marginHorizontal: 20 }}
        data={sources}
        label='Select a source'
        labelExtractor={({ label }) => label}
        onChangeText={onChangeSource}
        value={source}
      />
    </View>
  )
};

Sources.propTypes = {
  onChangeSource: PropTypes.func.isRequired,
  source: PropTypes.string,
  sources: PropTypes.array.isRequired
};

export { Sources };