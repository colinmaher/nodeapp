import React, { useContext } from 'react'
import { useDispatch, useSelector } from "react-redux"
import ACTIONS from "../../actions/actions"
import TweetBox from './TweetBox'
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple, indigo, red, orange, green, blue, teal } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100px',
  },
  tweet: {
    textAlign: 'left',
    wordWrap: 'break-word',
  },
  btn: {

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
    textOverflow: 'ellipsis'
  }

}))

export default function Tweet(props) {
  const classes = useStyles();
  // const [like, setLike] = React.useState(null);
  const [editBoxOpen, setEditBoxOpen] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState(null)
  const tweet = props.tweet
  const dispatch = useDispatch()
  const auth = useContext(AuthContext)
  const api = useContext(ApiContext)
  const userData = useSelector(state => {
    return state.userData
  })
  const defaultUserIconColors =
    [
      {
        backgroundColor: deepPurple[500],
      },
      {
        backgroundColor: deepOrange[500],
      },
      {
        backgroundColor: green[500],
      },
      {
        backgroundColor: orange[500],
      },
      {
        backgroundColor: red[500],
      },
      {
        backgroundColor: indigo[300],
      },
      {
        backgroundColor: blue[300],
      },
      {
        backgroundColor: teal[500],
      }
    ]

  async function handleDeleteTweet() {
    try {
      const token = await auth.getAccessToken()
      await api.deleteTweet(userData.oktaId, tweet, token)
      dispatch(ACTIONS.deleteTweet(tweet._id))
      setDeleteError(false)
    }
    catch (e) {
      setDeleteError(true)
    }
  }

  const btnContainer = () => {
    if (tweet.authorOktaId == userData.oktaId) {
      return (
        <Grid container className={classes.btnContainer}>
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
              {tweet.authorName ? <Avatar style={defaultUserIconColors[Math.floor(Math.random() * Math.floor(defaultUserIconColors.length))]}>{tweet.authorName[0]}</Avatar> : <AccountCircle color="primary" fontSize="large" />}
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.authorName}>{tweet.authorName}</Typography>
            </Grid>

          </Grid>

        </Grid>

        <Grid item xs={8} >
          <Typography variant="body1" className={classes.tweet} gutterBottom>
            {tweet.text}
          </Typography>
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