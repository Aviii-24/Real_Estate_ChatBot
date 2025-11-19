import { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function App() {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [chart, setChart] = useState(null);
  const [table, setTable] = useState([]);

  const submit = async () => {
    const form = new FormData();
    form.append("query", query);
    form.append("file", file);

    const res = await axios.post("http://127.0.0.1:8000/api/analyze/", form);
    setSummary(res.data.summary);
    setChart(res.data.chart);
    setTable(res.data.table);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold text-center">Real Estate Analysis Chatbot</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
        <input
          className="w-full border p-3 rounded"
          placeholder="Ask something... e.g., Analyze Wakad"
          onChange={(e) => setQuery(e.target.value)}
        />

        <input
          type="file"
          className="w-full"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={submit}
        >
          Submit
        </button>
      </div>

      {summary && (
        <div className="bg-gray-100 p-4 rounded-xl shadow">
          <h2 className="font-bold mb-2">Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {chart && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Price & Demand Trend</h2>

          <LineChart
            width={300}
            height={250}
            data={chart.years.map((y, i) => ({
              year: y,
              price: chart.price[i],
              demand: chart.demand[i],
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="blue" strokeWidth={2} />
            <Line type="monotone" dataKey="demand" stroke="green" strokeWidth={2} />
          </LineChart>
        </div>
      )}

      {table.length > 0 && (
        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(table[0]).map((h) => (
                <th key={h} className="p-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, idx) => (
              <tr key={idx} className="border-t">
                {Object.values(row).map((v, i) => (
                  <td key={i} className="p-2">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default App;
