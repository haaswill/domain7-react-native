'use strict';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';

const DatePickers = ({
  fromDate,
  onChangeFromDate,
  onChangeToDate,
  toDate
}) => {

  return (
    <View style={styles.container}>
      <DatePicker
        cancelBtnText='Cancel'
        confirmBtnText='Ok'
        date={fromDate}
        format='MM/DD/YYYY'
        maxDate={new Date()}
        onDateChange={onChangeFromDate}
        placeholder='From'
        showIcon={false}
        style={{ margin: 5 }}
      />
      <DatePicker
        cancelBtnText='Cancel'
        confirmBtnText='Ok'
        date={toDate}
        format='MM/DD/YYYY'
        minDate={fromDate}
        onDateChange={onChangeToDate}
        placeholder='To'
        showIcon={false}
        style={{ margin: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5
  },
});

DatePickers.propTypes = {
  fromDate: PropTypes.instanceOf(Date),
  onChangeFromDate: PropTypes.func.isRequired,
  toDate: PropTypes.instanceOf(Date),
  onChangeToDate: PropTypes.func.isRequired
};

export { DatePickers };