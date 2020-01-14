import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import {FlatList} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const IndexScreen = ({navigation}) => {
  const {state, deleteBlogPost} = useContext(BlogContext);
  console.log('Index screen', state);
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Show', {id: item.id})}>
            <Text style={{fontSize: 20, width: 200}}>
              {item.title} - {item.content}
            </Text>
            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
              <FontAwesome5 name="trash" solid regular size={30} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <FontAwesome5 name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e8e8e8',
  },
});

export default IndexScreen;
