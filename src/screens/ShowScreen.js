//import liraries
import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// create a component
const ShowScreen = ({navigation}) => {
  const {state} = useContext(Context);

  const blogPost = state.find(post => post.id === navigation.getParam('id'));
  return (
    <View style={styles.container}>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit', {id: navigation.getParam('id')})
        }>
        <FontAwesome5 name="edit" size={30} />
      </TouchableOpacity>
    ),
  };
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

//make this component available to the app
export default ShowScreen;
