export default {
  getUserData: async (auth) => {
    if (auth) {
      try {
        const newUserData = await fetch('/user/' + auth.sub, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })

        return newUserData.json()
      }
      catch (err) {
        throw Error(err)
      }
    }
  },

  postTweet: async (auth, tweet) => {
    const payload = {
      tweet: tweet,
    }
    const user = await auth.getUser()
    try {
      const res = await fetch('/user/' + user.sub + '/tweet', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      return res.json()
    }
    catch (err) {
      throw Error(err)
    }
  },

  deleteTweet: async (auth, tweet) => {
    const user = await auth.getUser()
    try {
      await fetch("/user/" + user.sub + "/delete/" + tweet._id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      return

    }
    catch (err) {
      throw Error(err)
    }
  },

  editTweet: async (auth, tweetText, id) => {
    console.log(tweetText)
    const payload = {
      tweetText: tweetText,
    }
    const user = await auth.getUser()
    try {
      const res = await fetch("/user/" + user.sub + "/edit/" + id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const json = await res.json()
      // console.log(json)
      return json 
    }
    catch (err) {
      throw Error(err)
    }
  },
}