'use strict';
import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Sources } from './Sources';
import { DatePickers } from './DatePickers';

const CustomLayoutAnimation = {
  duration: 100,
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};

class SearchForm extends Component {
  state = {
    height: 'auto',
    opacity: 1
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSearchFormOpen) {
      this.updateState(null, 1);
    } else {
      this.updateState(0, 0);
    }
  }

  updateState = (finalHeight, finalOpacity) => {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    this.setState({
      height: finalHeight,
      opacity: finalOpacity
    });
  }

  render() {
    const {
      fromDate,
      onChangeFromDate,
      onChangeQuery,
      onChangeSource,
      onChangeToDate,
      onSubmit,
      onPressToggleForm,
      isSearchFormOpen,
      query,
      toDate,
      source,
      sources
    } = this.props;
    const {
      height,
      opacity
    } = this.state;
    return (
      <Card containerStyle={styles.container}>
        <View style={{ height, opacity }}>
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
            source={source}
            sources={sources}
          />
          <DatePickers
            fromDate={fromDate}
            onChangeFromDate={onChangeFromDate}
            toDate={toDate}
            onChangeToDate={onChangeToDate}
          />
          <Button
            backgroundColor='#fc4b61'
            buttonStyle={{ borderRadius: 2, marginLeft: 0, marginRight: 0, marginBottom: 10 }}
            disabled={!query}
            onPress={onSubmit}
            title='SUBMIT'
          />
        </View>
        <Button
          backgroundColor='#fc4b61'
          containerViewStyle={{ marginBottom: 0, marginTop: 0, marginLeft: 0, marginRight: 0 }}
          large
          onPress={() => onPressToggleForm(!isSearchFormOpen)}
          title={isSearchFormOpen ? 'CLOSE SEARCH FORM' : 'OPEN SEARCH FORM'}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    height: 'auto',
    margin: 0,
    padding: 0,
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
  source: PropTypes.string,
  onChangeSource: PropTypes.func.isRequired
};

export { SearchForm };