# 🏡 **Real Estate Market Analysis ChatBot**

Django + React + Excel Analysis + Google Gemini AI

This project is a full-stack Real Estate Market Analysis ChatBot that allows users to upload an Excel file containing real-estate market data and receive:

✔ AI-generated market insights
✔ Price & demand trend charts
✔ Filtered table data by area
✔ User query–based analysis using Gemini AI
✔ Modern UI built with React + TailwindCSS

🚀 Features

✅ Excel Upload
  Users upload an Excel sheet containing:
  Area	Year	Price	Demand

✅ Area Extraction
  User query example:
  “Analyze the market trend for Pune”
  System detects "Pune" automatically.

✅ Gemini AI Summary (FREE Tier Supported)
  Gemini generates:
  Market overview
  Price trend insights
  Demand analysis
  3–4 sentence professional summary

✅ Interactive Charts
  React renders dynamic charts for:
  Price over years
  Demand trend

✅ Full Stack
  Backend: Django + Pandas + Gemini AI
  Frontend: React + Tailwind + Vite
  Communication: REST API

📂 Project Structure
```pgsql
RealEstateChatBot/
│── backend/
│   │── RealEstateChatBot/
│   │── chatbot/
│   │── media/
│   │── manage.py
│
│── frontend/
│   │── src/
│   │── public/
│   │── index.html
│
│── README.md
│── .gitignore
```

🛠️ Tech Stack

Backend:
  Django
  Pandas
  Google Gemini API
  Django REST Framework

Frontend:
  React
  Vite
  TailwindCSS
  Axios

🔧 Backend Setup (Django)
1️⃣ Create Virtual Environment
```bash
cd backend
python -m venv myenv
myenv\Scripts\activate
```

2️⃣ Install Dependencies
```nginx
pip install -r requirements.txt
```

3️⃣ Add Gemini API Key

Place in settings.py:
```python
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
```
4️⃣ Run Server
```nginx
python manage.py runserver
```

🎨 Frontend Setup (React + Vite + Tailwind)
```arduino
cd frontend
npm install
npm run dev
```
🔗 API Endpoint
POST → /api/analyze/

Request (multipart/form-data):
Field	Type	Required
query	string	Yes
file	Excel (.xlsx)	Yes

Sample Response:
```json
{
  "summary": "AI summary...",
  "chart": {
    "years": [2020,2021],
    "price": [45000,47000],
    "demand": ["High","High"]
  },
  "table": [
    {
      "Area": "Mumbai",
      "Year": 2020,
      "Price": 45000,
      "Demand": "High"
    }
  ]
}
```
🤖 AI Model Used

The project uses Google Gemini.

Recommended free models:
```bash
models/gemini-2.0-flash
models/gemini-flash-lite-latest
models/gemini-2.5-flash
```

📊 Excel File Format

Example:
```yaml
Area    Year    Price   Demand
Mumbai  2020    45000   High
Mumbai  2021    47000   High
Pune    2020    35000   Medium
```

✔️ Output You Get

AI-generated professional summary

Price trend chart (line chart)

Demand chart

Filtered dataset in table format

Clean & fast UI

👨‍💻 Developer

Avinash Vijay Satalkar
Full Stack Developer (Django + React)
GitHub: [View](https://github.com/Aviii-24)

LinkedIn: [View](https://www.linkedin.com/in/avinash-satalkar-10a934230/)

📝 License

This project is for educational & assignment use.

🎉 Final Result

A fully working AI-powered Real Estate Market Analyzer using Django + React + Gemini, with Excel data processing & modern UI. 
