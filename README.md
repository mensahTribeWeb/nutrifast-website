# NutriFast: AI-Powered Meal Planning and Fasting Assistant

NutriFast is a data-driven wellness application that helps users search nutrition data, request meal recommendations, track fasting activity, log progress, and review dashboard analytics. This repository contains the Angular frontend for the WGU C964 Computer Science Capstone implementation.

Live prototype: https://nutrifast.dev/home

## Product Preview

The frontend connects the user-facing wellness workflows: account access, dashboard summaries, meal recommendations, meal logging, fasting, progress tracking, analytics, and settings.

<img src="https://raw.githubusercontent.com/mensahTribeWeb/nutrifast-capstone-docs/main/figures/00_system_architecture.png" alt="NutriFast system architecture" width="100%">

| Dashboard | Meal Recommendations |
| --- | --- |
| <img src="https://raw.githubusercontent.com/mensahTribeWeb/nutrifast-capstone-docs/main/figures/frontend_screenshot/07_dashboard_summary.png" alt="NutriFast dashboard summary" width="100%"> | <img src="https://raw.githubusercontent.com/mensahTribeWeb/nutrifast-capstone-docs/main/figures/frontend_screenshot/09_meal_ai_results.png" alt="NutriFast meal recommendation results" width="100%"> |

| Progress Visualizations | Analytics Summary |
| --- | --- |
| <img src="https://raw.githubusercontent.com/mensahTribeWeb/nutrifast-capstone-docs/main/figures/frontend_screenshot/18_progress_visualizations.png" alt="NutriFast progress visualizations" width="100%"> | <img src="https://raw.githubusercontent.com/mensahTribeWeb/nutrifast-capstone-docs/main/figures/frontend_screenshot/19_analytics_summary.png" alt="NutriFast analytics summary" width="100%"> |

Suggested GitHub repository description:

```text
Angular frontend for NutriFast, an AI-powered meal planning and fasting assistant with meal recommendations, fasting tracking, progress dashboards, and wellness analytics.
```

## Capstone Context

| Field | Value |
| --- | --- |
| University | Western Governors University |
| Degree Program | Bachelor of Science in Computer Science |
| Course | C964 - Computer Science Capstone |
| Project | NutriFast: AI-Powered Meal Planning and Fasting Assistant |
| Author | Nicholas D. Mensah |
| Capstone Advisor | Dr. Charlie Paddock |
| Submission Date | May 22, 2026 |

## Frontend Features

- Firebase Authentication signup, login, logout, and protected-route workflow
- Food search and meal logging user interface
- Meal AI page for calorie and macronutrient recommendation queries
- Dashboard summary cards for user progress and feature navigation
- Fasting tracker with standard and custom fasting schedule workflows
- Progress page for daily weight, calories, and fasting-hour entries
- Saved-entry review with delete support for accidental entries
- Analytics summary generated from saved user progress and meal-log data
- Profile/settings page for wellness preferences and user configuration

## Technology Stack

| Area | Tools |
| --- | --- |
| Framework | Angular 19 |
| Language | TypeScript |
| Authentication | Firebase Authentication through AngularFire |
| Visualization | Chart.js and ng2-charts |
| Styling | SCSS and Tailwind utility support |
| Backend Integration | FastAPI REST endpoints |
| Prototype Persistence | User-scoped browser storage for profile, meals, progress, and settings |

## Main Routes

| Route | Purpose |
| --- | --- |
| `/home` | Public landing page |
| `/signup` | Account creation with validation |
| `/login` | User login |
| `/dashboard` | Authenticated dashboard |
| `/meal-ai` | Meal recommendation query and results |
| `/meal-log-form` | Food search and meal logging |
| `/fasting-tracker` | Fasting timer and custom schedule |
| `/progress` | Daily progress entries and visualizations |
| `/analytics-summary` | Analytics generated from saved entries |
| `/settings` | Profile and wellness settings |

## Local Development

Install dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
npm start
```

Open the application:

```text
http://127.0.0.1:4200
```

The local frontend expects the backend API to be available at:

```text
http://127.0.0.1:8000
```

Run a production build:

```bash
npm run build
```

## Backend Dependency

Meal search and recommendation workflows call the NutriFast FastAPI backend. The deployed frontend points to the hosted backend, while local development uses the local FastAPI server. Start the backend before testing local food search or recommendation workflows.

## Capstone Evidence

This frontend demonstrates the user-facing portion of the data product required by the WGU C964 rubric:

- Interactive queries through meal search and meal AI recommendation pages
- User-friendly dashboard with multiple visualization types
- Authentication and route protection
- Progress entry and analytics workflows
- Screenshots and source code evidence for final report documentation

## Related Repositories

- Frontend: https://github.com/mensahTribeWeb/nutrifast-website
- Backend: https://github.com/mensahTribeWeb/nutrifast-backend
- Documentation: https://github.com/mensahTribeWeb/nutrifast-capstone-docs

## Responsible Use

NutriFast is a wellness decision-support prototype. It is not medical advice, diagnosis, or treatment guidance. Users should consult qualified healthcare professionals for medical conditions, dietary restrictions, or treatment decisions.
