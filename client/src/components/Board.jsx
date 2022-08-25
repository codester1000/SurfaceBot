import { useState, useEffect } from 'react'
import React from 'react'
import Container from 'react-bootstrap/Container';
import Chart from './Chart';
import TopCards from './TopCards';
import DataTable from './DataTable';

const Board = ( { server, users } ) => {
  const totalUsers = users.length
  const totalMessages = server.messagesSent
  console.log(server.messagesSent)

  
  return (
      <Container>
        <div className='top'>
          <TopCards title="Total Messages" data={totalMessages}/>
          <TopCards title="Total Users" data={totalUsers}/>
          <TopCards title="Invited Users" data={totalUsers}/>
        </div>
        {/* <Chart /> */}
        <div className='bottom'>
          <DataTable users={users} title="Messages" th="Sent"/>
          <DataTable users={users} title="Voice Chat" th="Time (hr:min:sec)"/>
          <DataTable users={users} title="Invites" th="Users Invited"/>
        </div>
      </Container>
  )
}

export default Board;