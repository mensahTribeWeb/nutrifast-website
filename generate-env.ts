/*
============================================================================
Western Governors University
Bachelor of Science in Computer Science

C964 - Computer Science Capstone

Project Title:
NutriFast: AI-Powered Meal Planning & Fasting Assistant

Project Description:
A Data-Driven Approach to Personalized Nutrition and Fasting Optimization

Author:
Nicholas D. Mensah

Student ID:
010195113

Capstone Advisor:
Dr. Charlie Paddock

Submission Date:
May 22, 2026

File Name:
generate-env.ts

Purpose:
This file is part of the NutriFast platform, an AI-powered nutrition,
meal-planning, and fasting management application designed to provide
personalized dietary recommendations, fasting guidance, and health-focused
decision support through data-driven analysis and modern software
engineering practices.

Degree Program:
Bachelor of Science in Computer Science

Course:
C964 - Computer Science Capstone

Copyright (c) 2026 Nicholas D. Mensah
============================================================================
*/

const fileSystem = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Define the environment configuration content
const environmentConfigContent = `
export const environment = {
  production: true,
  firebase: {
    apiKey: '${process.env['NG_APP_FIREBASE_API_KEY']}',
    authDomain: '${process.env['NG_APP_FIREBASE_AUTH_DOMAIN']}',
    projectId: '${process.env['NG_APP_FIREBASE_PROJECT_ID']}',
    storageBucket: '${process.env['NG_APP_FIREBASE_STORAGE_BUCKET']}',
    messagingSenderId: '${process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID']}',
    appId: '${process.env['NG_APP_FIREBASE_APP_ID']}',
    measurementId: '${process.env['NG_APP_FIREBASE_MEASUREMENT_ID']}',
  },
};
`;

// Write the environment configuration to environment.prod.ts
fileSystem.writeFileSync(
  './src/environments/environment.prod.ts',
  environmentConfigContent
);
console.log('Environment file generated successfully.');
