import { useState, useEffect } from 'react'
import React from 'react'
import Container from 'react-bootstrap/Container';
import Chart from './Chart';
import TopCards from './TopCards';
import serverData from '../serverTestData.json';
import userData from '../userTestData.json';
import DataTable from './DataTable';

const Board = (props) => {
  const totalMessages = serverData.messagesSent
  const totalUsers = serverData.users.length
  return (
      <Container>
        <div className='top'>
          <TopCards title="Total Users" data={totalUsers}/>
          <TopCards title="Total Messages" data={totalMessages}/>
          <TopCards title="Invited Users" data={totalUsers}/>
        </div>
        {/* <Chart /> */}
        <div className='bottom'>
          <DataTable users={userData} title="Messages Sent"/>
          <DataTable users={userData} title="Invites"/>
        </div>
      </Container>
  )
}

export default Board;