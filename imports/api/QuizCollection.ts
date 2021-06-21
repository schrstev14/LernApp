import { Mongo } from 'meteor/mongo';
import {Meteor} from 'Meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const QuizCollection = new Mongo.Collection('quiz');
