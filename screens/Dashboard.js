'use strict';
import React, { Component } from 'react';
import { Keyboard, StatusBar, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Button, Header } from 'react-native-elements';
import {
  fetchArticles,
  fetchSources,
  loadMoreArticles
} from '../actions';
import { ArticleList } from '../components/ArticleList';
import { SearchForm } from '../components/SearchForm';

class Dashboard extends Component {
  state = {
    fromDate: null,
    isSearchFormOpen: true,
    query: '',
    source: '',
    toDate: new Date()
  }

  componentDidMount() {
    this.fetchSources();
  }

  fetchArticles = (query, fromDate, toDate, source, page) => this.props.fetchArticles(query, fromDate, toDate, source, page);

  loadMoreArticles = (query, fromDate, toDate, source, page) => this.props.loadMoreArticles(query, fromDate, toDate, source, page);

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

  handleLoadMore = () => {
    const { query, fromDate, toDate, source } = this.state;
    const newPage = this.props.page + 1;
    this.loadMoreArticles(query, fromDate, toDate, source, newPage);
  }

  handleOnPressToggleForm = (isSearchFormOpen) => this.setState({ isSearchFormOpen });

  handleSubmit = (query, fromDate, toDate, source, page) => {
    Keyboard.dismiss();
    this.setState({ isSearchFormOpen: false });
    this.fetchArticles(query, fromDate, toDate, source, page);
  }

  render() {
    const {
      fromDate,
      isSearchFormOpen,
      query,
      source,
      toDate,
    } = this.state;
    const {
      articles,
      loading,
      refreshing,
      sources,
      page
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'NEWS FEED', style: { color: '#fff', fontSize: 17, fontWeight: '900' } }}
          outerContainerStyles={{ width: '100%', borderBottomWidth: 0 }}
          statusBarProps={{ barStyle: 'light-content' }}
          backgroundColor='#fc4b61'
        />
        <SearchForm
          fromDate={fromDate}
          onChangeFromDate={this.handleChangeFromDate}
          onChangeQuery={this.handleChangeQuery}
          onChangeSource={this.handleChangeSource}
          onChangeToDate={this.handleChangeToDate}
          onSubmit={() => this.handleSubmit(query, fromDate, toDate, source, page)}
          onPressToggleForm={this.handleOnPressToggleForm}
          isSearchFormOpen={isSearchFormOpen}
          query={query}
          source={source}
          sources={sources}
          toDate={toDate}
        />
        <ArticleList
          articles={articles}
          loading={loading}
          loadMore={this.handleLoadMore}
          refreshing={refreshing}
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
  refreshing: PropTypes.bool.isRequired
};

const mapStateToProps = ({ articlesReducer: { articles, loading, refreshing, page }, sourcesReducer: { sources } }) => {
  return { articles, loading, refreshing, page, sources };
};

export default connect(mapStateToProps, {
  fetchArticles,
  fetchSources,
  loadMoreArticles
})(Dashboard);
