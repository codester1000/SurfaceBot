import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { CDBCard, CDBCardBody, CDBCardTitle, CDBCardText, CDBIcon, CDBContainer } from "cdbreact";


const DataTable = ({ users, title }) => {

  const DataRow = ({ id, username, messagesSent }) => {
    
    return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{messagesSent}</td>
    </tr>
    )
  }

  const userList = users.map((user) => {
    return <DataRow id={user.id} username={user.username} messagesSent={user.messagesSent} />

  })
  return (
    <div className='user_table'>
      <h4>{title}</h4>
      <Table bordereless striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Messages Sent</th>
          </tr>
        </thead>
        <tbody>
          {userList}
        </tbody>
      </Table>
    </div>
  )
}

export default DataTable