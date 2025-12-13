import { useState } from "react";
import Refform from "./Refform";

function Referral() {
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState([]);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState(null);

const handleAddData = (data) => {

  // validation: check all required fields
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

  // If validation passes → add
  setRecords([...records, data]);
  setShowForm(false);
};


  //  Filter Records
  const filteredRecords = records.filter((r) =>
    Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // Sorting Function
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortField) return 0;
    const x = a[sortField].toString();
    const y = b[sortField].toString();
    return sortOrder === "asc" ? x.localeCompare(y) : y.localeCompare(x);
  });

  // Open Edit Modal
  const openEditModal = (index) => {
    setEditingIndex(index);
    setEditData({ ...records[index] });
  };

  // Save Updated Data
  const handleUpdate = () => {
    const updated = [...records];
    updated[editingIndex] = editData;
    setRecords(updated);
    setEditingIndex(null);
    setEditData(null);
  };

  return (
    <div className="relative">

      {/* + Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-cyan-600 text-white font-bold w-14 h-14 flex items-center justify-center
                   rounded-full text-4xl fixed bottom-6 right-6 shadow-xl hover:bg-cyan-800 transition"
      >
          ✚
      </button>

      {/* Referral Add Form */}
      {showForm && (
        <Refform onSubmit={handleAddData} onClose={() => setShowForm(false)} />
      )}

      {/*  Search Box */}
      <div className="mb-4 flex justify-end gap-5  items-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 w-64 border  rounded-lg shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sorting Dropdown */}
        <select
          className="p-2 border rounded-lg shadow-md"
          onChange={(e) => {
            setSortField(e.target.value);
          }}
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
          className="px-4 py-2 bg-cyan-700 text-white rounded-lg shadow hover:bg-cyan-900"
        >
          {sortOrder === "asc" ? "⬆ Asc" : "⬇ Desc"}
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-cyan-300  text-black">
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

      {/*  Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-gray-400 p-6 rounded-2xl shadow-2xl w-110 h-170 text-center">

            <h2 className="text-xl font-extrabold mb-10 mr-50 w-30  border-8 rounded-2xl bg-yellow-50 text-cyan-700">Edit Data</h2>

            {/* Form Fields */}
            <label className="block mb-2 font-semibold">DOB:</label>
            <input
              type="date"
              className="w-60 p-2 mb-3 border rounded-2xl bg-white"
              value={editData.dob}
              onChange={(e) => setEditData({ ...editData, dob: e.target.value })}
            />

            <label className="block mb-2 font-semibold">Mobile No:</label>
            <input
              type="text"
              disabled
              className="w-60 p-2 mb-3 border rounded-2xl bg-neutral-600 cursor-not-allowed"
              value={editData.mobile}
            />

            <label className="block mb-2 font-semibold">Name:</label>
            <input
              type="text"
              className="w-60 p-2 mb-3 border rounded-2xl bg-white"
              value={editData.firstName}
              onChange={(e) =>
                setEditData({ ...editData, firstName: e.target.value })
              }
            />

            <label className="block mb-2 font-semibold">Aadhar No:</label>
            <input
              type="text"
              className="w-60 p-2 mb-3 border rounded-2xl bg-white"
              value={editData.aadhar}
              onChange={(e) =>
                setEditData({ ...editData, aadhar: e.target.value })
              }
            />

            <label className="block mb-2 font-semibold">Ref Mobile:</label>
            <input
              type="text"
              className="w-60 p-2 mb-3 border rounded-2xl bg-white"
              value={editData.refMobile}
              onChange={(e) =>
                setEditData({ ...editData, refMobile: e.target.value })
              }
            />

            <label className="block mb-2 font-semibold">Ref Name:</label>
            <input
              type="text"
              className="w-60 p-2 mb-3 border rounded-2xl bg-white"
              value={editData.refName}
              onChange={(e) =>
                setEditData({ ...editData, refName: e.target.value })
              }
            />

            {/* Buttons */}
            <div className="flex justify-around mt-4">
              <button
                onClick={handleUpdate}
                className="bg-fuchsia-400 text-white px-4 py-2  rounded-lg hover:bg-cyan-900"
              >
                Update
              </button>

              <button
                onClick={() => {
                  setEditData(null);
                  setEditingIndex(null);
                }}
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
