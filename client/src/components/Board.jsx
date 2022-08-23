import { useState, useEffect } from 'react'
import React from 'react'
import Container from 'react-bootstrap/Container';
import Chart from './Chart';
import TopCards from './TopCards';
import DataTable from './DataTable';

const Board = ( { server, users } ) => {
  const totalUsers = users.length
  const totalMessages = server.messagesSent

  
  return (
      <Container>
        <div className='top'>
          <TopCards title="Total Users" data={totalUsers}/>
          <TopCards title="Total Messages" data={totalMessages}/>
          <TopCards title="Invited Users" data={totalUsers}/>
        </div>
        {/* <Chart /> */}
        <div className='bottom'>
          <DataTable users={users} title="Messages Sent"/>
          <DataTable users={users} title="Invites"/>
        </div>
      </Container>
  )
}

export default Board;