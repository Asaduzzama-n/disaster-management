This project is part of an assessment for a Software Engineer position. The objective is to develop a web application for disaster management, demonstrating focus, proficiency, and commitment. The application allows admin and volunteer users to manage crises, donations, volunteers, and inventory during disaster relief efforts.
Project Overview
Features

    User Roles:
        Admin: Manages and verifies volunteers, reports, crises, etc.
        Volunteer: Registers, responds to crises, and carries out tasks assigned by the admin.
    Donation Fund:
        Allows anyone to donate to disaster-affected areas. The total fund amount is visible to all users.
    Charts:
        Displays charts showing daily funds and expenses.
    Admin Functions:
        Verifies and approves volunteers, assigns tasks and crises, and manages locations.
    Crisis Management:
        Anonymous users can add crises, including location, title, image, severity, and required help.
    Inventory Management:
        Volunteers manage inventory (relief goods and purchases) for disaster relief.
    Admin Reports:
        Admins can generate and export reports in CSV format for donations, expenses, and inventory.

Project Pages

    Register Page: /signup - Volunteers can register.
    Login Page: /login - Login page for admins and volunteers.
    Homepage: /home - Display statistics about donation and expenses.
    Donation Page: /donation - Allows donations and displays donation statistics.
    Crisis Page: /crises - Lists crises, allows adding new crises by anonymous users.
    Volunteer Page: /volunteer - Lists volunteers and their information.
    Inventory Page (NOT DONE YET): /inventory - Allows the management of relief supplies.
    Profile Page (NOT DONE YET): /profile - Allows users to update personal information.
    Admin Management Pages: /admin/{{...}} - Admin pages to manage volunteers, crises, and reports.

Technologies Used
Frontend

    Next.js (14.2.12)
    Tailwind CSS (with Tailwind CSS animations)
    React Hook Form for form validation
    ShadCN UI for modals and UI components
    Axios for API requests
    Embla Carousel for carousel features
    Recharts for displaying charts
    Lucide Icons for consistent icons

Backend

Express.js

Database

    PostgreSQL

Setup Instructions
Prerequisites

    Node.js: Ensure Node.js (v14 or higher) is installed.
    Database: Set up a PostgreSQL.
    Postman: For testing APIs, you can find the Postman documentation here. https://documenter.getpostman.com/view/27802886/2sAXqtc27E#intro

Steps to Run Locally

    Clone the Repository:

git clone https://github.com/your-repo/disaster-management.git
cd disaster-management

Install Dependencies:

npm install

Configure Environment Variables:

    Create a .env file in the root directory with the following variables:

    bash

    NEXT_PUBLIC_BASEURL=http://localhost:5000/api/v1

Run Database Migrations (Using Prisma ORM):

npx prisma migrate dev

Run the Development Server:

    npm run dev

    Access the Application: Open your browser and go to http://localhost:3000.

Postman Documentation

For testing the API endpoints, use the Postman collection linked here.
Project Structure

arduino

├── components
│ ├── Admin
│ ├── Crisis
│ ├── Donation
│ ├── Inventory
│ └── Volunteer
├── pages
│ ├── profile
│ ├── admin
│ ├── crisis
│ ├── donation
│ ├── home
│ └── volunteer
├── public
├── styles
└── utils

License

This project is licensed under the MIT License.
