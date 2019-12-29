import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
  Redirect,
  useParams
} from "react-router-dom";
import { HistoryFeed } from "./Feed"
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'


const useStyles = makeStyles(theme => ({

}))

function GenericProfilePage(props) {
  const { id } = useParams()
  const classes = useStyles()
  const userData = useSelector(state => {
    return state.userData
  })
  if (id !== userData.data.oktaId) {

    return (
      <Container m={1} maxWidth="md">
        <Box m={2}>
          <HistoryFeed id={id} />
        </Box>
      </Container>
    )
  }
  else return (<Redirect to={{ pathname: '/profile' }} />)
}
export default GenericProfilePage