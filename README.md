# 🚀 GitHub Flow Kanban

A dynamic dashboard that transforms your static GitHub repository list into an interactive Kanban board. This project leverages the **GitHub REST API** to monitor real-time activity and automatically categorize projects based on their latest updates.

---

## ✨ Key Features

* **Automatic Sync:** Fetches all public repositories using the GitHub API.
* **Smart Status Logic:**
    * **In Progress (Doing):** Projects with commits in the last 30 days.
    * **Backlog (To Do):** Active projects without recent updates (30-90 days).
    * **Stable/Archived (Done):** Repositories with no activity for over 90 days or marked as `archived`.
* **Metadata Badges:** Displays repository description, creation year, primary language, and direct links.
* **Tech Stack:** React (Vite) + Node.js (Express) + Tailwind CSS.

---

## 🧠 How the Status is Calculated

Since GitHub doesn't have a native "Status" field for repositories, this project uses a time-delta logic based on the `pushed_at` field from the API:

$$Status = Current Date - Last Push Date$$

1.  **Doing:** $\Delta t < 30$ days.
2.  **To Do:** $30 \le \Delta t \le 90$ days.
3.  **Done:** $\Delta t > 90$ days OR `archived: true`.

---

## 🛠️ Setup & Installation

### 1. Prerequisites
* Node.js (v18 or higher)
* A GitHub Personal Access Token (PAT)

### 2. Clone the repository
```bash
git clone [https://github.com/dancarvofc/github-kanban.git](https://github.com/dancarvofc/github-kanban.git)
cd github-kanban
```
3. Environment Variables
Create a .env file in the backend folder:

Snippet de código
PORT=3001
GH_TOKEN=your_personal_access_token_here
GH_USERNAME=dancarvofc
4. Run the Project
Backend:

```bash
cd backend
npm install
npm start
Frontend:
```
```bash
cd frontend
npm install
npm run dev
📋 API Implementation Note
The project consumes the following endpoint:
GET https://api.github.com/users/{username}/repos
```
-------------------------------------------------------------------------------
It maps the following JSON structure to the Kanban cards:

name: Title

description: Card content

created_at: Year tag

language: Tech stack badge

html_url: Link to source

-------------------------------------------------------------------------------

 ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█
░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ 

<h3>Developed by dancarvofc</h3>
