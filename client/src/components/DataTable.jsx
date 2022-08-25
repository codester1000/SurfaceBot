import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { CDBCard, CDBCardBody, CDBCardTitle, CDBCardText, CDBIcon, CDBContainer } from "cdbreact";


const DataTable = ({ users, title, th }) => {
  // function to fix data to make it 
  const timeFix = (delta) => {
    let hours = Math.floor(delta / 3600)
    delta -= hours*3600
    if (hours === 0) {
      hours = '00'
    } else if (hours.length === 1){
      hours = `0${hours}`
    }
    let mins = Math.floor(delta / 60)
    delta -= mins*60
    if (mins === 0) {
      mins = '00'
    } else if (mins.length === 1){
      mins = `0${mins}`
    }
    let secs = delta
    if (secs == 0) {
      secs = '00'
    } else if (secs < 10){
      secs = `0${secs}`
    }
  
    return `${hours}:${mins}:${secs}`
  }

  const DataRow = ({ username, data }) => {
    return (
    <tr>
      <td>{username}</td>
      <td>{data}</td>
    </tr>
    )
  }

  let userList = []
  if (title === "Messages") {
    const filterData = users.sort((a, b) => b.numberOfMessages - a.numberOfMessages)
    userList = users.map((user) => {
      return <DataRow key={user.userID} username={user.username} data={user.numberOfMessages} />
    })
  } else if (title === "Voice Chat") {
    const filterData = users.sort((a, b) => b.voiceChatTime - a.voiceChatTime)
    userList = users.map((user) => {
      let time = timeFix(user.voiceChatTime)
      return <DataRow key={user.userID} username={user.username} data={time} />
    })
  } else if (title === "Invites") {
    const filterData = users.sort((a, b) => b.invitees.length - a.invitees.length)
    userList = users.map((user) => {
      let time = timeFix(user.voiceChatTime)
      return <DataRow key={user.userID} username={user.username} data={user.invitees.length} />
    })
  }
  return (
    <div className='user_table'>
      <h4>{title}</h4>
      <Table bordereless striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>{th}</th>
          </tr>
        </thead>
        <tbody>
          {users && userList}
        </tbody>
      </Table>
    </div>
  )
}

export default DataTable