export default {
  getUserData: async (id, token) => {
    if (id) {
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
        throw Error(err)
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
      throw Error(err)
    }
  },

  postTweet: async (userId, tweet, token) => {
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
      throw Error(err)
    }
  },

  deleteTweet: async (userId, tweet, token) => {

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
      throw Error(err)
    }
  },

  editTweet: async (userId, tweetText, id, token) => {
    console.log(tweetText)
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
      throw Error(err)
    }
  },
}