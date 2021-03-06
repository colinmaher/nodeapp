import React, { useContext } from 'react'
import { useDispatch, useSelector } from "react-redux"
import ACTIONS from "../../actions/actions"
import TweetBox from './TweetBox'
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Avatar from '@material-ui/core/Avatar'


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100px',
  },
  tweet: {
    textAlign: 'left',
    wordWrap: 'break-word',
  },
  tweetBox: {
    margin: theme.spacing(1),

    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '5px',
    borderColor: theme.palette.primary.main,

  },
  btnContainer: {
    flexDirection: "column"
  },
  authorName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  defaultAvatar: {
    backgroundColor: 'orange'
  },


}))

export default function Tweet(props) {
  const classes = useStyles();
  // const [like, setLike] = React.useState(null);
  const [editBoxOpen, setEditBoxOpen] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState(null)
  const tweet = props.tweet
  const dispatch = useDispatch()
  const auth = useContext(AuthContext)
  // const api = useContext(ApiContext)
  const userData = useSelector(state => {
    return state.userData
  })


  async function handleDeleteTweet() {
    try {
      const token = await auth.getAccessToken()
      // await api.deleteTweet(userData.data.oktaId, tweet, token)
      dispatch(ACTIONS.deleteTweetRequest(userData.data.oktaId, tweet._id, token))
      setDeleteError(false)
    }
    catch (e) {
      setDeleteError(true)
    }
  }

  const btnContainer = () => {
    // console.log(tweet.authorOktaId)
    // console.log(userData)
    if (tweet.authorOktaId === userData.data.oktaId) {
      return (
        <Grid container spacing={1} className={classes.btnContainer}>
          <Grid item >
            <Button color="primary" className={classes.btn} onClick={handleDeleteTweet}><DeleteIcon /></Button>
          </Grid>
          <Grid item >
            <Button color="primary" className={classes.btn} onClick={() => setEditBoxOpen(!editBoxOpen)}><EditIcon /></Button>
          </Grid>
        </Grid>
      )
    }
    else return null
  }

  const profileLink = () => {
    // console.log(tweet)
    if (tweet.authorOktaId === userData.data.oktaId) {
      return <Link to="/profile"><Typography className={classes.authorName}>{tweet.authorName}</Typography></Link>
    }
    else {
      return <Link to={"/profile/" + tweet.authorOktaId}><Typography className={classes.authorName}>{tweet.authorName}</Typography></Link>
    }
  }

  return (
    <Box className={classes.tweetBox} boxShadow={2} p={2}>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
        spacing={1}
        wrap="nowrap"
      >
        {/* <Paper> */}

        <Grid item xs={2} >
          <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.root}
            spacing={1}
            wrap="nowrap"
          >
            <Grid item xs={12}>
              {
                tweet.authorName ?
                  <Avatar style={tweet.avatarColor ?
                    { backgroundColor: tweet.avatarColor }
                    : { backgroundColor: 'red' }}>
                    {tweet.authorName[0]}
                  </Avatar>
                  : <Avatar className={classes.defaultAvatar}>#</Avatar>
              }
            </Grid>
            <Grid item xs={12}>
              {profileLink()}
            </Grid>

          </Grid>

        </Grid>

        <Grid item xs={8} >
          <Box p={2}>
            <Typography variant="body1" className={classes.tweet} gutterBottom>
              {tweet.text}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={2} item>
          {btnContainer()}
        </Grid>
        {deleteError ? "Error deleting tweet." : null}

      </Grid>
      {editBoxOpen ? <TweetBox tweetText={tweet.text} id={tweet._id} editing={true} /> : null}

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