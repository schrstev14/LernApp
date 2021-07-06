import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from '/imports/ui/HomePage'
import LoginPage from '/imports/ui/LoginPage'
import CoursesPage from './CoursesPage'
import CurrentCoursePage from '/imports/ui/CurrentCourse/CurrentCoursePage'
import Footer from '/imports/ui/Parts/Footer'
import Header from '/imports/ui/Parts/Header'
import EditPage from '/imports/ui/content-editor/EditPage'
import UserManagement from '/imports/ui/UserManagement'

export const App = () => {
  
  return (
    <Router>
      <Header />
      <div style={{ flexGrow: 1, backgroundColor: '#A0FFEF', overflowY: 'auto', paddingTop: '1rem', paddingBottom: '1rem' }}>
        <Switch>
          <Route path="/courses">
            <CoursesPage />
          </Route>
          <Route path="/current-course/:id">
            <CurrentCoursePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/edit-page">
            <EditPage />
          </Route>
          <Route path="/user-management">
            <UserManagement />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  )
};
