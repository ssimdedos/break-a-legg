import { View, Image, StyleSheet, Dimensions, Pressable, Button, Text } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function HomeScreen({ navigation: { navigate } }) {
  const [trial, setTrial] = useState(0);
  const [touchStartDate, setTouchStartDate] = useState();
  const [touchEndDate, setTouchEndDate] = useState();
  const [grade, setGrade] = useState();
  const [eggSetting, setEggSetting] = useState(true);
  const [userInfo, setUserInfo] = useState();

  function setEgg() {
    eggSetting ? setEggSetting(false) : setEggSetting(true);
  }

  const onTouchStart = () => {
    setTouchStartDate(new Date().getTime());
  };
  const onTouchEnd = () => {
    setTouchEndDate(new Date().getTime());
    setEgg();
  };

  useEffect(() => {
    AsyncStorage.getItem('@user_info').then((data) => {
      data = JSON.parse(data);
      //console.log(typeof data);
      setUserInfo(data);
    });
  }, []);

  useEffect(() => {
    if (touchEndDate != undefined) {
      const timeDifference = touchEndDate - touchStartDate;
      console.log(timeDifference);
      grading(timeDifference);
    }
  }, [touchEndDate]);

  useEffect(() => {
    if (grade != undefined) {
      console.log(grade);
      console.log('trial: ', trial);
      console.log('eggSetting: ', eggSetting);
      const timeDifference = `${(touchEndDate - touchStartDate) / 1000}초`;
      const gameInfo = { trial: trial, grade: grade, timeDifference: timeDifference };
      AsyncStorage.setItem('@game_info', JSON.stringify(gameInfo));
      getCard(grade);
    }
  }, [trial]);

  const grading = (x) => {
    if (x < 30000 && x >= 10000) {
      // 10초에서 30초
      setGrade(() => 'F');
    } else if (x >= 30000 && x < 60000) {
      // 30초에서 1분
      setGrade(() => 'D');
    } else if (x >= 60000 && x < 300000) {
      // 1분에서 5분
      setGrade(() => 'C');
    } else if (x >= 300000 && x < 600000) {
      // 5분에서 10분
      setGrade(() => 'B');
    } else if (x >= 600000 && x < 1200000) {
      // 10분에서 20분
      setGrade(() => 'A');
    } else if (x >= 1200000 && x < 3600000) {
      // 20분에서 1시간
      setGrade(() => 'S');
    } else if (x >= 3600000) {
      // 1시간 이상
      setGrade(() => 'SS');
    } else if (x < 10000 && x > 0) {
      setGrade(() => '노력이 부족합니다');
    } else if (x < 0) {
      console.error(400, '오류 발생');
    }
    setTrial((trial) => trial + 1);
  };

  function getCard(x) {
    //각 등급에 맞는 이미지 불러오기(백엔드에 쿼리요청)
    switch (x) {
      case 'F':
        break;
      case 'D':
        break;
      case 'C':
        break;
      case 'B':
        break;
      case 'A':
        break;
      case 'S':
        break;
      case 'SS':
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userInfo != null ? (
          <View style={styles.userProfile}>
            <Text>Hello {userInfo.name}!</Text>
            <Pressable onPress={() => navigate('Mypage')}>
              <Entypo name='emoji-flirt' size={35} color='black' />
            </Pressable>
          </View>
        ) : (
          <View>
            <Text>Hello</Text>
          </View>
        )}
      </View>
      <View style={styles.mainContainer}>
        <Pressable style={styles.switchBtn}>
          <FontAwesome5 name='caret-left' size={60} color='orange' />
        </Pressable>
        {eggSetting ? (
          <Pressable
            style={styles.mainImgContainer}
            onPressIn={onTouchStart}
            onPressOut={onTouchEnd}
          >
            <Image style={styles.mainImg} source={require('../assets/static/egg.png')} />
          </Pressable>
        ) : (
          <View style={styles.brokenEgg}>
            <Pressable>
              <Image
                style={styles.mainImg}
                source={require(`../assets/static/broken_egg.png`)} //요청된 이미지로 바꿔줘야함
              />
            </Pressable>
            <View>
              <Button onPress={setEgg} title='다시 깨기!' />
              <Button onPress={() => navigate('Bag')} title='가방' />
            </View>
          </View>
        )}
        <Pressable onPress={() => navigate('Bag')} style={styles.switchBtn}>
          <FontAwesome5 name='caret-right' size={60} color='orange' />
        </Pressable>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImgContainer: {
    flex: 1,
    flexDirection: 'row',
    //height: SCREEN_HEIGHT / 2,
    //justifyContent: "center",
    alignItems: 'center',
  },
  mainContainer: {
    flex: 5,
    flexDirection: 'row',
  },
  mainImg: {
    width: SCREEN_WIDTH * 0.75,
    resizeMode: 'contain',
  },
  switchBtn: {
    flex: 0.1,
    alignSelf: 'center',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  brokenEgg: {
    flex: 1,
    flexDirection: 'column',
  },
  userProfile: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default HomeScreen;
