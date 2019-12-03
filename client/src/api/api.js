export default {
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
        throw "Error updating user data"
      }
    }
  },

  getUserData: async (id, token) => {
    if (id && token) {
      try {
        const newUserData = await fetch('/user/' + id, {
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
        throw "Error fetching user data"
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

  deleteTweet: async (userId, tweet, token) => {
    if (userId && tweet && token) {
      try {
        await fetch("/user/" + userId + "/delete/" + tweet._id, {
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