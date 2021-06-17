import React from 'react';
import {useTracker} from 'meteor/react-meteor-data'
import { editCourseId ,CourseCollection } from '/imports/api/CourseCollection';

const CourseEditor = () => {
  const course= useTracker(() => CourseCollection.findOne(editCourseId.get() ?? 'fnord') )
  return (
    <div style={{ padding: '1rem'}} >
      
        <pre>{JSON.stringify(course, null,2)}</pre>

      </div>
  )
}
}

export default CourseEditor;