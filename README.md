## ⭐ Introduction
 T-Fashionista is a full-stack e-commerce web application tailored for T-shirt enthusiasts. Leveraging a robust tech stack, this project showcases modern web development at its finest.

## 🔧 Tech-Stack 
<img src='https://skillicons.dev/icons?i=nextjs,typescript,tailwind,prisma,postgresql,vercel'/>

- [Next.js](https://nextjs.org/) – React framework
- [TypeScript](https://www.typescriptlang.org/) – Language
- [NextAuth.js](https://next-auth.js.org/) – Authentication library
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) – Database
- [Tailwind](https://tailwindcss.com/) – CSS framework
- [Turborepo](https://turbo.build/repo) – Monorepo
- [Vercel](https://vercel.com/) – Deployments

## ▶️ Getting Started

To get a local copy up and running, please follow these simple steps.

### 🟡 Prerequisites

Here is what you need to be able to run T-Fashionista.

- Node.js (Version: >=18.x)
- PostgreSQL
- Yarn _(recommended)_

## 💻 Development

### 🟢 Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/KshitijTodkar48/T-Fashionista/fork).

   ```sh
   git clone https://github.com/KshitijTodkar48/T-Fashionista.git
   ```

   
2. Go to the project folder

   ```sh
   cd T-Fashionista
   ```


3. Install packages with yarn

   ```sh
   yarn install
   ```

   
4. Set up your `.env` variables.

   Create a new file named `.env`, one in `T-Fashionista/apps/admin` directory and another in `T-Fashionista/apps/web` directory.

   In both the `.env` files, add a variable named `NEXTAUTH_SECRET`.

   - Use `openssl rand -base64 32` to generate a random string and set it as the value of `NEXTAUTH_SECRET`.
   
   Create another `.env` file in `T-Fashionista/packages/database` directory and add a variable named `DATABASE_URL` in it.
   
   - You will need you own postgresql cloud database. Put its link (eg.- `postgresql://<user>:<pass>@<db-host>:<db-port>`) under `DATABASE_URL` in the `.env` file.


6. Setup Node
   If your Node version does not meet the project's requirements as instructed, "nvm" (Node Version Manager) allows using Node at the version required by the project.
   
   You first might need to install the specific version and then use it:

   ```sh
   nvm install && nvm use
   ```

   You can install nvm from [here](https://github.com/nvm-sh/nvm).


7. Set up the database using the Prisma schema.

    ```sh
     cd packages/database
    ```
   And run the following commands:
    
    ```sh
     yarn run db:generate
    ```
    
    ```sh
     yarn run db:push
    ```


 8. Start both the admin and web applications.

    Go back to root directory (from `T-Fashionista/packages/database` to `T-Fashionista`) by running:

    ```sh
     cd ../..
    ```

    And run the following command:

    ```sh
     yarn dev
    ```


 9. Open the applications running locally:

    Web app on: http://localhost:3000
    
    Admin app on: http://localhost:3001


