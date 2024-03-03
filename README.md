# NextJS Upstash QStash Cron Example

This is a simple example of how to use NextJS, Upstash, QStash and Cron to create a simple task scheduler. It includes NextJS, Drizzle, SQLite, TailwindCSS, and a simple API to interact with Upstash and QStash.

## Requirements

- NVM or NodeJS `v20.11.1` or later
- Pnpm `v8.10.0` or later
- [Upstash Account](https://console.upstash.com/login)
- QStash API Key
- [Ngrok](https://ngrok.com) proxy account

## Quick Start

### Step 1 - Install Dependencies

```bash
pnpm install;
```

### Step 2 - Configure Environment Variables

```bash
# FROM: ./

cp .env.example .env
```

Replace with your Upstash credentials and your ngrok proxy URL (step later on).

```bash
# Database configurations
DATABASE_URL="./sqlite.db"
DATABASE_PREFIX="qstash"

# API configurations - For testing replace with ngrok URL
NEXT_PUBLIC_API_URL="https://<YOUR_NGROK_PUBLIC_PROXY>.ngrok-free.app/api/qstash"

# QStash Confgurations
QSTASH_URL="https://qstash.upstash.io/v2/publish/"
QSTASH_TOKEN="<YOUR_QSTASH_TOKEN>"
QSTASH_CURRENT_SIGNING_KEY="<YOUR_QSTASH_CURRENT_SIGNING_KEY>"
QSTASH_NEXT_SIGNING_KEY="<YOUR_QSTASH_NEXT_SIGNING_KEY>"
```

### Step 3 - Configure Database

```bash
# FROM: ./

pnpm db:gen;
pnpm db:push;
```

### Step 4 - Run Server

```bash
# FROM: ./

pnpm dev;

# [Expected Output]:
# > next dev
# 
#    ▲ Next.js 14.1.1
#    - Local:        http://localhost:3000
#    - Environments: .env
```

### Step 5 - Run Ngrok Proxy

```bash
# FROM: ./path/to/your/ngrok/binary

./ngrok http 3000;

# [Expected Output]:
# Try the new Traffic Inspector dev preview: https://ngrok.com/r/ti
# 
# Session Status                online
# Account                       Manny (Plan: Free)
# Version                       3.6.0
# Region                        Europe (eu)
# Latency                       -
# Web Interface                 http://127.0.0.1:4040
# Forwarding                    https://YOUR_FORWARING_SUBDOMAIN.ngrok-free.app -> http:
# 
# Connections                   ttl     opn     rt1     rt5     p50     p90
#                               0       0       0.00    0.00    0.00    0.00
```

### Step 6 - Update Environment Variables

Update your ngrok proxy to reflect the following.

**File:** `./env`

```bash
# API configurations - For testing replace with ngrok URL
NEXT_PUBLIC_API_URL="https://YOUR_FORWARING_SUBDOMAIN.ngrok-free.app/api/qstash"
```

### Step 7 - UI Schedule Message

As an example, set a *Delay* to `10s` and a *Message* of `Hello World!` and click *Schedule*.

See the output UUID of the message stored the database.

Example Output:

```
Message scheduled.
6ba5d6f9-e930-4324-a1d3-030c07b8b5de
```

### Step 8 - UI Check Message Result

Enter the UUID from the previous step in *Message ID* and click *Check*.

Example Output:

```json
{
  "data": {
    "id": "6ba5d6f9-e930-4324-a1d3-030c07b8b5de",
    "jobId": "msg_26hZCxZCuWyyTWPmSVBrNCtiJFrDi2mqYiWVnXsqEUkPtPNrs7yaJR8YUE9AtTD",
    "message": "{\"delay\":\"10s\",\"message\":\"{\\\"message\\\":\\\"Hello World!\\\"}\"}",
    "receivedAt": "2024-03-03T20:13:51.795Z",
    "createdAt": "2024-03-03T20:13:40.781Z"
  }
}
```
