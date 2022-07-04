import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

function MypageScreen({ navigation: { navigate } }) {
  const [userInfo, setUserInfo] = useState();
  const [gameInfo, setGameInfo] = useState();

  useEffect(() => {
    AsyncStorage.getItem('@user_info').then((data) => {
      data = JSON.parse(data);
      setUserInfo(data);
    });

    AsyncStorage.getItem('@game_info').then((data) => {
      if (data != undefined) {
        data = JSON.parse(data);
        setGameInfo(data);
      }
    });
  }, []);

  return (
    <View>
      {userInfo == undefined ? (
        <View></View>
      ) : (
        <View>
          <Text>이름: {userInfo.name}</Text>
          <Text>별명: 미정</Text>
        </View>
      )}
      <View>
        {gameInfo == undefined ? (
          <View>
            <Text>깨진 알: 알을 깨세요!</Text>
            <Text>최고기록: 0초</Text>
          </View>
        ) : (
          <View>
            <Text>깨진 알: {gameInfo.trial}알</Text>
            <Text>최고기록: {gameInfo.timeDifference}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default MypageScreen;
