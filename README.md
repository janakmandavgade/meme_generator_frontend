# Auto Meme Generator Frontend

Frontend for an automated meme generation workflow built with Next.js. This application handles user authentication, starts the meme-generation pipeline, lets the user review generated metadata, and then resumes the backend flow to complete meme creation and upload.

Live deployment: https://auto-meme-generator.janakmandavgade.dedyn.io/

## Objective

The main objective of this project is to reduce the manual effort involved in creating and publishing meme-style video content. Instead of creating every asset and upload step by hand, this frontend acts as the user-facing layer for:

- authenticating the creator with Google
- passing OAuth tokens to the backend pipeline
- triggering automated meme generation
- letting the user review and edit title, description, and keywords
- resuming the workflow so the backend can finalize the meme and upload it

## Problem This Project Solves

Content creation workflows often involve repetitive steps:

- signing in with the correct account
- generating content assets
- preparing metadata
- reviewing the final output
- uploading to a platform like YouTube

This project brings those steps into a single guided flow so the user can move from login to meme generation with less friction.

## Features

- Google OAuth login using NextAuth
- access token and refresh token retrieval through session-backed API route
- integration with an external meme-generation backend
- review screen for generated title, description, and keywords
- video preview before final submission
- resume-based workflow to continue pipeline execution after human approval
- simple success screen with regenerate and logout actions

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- NextAuth v5 beta
- Tailwind CSS 4
- Radix UI components
- Axios
- Firebase Auth support in codebase

## System Design Overview

This frontend is mainly responsible for user interaction and orchestration. It does not generate memes by itself. Instead, it acts as the bridge between the authenticated user and the backend automation pipeline.

### High-Level Components

- `Landing Page`
  Entry point that asks the user to log in.

- `Authentication Layer`
  Uses Google OAuth through NextAuth. The granted session stores access and refresh tokens required for downstream API calls.

- `Token API`
  Internal API route at `/api/tokens` exposes the authenticated session tokens to the frontend.

- `Meme Generation Trigger`
  The `Generate A Meme` action calls the backend `/start` endpoint using the stored Google tokens.

- `Human Verification Step`
  The frontend stores returned data in `sessionStorage`, previews the generated video, and allows edits to title, description, and keywords.

- `Pipeline Resume`
  After user confirmation, the frontend calls the backend `/resume` endpoint with the updated fields and resume handle.

- `Completion Screen`
  User gets confirmation and can either generate another meme or log out.

## Text Flow Diagram

```text
User
  |
  v
Landing Page
  |
  v
Login with Google
  |
  v
NextAuth Session
  |
  v
/api/tokens
  |
  v
Frontend calls Backend /start
  |
  v
Backend returns:
  - generated video bytes
  - title
  - description
  - keywords
  - resume/interruption reference
  |
  v
Frontend stores data in sessionStorage
  |
  v
Verify Meme Details Page
  - preview video
  - edit title/description/keywords
  |
  v
Frontend calls Backend /resume
  |
  v
Backend completes generation/upload workflow
  |
  v
Success Page
```

## User Flow

1. User opens the app.
2. User signs in with Google.
3. Frontend retrieves OAuth tokens from the authenticated session.
4. User clicks `Generate A Meme`.
5. Frontend sends the tokens to the backend `/start` endpoint.
6. Backend responds with generated meme content and editable metadata.
7. Frontend stores the response temporarily and opens the verification page.
8. User reviews the video and updates title, description, or keywords.
9. Frontend calls `/resume` with updated values.
10. User is redirected to the success page.

## Important Pages and Responsibilities

- `src/app/page.tsx`
  Renders the landing page.

- `src/app/Hero.tsx`
  Displays the login/register prompt UI.

- `src/app/login/page.tsx`
  Hosts the login form.

- `src/components/login-form.tsx`
  Starts Google sign-in via NextAuth.

- `src/app/auth.ts`
  Defines authentication providers and stores OAuth tokens in the session.

- `src/app/api/tokens/route.ts`
  Returns access and refresh tokens from the authenticated session.

- `src/app/welcome/page.tsx`
  Shows the protected welcome screen and the meme generation action.

- `src/components/generate_meme.tsx`
  Calls the backend `/start` endpoint and prepares data for review.

- `src/app/verify_meme_details/page.tsx`
  Shows the generated video and editable metadata form.

- `src/app/meme_generated/page.tsx`
  Displays completion UI after resume flow finishes.

## Prerequisites

- Node.js 22+
- npm
- Git

## Environment Variables

This project expects environment variables for authentication and backend integration. Based on the current code, you will likely need:

```bash
NEXT_PUBLIC_AUTH_GOOGLE_ID=
NEXT_PUBLIC_AUTH_GOOGLE_SECRET=
NEXT_PUBLIC_API_BASE_URL=
```

You should configure these before running the app locally.

## Run Locally

Clone the repository:

```bash
git clone https://github.com/janakmandavgade/meme_generator_frontend.git
cd meme_generator_frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Deployment

This frontend is currently deployed at:

https://auto-meme-generator.janakmandavgade.dedyn.io/

To create a production build locally:

```bash
npm run build
npm run start
```

## Current Limitations

- registration flow is not fully implemented even though the landing page shows a register option
- successful operation depends on the external backend being available and correctly configured
- session data for meme review is stored in browser `sessionStorage`

## What I Learned

Working on this project helped strengthen understanding of:

- how to use NextAuth to manage Google OAuth in a Next.js app
- how to pass provider tokens through JWT and session callbacks
- how a frontend can coordinate with a long-running backend pipeline
- how interruption and resume flows can be designed for human-in-the-loop systems
- how to use `sessionStorage` for short-lived client-side workflow state
- how to structure a multi-page UX around authentication, preview, review, and completion
- how frontend applications can act as orchestration layers for AI or automation pipelines

## Future Improvements

- add a proper registration flow.
- improve error handling and loading states across API calls
- persist review state more robustly than `sessionStorage`
- show backend job progress and clearer upload status
- add validation and better feedback for failed authentication or backend errors
- add tests for auth flow, token route, and review form behavior

## Summary

This project is a frontend orchestration layer for an automated meme creation workflow. It authenticates the user, connects to a backend generation pipeline, includes a human verification step, and supports final completion of the meme publishing flow through a clean multi-page experience.
