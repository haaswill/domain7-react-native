'use strict';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, List } from 'react-native-elements';
import { Article } from './Article';
import { formatDateToReadable } from '../handlers/formatter';

const ArticleList = ({ articles, loading }) => {
  const generateList = ({ item: { author, publishedAt, description, urlToImage, url, title } }) => (
    <Article
      author={author}
      datetime={formatDateToReadable(publishedAt)}
      description={description}
      image={urlToImage}
      title={title}
      url={url}
    />
  );

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
        renderItem={generateList}
        keyExtractor={article => article.url}
      />
    );
  }

  const renderSpinner = () => (
    <View style={styles.spinner}>
      <ActivityIndicator />
    </View>
  );

  return (
    <List
      containerStyle={styles.container}
    >
      {
        loading ? renderSpinner() : renderList()
      }
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
  loading: PropTypes.bool.isRequired
};

export { ArticleList };