export default {
  getUserData: async (id) => {
    if (id) {
      try {
        const newUserData = await fetch('/user/' + id, {
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

  postTweet: async (userId, tweet) => {
    const payload = {
      tweet: tweet,
    }
    
    try {
      const res = await fetch('/user/' + userId + '/tweet', {
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

  deleteTweet: async (userId, tweet) => {
    
    try {
      await fetch("/user/" + userId + "/delete/" + tweet._id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
    catch (err) {
      throw Error(err)
    }
  },

  editTweet: async (userId, tweetText, id) => {
    console.log(tweetText)
    const payload = {
      tweetText: tweetText,
    }
    
    try {
      const res = await fetch("/user/" + userId + "/edit/" + id, {
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