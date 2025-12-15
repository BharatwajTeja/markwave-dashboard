import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function Refform({ onSubmit, onClose }) {
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [refMobile, setRefMobile] = useState("");
  const [refName, setRefName] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};

    if (!dob) temp.dob = "Date of birth is required";
    if (!/^[0-9]{10}$/.test(mobile))
      temp.mobile = "Enter a valid 10-digit mobile number";
    if (!/^[A-Za-z]{2,}$/.test(firstName))
      temp.firstName = "Enter a valid first name";
    if (!/^[0-9]{12}$/.test(aadhar))
      temp.aadhar = "Enter a valid 12-digit Aadhar number";
    if (!/^[0-9]{10}$/.test(refMobile))
      temp.refMobile = "Enter a valid 10-digit referral mobile";
    if (!/^[A-Za-z ]{2,}$/.test(refName))
      temp.refName = "Enter a valid referral name";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ dob, mobile, firstName, aadhar, refMobile, refName });
      alert("Referral Form Submitted Successfully!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-slate-100 shadow-2xl p-6 rounded-3xl
                   w-full max-w-sm max-h-[90vh] overflow-y-auto relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-blue-400 text-3xl font-extrabold absolute top-4 right-4"
        >
          <RxCross2 />
        </button>

        <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
          Referral Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* DOB */}
          <label className="flex flex-col">
            <span className="font-semibold">Date of Birth</span>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border p-2 rounded-2xl w-full"
            />
            {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}
          </label>

          {/* Mobile */}
          <label className="flex flex-col">
            <span className="font-semibold">Mobile No</span>
            <input
              type="tel"
              placeholder="Enter valid mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border p-2 rounded-2xl w-full"
            />
            {errors.mobile && (
              <p className="text-red-600 text-sm">{errors.mobile}</p>
            )}
          </label>

          {/* First Name */}
          <label className="flex flex-col">
            <span className="font-semibold">First Name</span>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border p-2 rounded-2xl w-full"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName}</p>
            )}
          </label>

          {/* Aadhar */}
          <label className="flex flex-col">
            <span className="font-semibold">Aadhar No</span>
            <input
              type="text"
              placeholder="Enter 12-digit Aadhar"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              className="border p-2 rounded-2xl w-full"
            />
            {errors.aadhar && (
              <p className="text-red-600 text-sm">{errors.aadhar}</p>
            )}
          </label>

          {/* Referral Mobile */}
          <label className="flex flex-col">
            <span className="font-semibold">Referred Mobile</span>
            <input
              type="tel"
              placeholder="Enter referral mobile"
              value={refMobile}
              onChange={(e) => setRefMobile(e.target.value)}
              className="border p-2 rounded-2xl w-full"
            />
            {errors.refMobile && (
              <p className="text-red-600 text-sm">{errors.refMobile}</p>
            )}
          </label>

          {/* Referral Name */}
          <label className="flex flex-col">
            <span className="font-semibold">Referred Name</span>
            <input
              type="text"
              placeholder="Enter referral name"
              value={refName}
              onChange={(e) => setRefName(e.target.value)}
              className="border p-2 rounded-2xl w-full"
            />
            {errors.refName && (
              <p className="text-red-600 text-sm">{errors.refName}</p>
            )}
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 font-semibold text-white py-2 rounded-3xl hover:bg-purple-800"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

export default Refform;
