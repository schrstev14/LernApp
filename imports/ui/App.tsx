import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from '/imports/ui/HomePage'
import LoginPage from '/imports/ui/LoginPage'
import CoursesPage from './CoursesPage'
import CurrentCoursePage from '/imports/ui/CurrentCourse/CurrentCoursePage'
import Footer from '/imports/ui/Parts/Footer'
import MarkdownEditorPage from '/imports/ui/MarkdownEditor/MarkdownEditorPage'
import Header from '/imports/ui/Parts/Header'
import EditPage from '/imports/ui/EditPage'

import { Roles } from '@alanning/roles'
import { MongoClient } from 'mongodb'

export const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ flexGrow: 1, backgroundColor: '#A0FEEF', overflowY: 'auto', paddingTop: '1rem'}}>
        <Switch>
          <Route path="/markdown-editor">
            <MarkdownEditorPage />
          </Route>
          <Route path="/courses">
            <CoursesPage editMode={false}/>
          </Route>
          <Route path="/current-course/:id">
            <CurrentCoursePage/>
          </Route>
          <Route path="/edit-page">
            <EditPage />
          </Route>
          <Route path="/login">
            <LoginPage />
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
