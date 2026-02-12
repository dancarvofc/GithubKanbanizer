# 🚀 GitHub Kanbanizer

A high-performance dashboard that transforms static GitHub repository lists into an interactive, professional Kanban board. **GitHub Kanbanizer** leverages the GitHub REST API to monitor real-time activity and automatically categorize projects based on their project maturity and latest updates.

---

## ✨ Key Features

* **🔍 Dynamic Discovery:** Instantly generate a Kanban view for any GitHub profile.
* **📊 Smart Status Logic:**
    * **In Progress (Doing):** Projects with active commits in the last 30 days.
    * **Backlog (To Do):** Projects without recent updates (30-90 days).
    * **Stable/Archived (Done):** Repositories with no activity for over 90 days or marked as `archived`.
* **🏷️ Metadata Badges:** Displays repository description, birth year, primary language, and star count.
* **⚡ Tech Stack:** React (Vite) + Node.js (Express) + Tailwind CSS + Framer Motion.

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
* GitHub Personal Access Token (Optional, for higher rate limits)

### 2. Clone the repository
```bash
git clone [https://github.com/dancarvofc/github-kanbanizer.git](https://github.com/dancarvofc/github-kanbanizer.git)
cd github-kanbanizer
```
### 3.  Environment Variables
Create a .env file in the backend folder:

Snippet de código
PORT=3001
GH_TOKEN=your_personal_access_token_here
GH_USERNAME=your_username

### 4. Run the Project
---------------------
Backend:
```bash
cd backend
npm install
npm start
Frontend:
```
----------------------
```bash
cd frontend
npm install
npm run dev
```
----------------------
### 📋 API Implementation Note

The project consumes the following endpoint:
GET https://api.github.com/users/{username}/repos

It maps the following JSON structure to the Kanban cards:

name: Card Title

description: Project Summary

created_at: Year Tag (extracted via getFullYear())

language: Tech Stack Badge

html_url: Link to Source

pushed_at: Maturity Logic Trigger

<div align="center">
 ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█
░▒▓█ ░▒▓█ ░▒▓█ ░▒▓█ 
<h3>Developed by <a href="https://github.com/dancarvofc">dancarvofc</a></h3>
</div>