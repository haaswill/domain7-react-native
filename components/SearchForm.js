'use strict';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Sources } from './Sources';
import { DatePickers } from './DatePickers';

const SearchForm = ({
  fromDate,
  onChangeFromDate,
  onChangeQuery,
  onChangeSource,
  onChangeToDate,
  onSubmit,
  query,
  toDate,
  source,
  sources
}) => {

  return (
    <Card containerStyle={styles.container}>
      <FormLabel>Topic</FormLabel>
      <FormInput
        containerStyle={{}}
        onChangeText={onChangeQuery}
        placeholder='Memes'
        value={query}
      />
      <FormValidationMessage>{!query && 'This field is required'}</FormValidationMessage>
      <Sources
        onChangeSource={onChangeSource}
        source={source.value}
        sources={sources}
      />
      <DatePickers
        fromDate={fromDate}
        onChangeFromDate={onChangeFromDate}
        toDate={toDate}
        onChangeToDate={onChangeToDate}
      />
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{ borderRadius: 2, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        disabled={!query}
        onPress={onSubmit}
        title='Submit'
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    margin: 0,
    width: '100%'
  },
});

SearchForm.propTypes = {
  query: PropTypes.string.isRequired,
  onChangeQuery: PropTypes.func.isRequired,
  sources: PropTypes.array.isRequired,
  fromDate: PropTypes.instanceOf(Date),
  onChangeFromDate: PropTypes.func.isRequired,
  toDate: PropTypes.instanceOf(Date),
  onChangeToDate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  source: PropTypes.object,
  onChangeSource: PropTypes.func.isRequired
};

export { SearchForm };