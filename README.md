# Student Data Entry & Display UI

A React + TailwindCSS single-page app to manage student records with inline calculations, validations, and filters.

##  Live Demo  
Check out the deployed version hosted on Vercel:  
https://student-management-system-git-main-adarshbhagatjiis-projects.vercel.app

## ✨ Features

* **Add/Edit/Delete Students** with fields:

  * Name
  * Age
  * Marks in 5 subjects
* **Automatic Calculations**:

  * Percentage (based on 500 total marks)
  * Division (First, Second, Third, Fail)
* **Validations** for all fields (name format, age range, marks range)
* **Search by Name**
* **Filter by Division** (All, First, Second, Third, Fail)
* **Responsive Table** display with action buttons
* State managed with React `useState` only — no backend or state libraries

## 🛠 Tech Stack

* **Frontend:** React.js
* **Styling:** TailwindCSS

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-data-ui.git
cd student-data-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm start
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📂 File Structure

```
student-data-app/
├── src/
│   ├─ App.jsx
│   ├── main.jsx
│   └── components/
│       ├── SearchAndFilter.jsx
│       ├── StudentForm.jsx
│       └── StudentTable.jsx
│  
├── public/
│   └── index.html          
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## ⚙️ Usage

1. Fill in **Name**, **Age**, and marks for all **5 subjects**.
2. Click **Add Student** to create a record.
3. Use **Edit** to load a record back into the form for updates.
4. Use **Delete** to remove a record.
5. Search for students by name or filter by division.
6. All calculations are handled automatically.

## 🧮 Division Rules

* **Fail** if any subject marks < 33
* **First**: Percentage ≥ 60
* **Second**: Percentage ≥ 45 and < 60
* **Third**: Percentage ≥ 33 and < 45
* **Fail**: Percentage < 33



## 📜 License

This project is licensed under the MIT License.

---

💡 *Built with React + TailwindCSS, managing state purely on the client side.*

