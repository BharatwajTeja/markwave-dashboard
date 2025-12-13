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

    // DOB VALIDATION
    if (!dob) {
      temp.dob = "Date of birth is required";
    }

    // MOBILE VALIDATION (10 DIGITS)
    if (!/^[0-9]{10}$/.test(mobile)) {
      temp.mobile = "Enter a valid 10-digit mobile number";
    }

    // FIRST NAME VALIDATION
    if (!/^[A-Za-z]{2,}$/.test(firstName)) {
      temp.firstName = "Enter a valid first name (letters only)";
    }

    // AADHAR VALIDATION (12 DIGITS)
    if (!/^[0-9]{12}$/.test(aadhar)) {
      temp.aadhar = "Enter a valid 12-digit Aadhar number";
    }

    // REFERRAL MOBILE
    if (!/^[0-9]{10}$/.test(refMobile)) {
      temp.refMobile = "Enter a valid 10-digit referral mobile number";
    }

    // REFERRAL NAME
    if (!/^[A-Za-z ]{2,}$/.test(refName)) {
      temp.refName = "Enter a valid referral name";
    }

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
    <div className="fixed top-0 right-0 h-160 mr-20 mt-5 w-80 bg-slate-100 shadow-2xl p-6 overflow-y-auto rounded-3xl">

      {/* x Close Button (also open button in parent) */}
      <button
        onClick={onClose}
        className="text-blue-300 text-3xl font-extrabold absolute top-4 right-4"
      >
      
        <RxCross2 />
      </button>

      <h2 className="text-3xl font-bold text-emerald-400 mb-6">Referral Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <label className="flex flex-col">
          <span className="font-semibold">Date of Birth:</span>
          <input
            type="date"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border p-2 rounded-2xl w-60"
          />

           {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}

        </label>

        <label className="flex flex-col">
          <span className="font-semibold">Mobile No:</span>
          <input
            type="tel" placeholder="Enter valid Mobile no" required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border p-2 rounded-2xl w-60"
          />

           {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile}</p>}

        </label>

        <label className="flex flex-col">
          <span className="font-semibold">First Name:</span>
          <input
            type="text"
            placeholder="Enter Your First Name" required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 rounded-2xl w-60"
          />

           {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}

        </label>

        <label className="flex flex-col">
          <span className="font-semibold">Aadhar No:</span>
          <input
            type="number" placeholder="Enter your valid Aadhar No" required
          
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            className="border p-2 rounded-2xl w-60"
          />

           {errors.aadhar && <p className="text-red-600 text-sm">{errors.aadhar}</p>}
        </label>

        <label className="flex flex-col">
          <span className="font-semibold">Referred By (Mobile):</span>
          <input
            type="tel" placeholder="Enter Referred Mobile No" required
            value={refMobile}
            onChange={(e) => setRefMobile(e.target.value)}
            className="border p-2 rounded-2xl w-60"
          />
           {errors.refMobile && <p className="text-red-600 text-sm">{errors.refMobile}</p>}
        </label>

        <label className="flex flex-col">
          <span className="font-semibold">Referred By (Name):</span>
          <input
            type="text"  placeholder="Enter Referred  Name" required
            value={refName}
            onChange={(e) => setRefName(e.target.value)}
            className="border p-2 rounded-2xl w-60"
          />

           {errors.refName && <p className="text-red-600 text-sm">{errors.refName}</p>}

        </label>

        <button
          type="submit"
          className="w-4/9 bg-purple-600 font-semibold ml-18 text-white py-2 rounded-3xl hover:bg-purple-800"
        >
          Submit
        </button>

      </form>
    </div>
  );
}

export default Refform;
