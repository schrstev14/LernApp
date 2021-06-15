import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const QuizCollection = new Mongo.Collection('quiz');
