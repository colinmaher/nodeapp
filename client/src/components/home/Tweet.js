import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "../../actions/actions";
import TweetBox from './TweetBox'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'

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
  // const [like, setLike] = React.useState(null);
  const [editBoxOpen, setEditBoxOpen] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState(null)
  const tweet = props.tweet
  const dispatch = useDispatch()
  const auth = useContext(AuthContext)
  const api = useContext(ApiContext)

  async function handleDeleteTweet() {
    try {
      debugger
      await api.deleteTweet(auth, tweet)
      dispatch(ACTIONS.deleteTweet(tweet._id))
      setDeleteError(false)
    }
    catch (e) {
      setDeleteError(true)
    }
  }
  return (
    <Box >
      <span className={classes.root}>
        <Typography variant="body1" className={classes.tweet} gutterBottom>
          {tweet.text}
        </Typography>
        <Button color="primary" className={classes.btn} onClick={handleDeleteTweet}><DeleteIcon /></Button>
        <Button color="primary" className={classes.btn} onClick={() => setEditBoxOpen(!editBoxOpen)}><EditIcon /></Button>
        { deleteError ? "Error deleting tweet." : null }
        { editBoxOpen ? <TweetBox tweetText={tweet.text} id={tweet._id} editing={true}/> : null }  
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