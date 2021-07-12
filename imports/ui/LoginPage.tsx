import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField } from '/imports/ui/uniforms-react';
import { Container } from 'semantic-ui-react'

SimpleSchema.extendOptions(['uniforms']);

var LoginButton = true

const loginSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'E-Mail',
  },
  password: {
    type: String,
    label: 'Passwort',
    // @ts-ignore
    uniforms: {
      type: 'password'
    }
  }
});

const signupSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'E-Mail',
    regEx: SimpleSchema.RegEx.EmailWithTLD
  },
  username: {
    type: String,
    label: 'Benutzername',
    min: 3,
    max: 80
  },
  password: {
    type: String,
    label: 'Passwort',
    // TODO: change regEx to accomodate sick desire for untripleclickselectable password
    regEx: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    max: 80,
    // @ts-ignore
    uniforms: {
      type: 'password'
    }
  },
  passwordRepeat: {
    type: String,
    label: 'Password wdh.',
    custom: function () {
      if (this.value !== this.field('password').value) {
        return 'password mismatch';
      }
    },
    // @ts-ignore
    uniforms: {
      type: 'password'
    }
  }
});

const loginSchemaBridge = new SimpleSchemaBridge(loginSchema);
const signupSchemaBridge = new SimpleSchemaBridge(signupSchema);

const CustomSubmitField = () => (
  <div style={{ textAlign: 'center' }}>
    <SubmitField value={LoginButton ? ('Login') : ('Sign Up')} />
  </div>
)

const loginForm = () => {
  LoginButton = true
  const login = ({ email, password }: { email: string, password: string; }) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        alert('Login fehlgeschlagen: ' + error);
      }
    });
  };

  return (
    <AutoForm
      schema={loginSchemaBridge}
      submitField={CustomSubmitField}
      onSubmit={login}
    />
  );
};


const signupForm = () => {
  LoginButton = false
  const signup = (model: { username: string, email: string, password: string; }) => {
    console.log({ model })
    Accounts.createUser(model, (error) => {
      if (error) {
        alert('User Account konnte nicht angelegt werden: ' + error?.message);
      }
      else {
        // @ts-ignore
        Meteor.callAsync('newuserrole', Meteor.userId())
        console.log(Meteor.userId())
      }
    });
  };

  return (
    <AutoForm
      schema={signupSchemaBridge}
      submitField={CustomSubmitField}
      onSubmit={signup}
    />
  );
};


const LoginPage = () => {
  const [hasAccount, setHasAccount] = useState(true);

  const Form = hasAccount ? loginForm : signupForm;
  const toggleString = hasAccount ? 'Ich habe noch keinen Account' : 'Ich habe bereits einen Account';

  return (
    <Container text>
      <Form />
      <div style={{ color: 'blue', textDecoration: 'underline', textAlign: 'center' }} onClick={() => setHasAccount(!hasAccount)}>{toggleString}</div>
    </Container>
  );
};

export default LoginPage;