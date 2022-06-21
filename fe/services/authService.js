export async function getClientIds() {
  try {
    const res = await fetch("http://15.164.228.39:7303/api/auth/getIds/");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function signIn(params) {
  if (params.id_token != undefined) {
    const data = await fetch("http://15.164.228.39:7303/api/auth/checkGID/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        // console.log(data);
        return data;
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.stauts);
          console.log(err.response.header);
        }
      });
    return data;
  }
}

export async function getUserId() {}
