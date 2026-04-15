Project: SME Website Lead Management System

Objective: To build a professional, secure, and responsive web application that serves as a CRM tool for small and medium businesses, freelancers, and digital agencies to manage website development leads. The system will help users capture, track, and manage business leads effectively.

Core Features:
1.  **Authentication:** Secure user login, signup, password reset, secure logout, session management, and robust password validation rules.
2.  **Dashboard:** A professional dashboard displaying key analytics such as total leads, contacted leads, proposals sent, won/lost deals, and conversion rate. It will also feature upcoming follow-up reminders and a recent activity log, utilizing cards and charts for data visualization.
3.  **Add New Lead Form:** A clean, validated form with fields for business name, contact person, phone number, email, social media link, lead source (Instagram, Facebook, WhatsApp, Referral, Website), business type, estimated budget, project type, lead status (New, Contacted, Proposal Sent, Negotiation, Won, Lost), follow-up date, and notes. Includes comprehensive client-side and server-side validation, input sanitization, and error handling.
4.  **Leads Table:** A searchable, filterable, and sortable table to display leads with columns for business name, contact person, phone, source, status, budget, follow-up date, and last updated. Actions will include view, edit, delete, and status updates (mark as contacted, move to proposal sent, mark won/lost). Features pagination and sorting.
5.  **Lead Detail Page:** A dedicated page for each lead showing full information, activity history, notes timeline, follow-up logs, and status change history.
6.  **Reminder System:** Implements alerts for overdue leads and leads due today or tomorrow, displayed on the dashboard.
7.  **Notes & Activity Timeline:** Allows users to add notes to leads and tracks timestamped updates, action history, and the user responsible for changes.

Technical Requirements:
*   **Code Structure:** Clean modular code with separation of concerns, reusable UI components, a dedicated service layer for data handling, and a scalable folder structure.
*   **Best Practices:** Adherence to clean, readable code, DRY principles, necessary comments, robust error handling, and validation for all form fields.
*   **Security:** Implementation of security best practices including input sanitization, server-side and client-side validation, prevention of SQL injection and XSS attacks, secure authentication flow, role-based access control, session timeout, secure logout, no exposure of sensitive data in the frontend, secure password hashing, and least-privilege database access.
*   **UI/UX:** Modern, clean, mobile-responsive, desktop-optimized design with a professional business look and a smooth navigation sidebar. Utilizes cards, tables, badges, modals, and toast notifications.
*   **Performance:** Optimization for fast page loading, efficient database queries, lazy loading where applicable, and minimal re-renders.

Database Design:
*   A normalized relational database structure will be used, including tables for users, leads, lead_notes, activities, and reminders, with proper foreign keys and indexing.

Demo Seed Data:
*   Sample leads will be generated for realistic Kenyan SME examples (e.g., Nairobi bakery website, fashion store e-commerce, local salon booking website, car hire company website).

Next Steps:
*   The `frontend_engineer` will be tasked with creating the initial UI/UX flow, ensuring `generate_images_bulk` is run before writing files.
*   The `supabase_engineer` will be responsible for database design and backend implementation.
