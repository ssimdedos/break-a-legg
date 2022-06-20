export async function getClientIds() {
  try {
    const res = await fetch("http://172.30.1.15:7303/api/auth/getIds/");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function signIn(params) {
  try {
    if (params.id_token != undefined) {
      fetch("http://172.30.1.15:7303/api/auth/checkGID/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          params,
        }),
      })
        .then((res) => {
          const data = res.json();
          console.log(data);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.stauts);
            console.log(err.response.header);
          }
        });
    }
  } catch (e) {
    console.log(e);
  }
}
