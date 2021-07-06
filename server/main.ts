import { Meteor } from 'meteor/meteor';
import '/imports/api/api'
import SimpleSchema from 'simpl-schema'
import { RadioField } from '/imports/ui/uniforms-react';
import { Accounts } from 'meteor/accounts-base';
import { useTracker } from 'meteor/react-meteor-data'

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  //
});

if (Meteor.roleAssignment.find({ 'user._id': this.userId }).count() === 0) {
  Roles.createRole('User', { unlessExists: true });
  Roles.createRole('Redakteur', { unlessExists: true });
  Roles.createRole('EDIT', { unlessExists: true });

  Roles.createRole('Admin', { unlessExists: true });

  Roles.addRolesToParent('EDIT', 'Admin', { unlessExists: true });
  Roles.addRolesToParent('EDIT', 'Redakteur', { unlessExists: true });
  Roles.addUsersToRoles('KuP9fgkgd3n4FN3Yi', 'Admin', { unlessExists: true });
};

Meteor.publish(null, function () {
  if (Roles.userIsInRole(this.userId, ['Admin'])) {
    return Meteor.roleAssignment.find({}); //Meteor.roleAssignment contains the information which role has been assigned to which user.
  } else {
    this.ready()
  }
})

Meteor.publish(null, function () {
  if (Roles.userIsInRole(this.userId, ['Admin'])) {
    return Meteor.roles.find({}); //Meteor.roles contains a global list of defined role names.
  } else {
    this.ready()
  }
})

Meteor.publish(null, function () {
  if (Roles.userIsInRole(this.userId, ['Admin'])) {
    return Meteor.users.find({});
  } else {
    this.ready()
  }
})

Meteor.methods({
  'rolechange'(user, role) {
    new SimpleSchema({
      user: { type: String },
      role: { type: String },
    }).validate({ user, role });
    if (Roles.userIsInRole(this.userId, ['Admin'])) {
      Roles.setUserRoles(user, [role])
    } else {
      throw new Meteor.Error('No Permission', 'You have no Permission to do that');
    }
  }
});

Meteor.methods({
  'newuserrole'(user) {
    new SimpleSchema({
      user: { type: String }
    }).validate({ user });
    Roles.addUsersToRoles(user, ['User'])
    Roles.setUserRoles(user, ['User'])
  }
});
