import React, { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import MainContainer from './components/MainContainer'

import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'

import Groups from './pages/groups/List'
import NewGroup from './pages/groups/New'
import UpdateGroup from './pages/groups/Update'

import Issues from './pages/issues/List'
import Issue from './pages/issues/Issue'
import NewIssue from './pages/issues/New'
import UpdateIssue from './pages/issues/Update'

import Solutions from './pages/solutions/List'
import Solution from './pages/solutions/Solution'
import UpdateSolution from './pages/solutions/Update'

function App() {

  /* teste | trocar arquivo CSS pra dark/light mode */
  const style = document.getElementById('style');
  if (false) {
    style.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.2.2/darkly/bootstrap.min.css'
  } else {
    style.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.2.2/sandstone/bootstrap.min.css'
  }

  return (
    <>
      <Navbar />
      <MainContainer>
        <Sidebar />
        {/* parte dinâmica do app */}
        <Routes>
          <Route path="/" element={<Dashboard />} index />
          <Route path="settings" element={<Settings />} />

          <Route path="groups" element={<Groups />} />
          <Route path="groups/new" element={<NewGroup />} />
          <Route path="groups/:id/update" element={<UpdateGroup />} />

          <Route path="issues/" element={<Issues />} />
          <Route path="issues/:id" element={<Issue />} />
          <Route path="issues/new" element={<NewIssue />} />
          <Route path="issues/:id/update" element={<UpdateIssue />} />

          <Route path="solutions" element={<Solutions />} />
          <Route path="solutions/:id" element={<Solution />} />
          <Route path="solutions/:id/update" element={<UpdateSolution />} />
        </Routes>
      </MainContainer>
    </>
  )
}

export default App