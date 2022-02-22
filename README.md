# CourseKit React Template

A minimal template for a CourseKit frontend site. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It's recommended you use this with Netlify so that the serverless enrollment function works out of the box.

## Installation

1. Fork this repo
2. Clone locally
3. Install modules

```
$ cd react-template
$ npm i
```

## Configuration

To link the site to your CourseKit account, create a .env file by copying the example:

```
$ cp .env.example .env
```

Now add all of the variables from the CourseKit Dashboard.

```
REACT_APP_SCHOOL_ID=<your school ID>
COURSE_1_ID=<your first course ID>
COURSE_2_ID=<your second course ID>
COURSE_1_ENROLLMENT_URL=<your first course enrollment URL>
COURSE_2_ENROLLMENT_URL=<your second course enrollment URL>
```

> Note: if you want to add more courses, continue the env variable naming convention above. Plus, add to the `courses` array in `functions/enroll.js`.

## Dev server

Use the Netlify dev server so that functions work locally and you can enroll students.

```
$ netlify dev
```

By default this runs on port 8888.

In the CourseKit dashboard, ensure that the School URL and Course URLs match the dev server URL so that log in and log out redirects work correctly.

```
School URL
http://localhost:8888

Course URLs
http://localhost:8888/courses/<your course id>
```
