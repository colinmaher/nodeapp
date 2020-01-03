export default {
  createUser: async (payload) => {
    console.log(payload)
    try {
      await fetch('/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
    }
    catch (err) {
      throw "Cannot create user right now"
    }
  },
  setUserData: async (id, token, payload) => {
    if (id && token && payload) {
      try {
        const newUserData = await fetch('/user/' + id, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(payload)
        })
        return newUserData.json()
      }
      catch (err) {
        throw "Cannot update user data right now"
      }
    }
  },

  getUserData: async (id, token) => {
    if (id && token) {
      try {
        let newUserData = await fetch('/user/' + id, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        })

        return newUserData.json()
      }
      catch (err) {
        throw "Cannot fetch user data right now"
      }
    }
  },

  fetchTweets: async (id) => {
    if (id) {
      try {
        const tweets = await fetch('/tweets/' + id, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        return tweets.json()
      }
      catch (err) {
        throw "Cannot fetch tweets right now"
      }
    }
  },

  getLatestTweets: async (page, limit) => {
    const payload = {
      page: page,
      limit: limit,
    }
    const buildUri = (url, args) => {
      let qs = ''
      for (const key in args) {
        if (args.hasOwnProperty(key))
          qs += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]) + '&'
      }
      if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1)
        url = url + '?' + qs
      }
      return url
    }

    try {
      const res = await fetch(buildUri('/latestTweets/', payload), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      return res.json()
    }
    catch (err) {
      throw "Error fetching latest tweets"
    }
  },

  postTweet: async (userId, tweet, token) => {
    if (userId && tweet && token) {
      const payload = {
        tweet: tweet,
      }
      try {
        const res = await fetch('/user/' + userId + '/tweet', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(payload)
        })
        return res.json()
      }
      catch (err) {
        throw "Error posting tweet"
      }
    }
  },

  deleteTweet: async (userId, tweetId, token) => {
    if (userId && tweetId && token) {
      try {
        await fetch("/user/" + userId + "/delete/" + tweetId, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        })
      }
      catch (err) {
        throw "Error deleting tweet"
      }
    }
  },

  editTweet: async (userId, tweetText, id, token) => {
    if (userId && tweetText && token && id) {
      const payload = {
        tweetText: tweetText,
      }

      try {
        const res = await fetch("/user/" + userId + "/edit/" + id, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(payload)
        })
        const json = await res.json()
        // console.log(json)
        return json
      }
      catch (err) {
        throw "Error updating tweet"
      }
    }
  },
}