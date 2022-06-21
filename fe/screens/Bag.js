import { View, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

function BagScreen({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.switchBtn}>
        <FontAwesome5 name='caret-left' size={60} color='orange' />
      </Pressable>
      <View style={styles.mainImgContainer}>
        <Image style={styles.mainImg} source={require('../assets/static/brown.jpg')} />
      </View>
      <Pressable style={styles.switchBtn} onPress={() => navigate('Break a Legg')}>
        <FontAwesome5 name='caret-right' size={60} color='orange' />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImgContainer: {
    flex: 1,
  },
  mainImg: {
    height: SCREEN_HEIGHT,
    //width: SCREEN_WIDTH,
    resizeMode: 'stretch',
  },
  switchBtn: {
    flex: 0.1,
  },
});

export default BagScreen;
