'use strict';
import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-native-material-dropdown';

const Sources = ({ onChangeSource, source, sources }) => {
  return (
    <View>
      <Dropdown
        data={sources}
        containerStyle={{ marginHorizontal: 20 }}
        label='Select a source'
        labelExtractor={({ label }) => label}
        value={source}
      />
    </View>
  )
};

Sources.propTypes = {
  onChangeSource: PropTypes.func.isRequired,
  source: PropTypes.any,
  sources: PropTypes.array.isRequired
};

export { Sources };