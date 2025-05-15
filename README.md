
## Games for Healthy People and Healthy Planet [Food Hero Calculator]

## Project Timeline/ Status: 
This project is in its second year as a capstone, building on work from the previous team. This year’s contributions included implementing usability improvements, developing a comparison feature, creating an interactive game, and adding explanatory content for environmental footprints. This year we also conducted prtotype testing with the target audience. 

## Team Members and Roles: 
- **Aaron Underhill** - Front end, communications 
- **Abdulrahman Samargandi** - Front end, responsible for dealing with project deadlines
- **Anastasiia Ragozina** - Front end, facilitator
- **Charissa Mia Wai Jun Kau** - Front end, notetaker
- **Taryn Eng** - Front end, notetaker
- **Yaire Aguilar Carrion** - Front end, facilitator

## Problem Statement: 
Most existing websites  focus only on the nutritional value of food, overlooking its environmental impact. The Food Hero Calculator fills this gap by combining nutrition facts with carbon and water footprint data to generate a single, easy-to-understand summary. 

## Target Audience:
- **Children (3rd–8th grade):** Need an intuitive, game-like experience to learn about food choices and their environmental impact.
- **Parents:** Look for accessible, educational tools that teach children sustainability and health in a fun way.
- **Educators:** Require a platform that is easy to integrate into classroom lessons and that clearly communicates environmental and nutritional concepts.
- **Youth-focused organizations and institutions:** Seek reliable teaching tools for promoting sustainable food practices.

This project offers children an engaging, kid-friendly educational tool that teaches essential facts about sustainability and health, fostering lifelong skills. By promoting environmental awareness early on, the project aims to develop climate-conscious, health-focused individuals through interactive learning.
(put the old vercel link here then update it with our version once its published)

The **Food Hero Calculator** educates children on the environmental impacts of their food choices—specifically carbon and water footprints—encouraging better decisions for the planet. Through a fun, interactive app, young users gain insights into how different foods impact the environment, helping them build a foundation for eco-friendly habits. Ultimately, this project seeks to address gaps in environmental education and inspire a new generation of informed, environmentally conscious food citizens.

For institutions and educators, the platform must be interactive and effective in teaching food sustainability. For children, it must be playful, intuitive, and educational.

## Architecture
For the architecture of our program it can be divided into 3 different parts which I will go over briefly and more into details in the demo.  First, the program is currently supported on Safari and Chrome browsers for end users. For the front-end, the program is built with React, CSS and Javascript. And finally we have the website deployed via Vercel. Where it automatically builds and hosts the application from the connected repository, ensuring seamless updates with every push. 


Development challenges and solutions
## Features/ Pages

### 1. Kid-Friendly Calculator Page
![Game Demo](assets/game-demo.gif)

- A more kid-friendly calculator page where children can explore different foods and learn about them
- Select 4 foods to compare data about
- Flip the cards for a summary about them

---

### 2. Results Page
![Game Demo](assets/game-demo.gif)

Your description here:
- An improved results page over selected foods they chose to check out
- Tells nutrition value
- Tells carbon/water overall footprint
- Adjust serving size

---

### 3. Food Ranking Game
![Game Demo](assets/game-demo.gif)

Your description here:
- A food ranking game that lets kids rank 4 random food items from our database from smallest to largest footprint
- Users can choose carbon or water mode
- Can reshuffle foods
- Change mode at any time



Access and Usage:
Clear instructions for accessing/downloading/running the project
Link to repository (if public)
Documentation or user guide
Installation requirements
Development challenges and solutions

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- git remote add [Your name to represent Gerald's Forked Repo on your local machine] [The url for Gerald's Forked Repo]
- git fetch [same forked name represented above (not the url)]
- git checkout -b [Your name for Gerald's branch] [Geralds GitHub username/the name of Gerald's branch that you want to fetch]

Example: If Sally were cloning Gerald's fork

- git remote add sally-fork https://github.com/ghendrix-git/healthy-games-for-healthy-people-and-healthy-planet.git
- git fetch sally-fork
- git checkout -b sally-branch sally-fork/initial-commit

Then, run npm install

With the code on you local machine navagate to the branches root directory.

# Database Information

You will need to create an .env.local folder for accessing Supabase data in the main directory. In this folder you will add the Supabase Database URL and ANON KEY. The URL and KEY are protected and will require admin authorization from the Project Administrator. 

Run the development server:

```bash

npm run dev

```

Open [http://localhost:3000/home](http://localhost:3000/home) with your browser to see the result.

You can start editing the page by modifying `food_app/pages/home.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

The LICENSE is currently CC0 and will need to be changed after initial development, and legal advice.

## Dependencies

Font Awesome:
Version: 6.5.1
Description: Provides a collection of icons and fonts for web applications.
Official Website: [Font Awesome Website](https://fontawesome.com/)

React:
Version: 18
Description: A JavaScript library for building user interfaces.
Official Website: [React v18.0 Website](https://react.dev/blog/2022/03/29/react-v18)

Supabase:
Version: 1.142.1
Description: A client library for interacting with Supabase, an open-source alternative to Firebase.
Official Website: [Supabase Website](https://supabase.com/)

Next.js:
Version: 14.0.3
Description: A framework for server-rendered React applications.
Official Website: [Next.js Website](https://nextjs.org/)
