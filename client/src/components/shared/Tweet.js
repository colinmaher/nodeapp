import React from 'react';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Button from ' @material-ui/core/Button'

export default function Tweet(props) {
  const [like, setLike] = React.useState(props.tweet);
  console.log(props.tweet)
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
  return (
    <Box>
      <Typography>{props.tweet}</Typography>
      {like ? <Button color="primary" onClick={updateLike(true)}>Like</Button> :
      <Button color="secondary" onClick={updateLike(false)}>Unlike</Button>}
    </Box>
  )
}