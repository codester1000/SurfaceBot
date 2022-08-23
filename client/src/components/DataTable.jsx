import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { CDBCard, CDBCardBody, CDBCardTitle, CDBCardText, CDBIcon, CDBContainer } from "cdbreact";


const DataTable = ({ users, title }) => {

  const DataRow = ({ username, messagesSent }) => {
    return (
    <tr>
      <td>{username}</td>
      <td>{messagesSent}</td>
    </tr>
    )
  }

  const filterData = users.sort((a, b) => b.numberOfMessages - a.numberOfMessages)
  const userList = users.map((user) => {
    return <DataRow key={user.userID} username={user.username} messagesSent={user.numberOfMessages} />

  })
  return (
    <div className='user_table'>
      <h4>{title}</h4>
      <Table bordereless striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>Messages Sent</th>
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