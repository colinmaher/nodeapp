import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "../../actions/actions";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    width: "100%"
  },
  tweet: {
    display: "inline-block",
  },
  deleteBtn: {
    display: "inline-block",
  },

});

export default function Tweet(props) {
  const classes = useStyles();
  const [like, setLike] = React.useState(null);
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
    fetch("/user/" + id + "/delete/" + props.tweet._id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      const newData = res.json()
      console.log(newData)
      dispatch(ACTIONS.deleteTweet(newData.tweets))
    }).catch(err => {
      throw Error(err)
    })
  }

  return (
    <Box >
      <span className={classes.root}>
        <Typography variant="body1" className={classes.tweet} gutterBottom>

          {tweet}

        </Typography>
        <Button color="primary" className={classes.deleteBtn} onClick={() => deleteTweet()}><DeleteIcon /></Button>
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