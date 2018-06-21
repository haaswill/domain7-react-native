'use strict';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, List } from 'react-native-elements';
import { Article } from './Article';
import { Footer } from './Footer';
import { formatDateToReadable } from '../handlers/formatter';

const ArticleList = ({ articles, loading, loadMore, refreshing }) => {
  const generateList = ({ item: { author, publishedAt, description, urlToImage, url, title } }) => (
    <Article
      author={author}
      datetime={formatDateToReadable(publishedAt)}
      description={description}
      image={urlToImage || '#'}
      title={title}
      url={url}
    />
  );

  const renderFooter = () => {
    return (
      <Footer loading={loading} />
    );
  }

  const renderNoArticles = () => (
    <View style={styles.text}>
      <Text>No articles...</Text>
    </View>
  );

  const renderList = () => {
    if (articles.length === 0) return renderNoArticles();
    return (
      <FlatList
        data={articles}
        keyExtractor={article => article.url}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        renderItem={generateList}
        keyboardDismissMode="on-drag"
      />
    );
  }

  const renderSpinner = () => (
    <View style={styles.spinner}>
      <ActivityIndicator animating size='large' />
    </View>
  );

  return (
    <List containerStyle={styles.container}>
      {refreshing ? renderSpinner() : renderList()}
    </List>
  )
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    flex: 1,
    marginTop: 0,
    width: '100%'
  },
  spinner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired
};

export { ArticleList };