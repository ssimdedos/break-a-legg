import { View, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function HomeScreen({ navigation: { navigate } }) {
  const [grade, setGrade] = useState('F');

  return (
    <View style={styles.container}>
      <Pressable style={styles.switchBtn}>
        <FontAwesome5 name='caret-left' size={60} color='orange' />
      </Pressable>
      <Pressable style={styles.mainImgContainer}>
        <Image style={styles.mainImg} source={require('../assets/static/egg.png')} />
      </Pressable>
      <Pressable onPress={() => navigate('Bag')} style={styles.switchBtn}>
        <FontAwesome5 name='caret-right' size={60} color='orange' />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImgContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  mainImg: {
    width: SCREEN_WIDTH * 0.75,
    resizeMode: 'contain',
  },
  switchBtn: {
    flex: 0.1,
  },
});

export default HomeScreen;
