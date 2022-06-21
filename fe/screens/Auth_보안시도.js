import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { Button, View } from "react-native";
import { getClientIds } from "../services/authService";

function AuthScreen({ navigation: { navigate } }) {
  const [idList, setIdList] = useState();

  useEffect(() => {
    getClientIds()
      .then((res) => {
        // const EXPO_CLIENT_ID = res.EXPO_CLIENT_ID;
        // const ANDROID_CLIENT_ID = res.ANDROID_CLIENT_ID;
        // setIdList({ EXPO_CLIENT_ID, ANDROID_CLIENT_ID });
        setIdList(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const authRequestData = setTimeout(() => {
    Google.useAuthRequest({
      expoClientId: idList.EXPO_CLIENT_ID,
      androidClientId: idList.ANDROID_CLIENT_ID,
      responseType: "id_token",
    });
  }, 100);

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { params } = response;
  //     //console.log(authentication);
  //     //console.log(params.id_token);
  //     try {
  //       if (params.id_token != undefined) {
  //         fetch("http://172.30.1.15:7303/api/auth/checkGID/", {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             params,
  //           }),
  //         })
  //           .then((res) => {
  //             console.log("서버로부터 응답 받음");
  //           })
  //           .catch((err) => {
  //             if (err.response) {
  //               console.log(err.response.data);
  //               console.log(err.response.stauts);
  //               console.log(err.response.header);
  //             }
  //           });
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // }, [response]);

  return (
    <View>
      <Button
        // disabled={!request}
        title="로그인"
        // onPress={() => promptAsync({ useProxy: true })}
      />
    </View>
  );
}

export default AuthScreen;
