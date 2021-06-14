import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const CourseCollection = new Mongo.Collection('course');
export const QuizCollection = new Mongo.Collection('quiz');

const CourseCollectionSchema = new SimpleSchema({
    course: {type: String},
    topic: {type: String},
    title: {type: String},
    description: {type: String},
    active: {type: Boolean}
    });

