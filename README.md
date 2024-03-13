# Memo App

### Fullstack NextJS simple project

> Deployed project URL: https://memo.vattsopheak.com

Features:

- 🌐 Next.js 14 framework
- 🗓 Create your own memos
- 💾 Database integration with drizzle orm
- 🔐 Auth with Clerk
- 📝 Customizable WYSIWYG
- ↩️ Undo & Redo functionality
- 💅 TailwindCSS & Shadcn-UI styling

### Prerequisites

**Node version 20.x**

### Cloning the repository

```shell
git clone git@github.com:vattcarter7/memo-app.git
```

### Install packages

```shell
npm install
```

### Setup .env file

```js
# Clerk authentication
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=
```

### Setup husky

```shell
npm run prepare
```

### Start the app

```shell
npm run dev
```

### Note on digitalocean

we need to authorize secret key id_rsa.pub in the .ssh folder

```shell
cat id_rsa.pub > authorized_keys
```
