import { useState,useEffect } from "react";
import Refform from "./Refform";

function Referral() {
  const [showForm, setShowForm] = useState(false);
    const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("referralRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState(null);

    useEffect(() => {
    localStorage.setItem("referralRecords", JSON.stringify(records));
  }, [records]);

  const handleAddData = (data) => {
    if (
      !data.dob ||
      !data.mobile ||
      !data.firstName ||
      !data.aadhar ||
      !data.refMobile ||
      !data.refName
    ) {
      alert("Please fill all fields before submitting!");
      return;
    }

    setRecords([...records, data]);
    setShowForm(false);
  };

  const filteredRecords = records.filter((r) =>
    Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortField) return 0;
    const x = a[sortField].toString();
    const y = b[sortField].toString();
    return sortOrder === "asc" ? x.localeCompare(y) : y.localeCompare(x);
  });

  const openEditModal = (index) => {
    setEditingIndex(index);
    setEditData({ ...records[index] });
  };

  const handleUpdate = () => {
    const updated = [...records];
    updated[editingIndex] = editData;
    setRecords(updated);
    setEditingIndex(null);
    setEditData(null);
  };

  return (
    <div className="relative min-h-screen p-4">

      {/* Floating Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-cyan-600 text-white font-bold w-14 h-14 flex items-center justify-center
                   rounded-full text-4xl fixed bottom-6 right-6 shadow-xl hover:bg-cyan-800 transition"
      >
        ✚
      </button>

      {showForm && (
        <Refform onSubmit={handleAddData} onClose={() => setShowForm(false)} />
      )}

      {/* Search + Sort */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 w-full sm:w-64 border rounded-lg shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 w-full sm:w-auto border rounded-lg shadow-md"
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="dob">DOB</option>
          <option value="mobile">Mobile</option>
          <option value="firstName">Name</option>
          <option value="aadhar">Aadhar</option>
          <option value="refMobile">Ref Mobile</option>
          <option value="refName">Ref Name</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-cyan-700 text-white rounded-lg shadow hover:bg-cyan-900 w-full sm:w-auto"
        >
          {sortOrder === "asc" ? "⬆ Asc" : "⬇ Desc"}
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[800px] w-full border shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-cyan-300 text-black">
              <th className="p-2 border">DOB</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Aadhar</th>
              <th className="p-2 border">Ref Mobile</th>
              <th className="p-2 border">Ref Name</th>
            </tr>
          </thead>

          <tbody>
            {sortedRecords.map((r, index) => (
              <tr
                key={index}
                onDoubleClick={() => openEditModal(index)}
                className="text-center hover:bg-gray-100 cursor-pointer"
              >
                <td className="border p-2">{r.dob}</td>
                <td className="border p-2">{r.mobile}</td>
                <td className="border p-2">{r.firstName}</td>
                <td className="border p-2">{r.aadhar}</td>
                <td className="border p-2">{r.refMobile}</td>
                <td className="border p-2">{r.refName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-gray-300 p-6 rounded-2xl shadow-2xl w-full max-w-md text-center">

            <h2 className="text-2xl font-extrabold mb-6 rounded-xl bg-yellow-50 text-cyan-700 py-2">
              Edit Data
            </h2>

            {[
              ["DOB", "date", "dob"],
              ["Mobile No", "text", "mobile", true],
              ["Name", "text", "firstName"],
              ["Aadhar No", "text", "aadhar"],
              ["Ref Mobile", "text", "refMobile"],
              ["Ref Name", "text", "refName"],
            ].map(([label, type, key, disabled]) => (
              <div key={key} className="mb-3 text-left">
                <label className="block mb-1 font-semibold">{label}</label>
                <input
                  type={type}
                  disabled={disabled}
                  className={`w-full p-2 border rounded-xl ${
                    disabled ? "bg-gray-500 cursor-not-allowed" : "bg-white"
                  }`}
                  value={editData[key]}
                  onChange={(e) =>
                    setEditData({ ...editData, [key]: e.target.value })
                  }
                />
              </div>
            ))}

            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={handleUpdate}
                className="bg-fuchsia-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-900"
              >
                Update
              </button>

              <button
                onClick={() => {
                  setEditData(null);
                  setEditingIndex(null);
                }}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Referral;
