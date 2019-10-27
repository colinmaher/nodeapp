import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "../../actions/actions";
import TweetBox from './TweetBox'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles({
  root: {
    display: "inline-block",
    width: "100%"
  },
  tweet: {
    display: "inline-block",
  },
  btn: {
    display: "inline-block",
  },

});

export default function Tweet(props) {
  const classes = useStyles();
  const [like, setLike] = React.useState(null);
  const [editBoxOpen, setEditBoxOpen] = React.useState(false);
  // console.log(props.tweet.text)
  const tweet = props.tweet.text
  const dispatch = useDispatch()
  const id = useSelector(state => state.userData.oktaId)
  // console.log(id)

  // console.log(typeof tweet)
  async function updateLike(val) {
    setLike(val)
    fetch("/tweet/updateLike", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ val })
    })
  }

  async function deleteTweet() {
    console.log(props.tweet._id)
    try {
      await fetch("/user/" + id + "/delete/" + props.tweet._id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      dispatch(ACTIONS.deleteTweet(props.tweet._id))
    }
    catch (err) {
      throw Error()
    }
  }

  async function editTweet() {
    console.log(props.tweet._id)
    try {
      await fetch("/user/" + id + "/edit/" + props.tweet._id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: {
          tweet: ""
        }
      })

      dispatch(ACTIONS.editTweet(props.tweet._id))
    }
    catch (err) {
      throw Error()
    }
  }

  return (
    <Box >
      <span className={classes.root}>
        <Typography variant="body1" className={classes.tweet} gutterBottom>
          {tweet}
        </Typography>
        <Button color="primary" className={classes.btn} onClick={() => deleteTweet()}><DeleteIcon /></Button>
        <Button color="primary" className={classes.btn} onClick={() => setEditBoxOpen(!editBoxOpen)}><EditIcon /></Button>
        { editBoxOpen ? <TweetBox tweet={tweet}/> : null }  
      </span>

      {/* {
        like
          ?
          <Button color="primary" onClick={() => updateLike(true)}>Like</Button>
          :
          <Button color="secondary" onClick={() => updateLike(false)}>Unlike</Button>
      } */}
    </Box>
  )
}