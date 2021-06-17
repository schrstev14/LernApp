import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'
import { ReactiveVar } from 'meteor/reactive-var'

export interface Topic {
    courseId: string,
    title: string,
    description: string,
    content: string, 
    _id?:string
}

export const editTopicId = new ReactiveVar<string | null>(null)

export const TopicCollection = new Mongo.Collection<Topic>('topic');

const TopicCollectionSchema = new SimpleSchema({
    courseId: String,
    title: String,
    description: String,
    content: String
    // quizId: String
})

// @ts-ignore
TopicCollection.attachSchema(TopicCollectionSchema)

if (Meteor.isServer) {
    if (TopicCollection.find().count() == 0) {
        for (let i = 0; i < 20; i++) {
            TopicCollection.insert({
                courseId: 'QWrJBojYE4TD947MW',
                title: `Test${i}`,
                description: `description${i}`,
                content: `test${i}`
            })
        }
    }
}