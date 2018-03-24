'use strict';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Header } from 'react-native-elements';
import {
  fetchArticles,
  fetchSources
} from '../actions';
import { ArticleList } from '../components/ArticleList';
import { SearchForm } from '../components/SearchForm';

class Dashboard extends Component {
  state = {
    query: '',
    fromDate: null,
    toDate: new Date(),
    source: {}
  }

  componentDidMount() {
    this.fetchSources();
  }

  fetchArticles = (query, fromDate, toDate, source, page) => this.props.fetchArticles(query, fromDate, toDate, source, page);

  fetchSources = () => this.props.fetchSources();

  handleChangeFromDate = (e, fromDate) => {
    let toDate = this.state.toDate;
    if (toDate < fromDate) {
      toDate = null;
    }
    this.setState({ fromDate, toDate });
  }

  handleChangeQuery = query => this.setState({ query });

  handleChangeSource = source => this.setState({ source });

  handleChangeToDate = (e, toDate) => this.setState({ toDate });

  handleOnClickPage = (page) => {
    const { query, fromDate, toDate, source } = this.state;
    this.fetchArticles(query, fromDate, toDate, source, page);
  }

  render() {
    const {
      fromDate,
      query,
      source,
      toDate,
    } = this.state;
    const {
      articles,
      loading,
      sources,
      page
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'NEWS FEED', style: { color: '#fff', fontSize: 16 } }}
          outerContainerStyles={{ width: '100%' }}
          statusBarProps={{ barStyle: 'light-content' }}
        />
        <SearchForm
          fromDate={fromDate}
          onChangeFromDate={this.handleChangeFromDate}
          onChangeQuery={this.handleChangeQuery}
          onChangeSource={this.handleChangeSource}
          onChangeToDate={this.handleChangeToDate}
          onSubmit={() => this.fetchArticles(query, fromDate, toDate, source, page)}
          query={query}
          source={source}
          sources={sources}
          toDate={toDate}
        />
        <ArticleList
          articles={articles}
          loading={loading}
          onClickPage={this.handleOnClickPage}
          page={page}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Dashboard.propTypes = {
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchSources: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ articlesReducer: { articles, loading, page }, sourcesReducer: { sources } }) => {
  return { articles, loading, page, sources };
};

export default connect(mapStateToProps, {
  fetchArticles,
  fetchSources
})(Dashboard);
