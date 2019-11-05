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

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100px',
  },
  tweet: {
    textAlign: 'left',
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

  }
}))

export default function Tweet(props) {
  const classes = useStyles();
  // const [like, setLike] = React.useState(null);
  const [editBoxOpen, setEditBoxOpen] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState(null)
  const tweet = props.tweet
  const dispatch = useDispatch()
  // const auth = useContext(AuthContext)
  const api = useContext(ApiContext)
  const userData = useSelector(state => {
    return state.userData
  })

  async function handleDeleteTweet() {
    try {
      await api.deleteTweet(userData.oktaId, tweet)
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
        <Grid item className={classes.btnContainer} >
          <Button color="primary" className={classes.btn} onClick={handleDeleteTweet}><DeleteIcon /></Button>
          <Button color="primary" className={classes.btn} onClick={() => setEditBoxOpen(!editBoxOpen)}><EditIcon /></Button>
        </Grid>
      )
    }
    else return null
  }

  return (
    <Box className={classes.tweetBox} boxShadow={2}>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center" className={classes.root}>
        {/* <Paper> */}
        <Grid item sm={8} xs={12}>
          <Typography variant="body1" className={classes.tweet} gutterBottom>
            {tweet.text}
          </Typography>
        </Grid>

        {btnContainer()}



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