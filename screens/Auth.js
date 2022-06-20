import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { Button, View } from "react-native";
import { getClientIds, signIn } from "../services/authService";

const EXPO_CLIENT_ID =
  "860947032898-bitvl9bv2uif6sk9i5l45dpba2n33qcm.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "60947032898-ch01hjhttp6nnna1oar57984vi0luqoq.apps.googleusercontent.com";
function AuthScreen({ navigation: { navigate } }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    responseType: "id_token",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { params } = response;
      //console.log(authentication);
      //console.log(params.id_token);
      signIn(params);
    }
  }, [response]);

  return (
    <View>
      <Button
        disabled={!request}
        title="로그인"
        onPress={() => promptAsync({ useProxy: true })}
      />
    </View>
  );
}

export default AuthScreen;
