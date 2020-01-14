//import liraries
import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {Context} from '../context/BlogContext';

// create a component
const CreateScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {addBlogPost} = useContext(Context);
  return (
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
        title="Add Blog Post"
        onPress={() => {
          addBlogPost(title, content, () => {
            return navigation.navigate('Index');
          });
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: 300,
    margin: 10,
    flex: 1,
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
    paddingVertical: 5,
    marginBottom: 5,
  },
});

//make this component available to the app
export default CreateScreen;
