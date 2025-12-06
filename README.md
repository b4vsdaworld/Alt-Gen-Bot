# Discord Bot — GitHub + Railway Ready


This repository contains a Node.js Discord bot with these commands:


- `/embed` — create an embed (restricted to 2 roles). Sends an ephemeral confirmation to the executor.
- `/create-service` — create a named service (restricted to admin roles).
- `/add` — add an account string to a service (admin roles only).
- `/gen` — generate (consume) an account from a service (locked to a specific channel). The account is sent *ephemeral* to the executor.
- `/stock` — shows stock counts for all services (locked to a specific channel).


## Quick setup (local development)


1. Clone this repo.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in values.
4. Run `npm run deploy` to register slash commands to your test guild.
5. Run `npm start` to start the bot.


## Deploy to Railway (GitHub integration)


1. Push this repository to GitHub.
2. Create a Railway
