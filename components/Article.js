'use strict';
import React from 'react';
import { Linking, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-elements';

const Article = ({ title, image, description, author, datetime, url }) => {
  const handleOnPress = () => Linking.openURL(url);
  console.log(image)
  return (
    <Card
      featuredSubtitle={`By ${author} - Published on ${datetime}`}
      image={{ uri: image }}
      title={title}
    >
      <Text style={{ margin: 5 }}>
        {description}
      </Text>
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{ borderRadius: 2, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 5 }}
        icon={{ name: 'open-in-browser' }}
        onPress={handleOnPress}
        title='VIEW NOW'
      />
    </Card>
  )
};

Article.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  datetime: PropTypes.string,
  url: PropTypes.string.isRequired
}

export { Article };