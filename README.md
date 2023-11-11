# next-app-router-template

Nextjs 14 app router template with Auth &amp; Drizzle

## Stack

- NextJS 14 app router
- Backend mutations will be handled by server actions
- Shadcn & tailwindcss (UI Framework)
- Next-auth & AWS Cognito (Auth)
- Drizzle ORM (for the sql orm setup) (planetscale but can be changed)

## ENV VARS

### GENERAL ENVS

NEXTAUTH_URL={YOUR APP URL}
NEXTAUTH_SECRET={YOUR NEXT-Auth secret}

### PLANETSCALE ENVS

DATABASE_URL={DATABASE_CONNECTION STRING}
DATABASE_HOST={YOU KNOW WHAT THIS IS}
DATABASE_USERNAME={YOU KNOW WHAT THIS IS}
DATABASE_PASSWORD={YOU KNOW WHAT THIS IS}

### AWS ENV

AWS_REGION={YOU KNOW WHAT THIS IS}
AWS_CONFIG_ACCESS_KEY_ID={YOU KNOW WHAT THIS IS}
AWS_CONFIG_SECRET_KEY={YOUR AWS SECRET KEY}
COGNITO_USER_POOL_ID={Your AWS cognito user pool id}
COGNITO_APP_CLIENT_ID={Your AWS cognito user pool's app client's client id}
COGNITO_APP_CLIENT_SECRET={Your AWS cognito user pool's app client's secret}
