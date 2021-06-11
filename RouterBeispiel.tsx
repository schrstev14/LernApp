import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from '/imports/ui/parts/Header';
import Footer from '/imports/ui/parts/Footer';

import { useTracker } from 'meteor/react-meteor-data';
import LoginPage from '/imports/ui/pages/LoginPage';
import UserSettingsPage from '/imports/ui/pages/UserSettingsPage';
import HomePage from '/imports/ui/pages/HomePage';
import TerminePage from '/imports/ui/pages/TerminePage';
import KursePage from '/imports/ui/pages/KursePage';
import KitasPage from '/imports/ui/pages/KitasPage';
import BabysittersPage from '/imports/ui/pages/BabysittersPage';

const MobileApp = () => {
  const user = useTracker(() => Meteor.user());

  if (user === null) {
    return <LoginPage />
  } 
  
  return (
    <div className="h-screen flex flex-col bg-blue-100">
      
      <Router>
        <Header/>
        <div className="flex-grow overflow-y-auto">
        <Switch>
          <Route path="/termine">
            <TerminePage/>
          </Route>
          <Route path="/kurse">
            <KursePage/>
          </Route>
          <Route path="/kitas">
            <KitasPage/>
          </Route>
          <Route path="/babysitters">
            <BabysittersPage/>
          </Route>
          <Route path="/user-settings">
            <UserSettingsPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
        </div>
        <Footer/>
      </Router>
    </div>
  )
  
};

export default MobileApp;