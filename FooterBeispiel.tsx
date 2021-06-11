
import React from 'react';
import { useHistory } from 'react-router-dom';
import { TermineIcon } from '/imports/ui/parts/icons/TermineIcon';
import { KitaIcon } from '/imports/ui/parts/icons/KitaIcon';
import { KurseIcon } from '/imports/ui/parts/icons/KurseIcon';
import { BabysitterIcon } from '/imports/ui/parts/icons/BabysitterIcon';
import { Meteor } from 'meteor/meteor';

const iconClass = "h-6 flex-grow text-white";

const Footer = () => {

  const history = useHistory();

  function goTo(route: string) {
    return () => history.push(route);
  }

  return (
    <>
      <div className="p-3 bg-gray-700 flex flex-row content-around" >
        <TermineIcon onClick={ goTo('/termine') } className={ iconClass } />
        <KitaIcon onClick={ goTo('/kitas') } className={ iconClass } />
        <KurseIcon onClick={ goTo('/kurse') } className={ iconClass } />
        <BabysitterIcon onClick={ goTo('/babysitters') } className={ iconClass } />
      </div>
      {Meteor.isCordova && <div className="bg-gray-700 h-4"/>}
    </>
  );
};

export default Footer;