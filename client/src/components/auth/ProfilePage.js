import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { HistoryFeed } from '../home/Feed'
import ACTIONS from "../../actions/actions"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({

}));


export default function ProfilePage(props) {
  const classes = useStyles()
  const userData = useSelector(state => {
    return state.userData
  })


  if (userData === null) return null
  return (
    <Container m={1} maxWidth="md">
      <Box m={2}>
        <HistoryFeed />
      </Box>
    </Container>

  )
}