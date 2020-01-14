//import liraries
import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {Context} from '../context/BlogContext';

// create a component
const EditScreen = ({navigation}) => {
  const {state, updateBlogPost} = useContext(Context);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    const blogPost = state.find(post => post.id === navigation.getParam('id'));

    setTitle(blogPost.title);
    setContent(blogPost.content);
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Enter Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <Text style={styles.text}>Enter Content:</Text>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={text => setContent(text)}
        />
        <Button
          title="Update Blog Post"
          onPress={() =>
            updateBlogPost(navigation.getParam('id'), title, content, () => {
              return navigation.navigate('Index');
            })
          }
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: 300,
    margin: 10,
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 1,
    width: 300,
    height: 40,
    paddingVertical: 5,
    marginBottom: 5,
  },
});

//make this component available to the app
export default EditScreen;
