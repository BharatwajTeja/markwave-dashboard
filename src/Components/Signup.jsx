import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

function Signup({ onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};

    if (!/^[A-Za-z]{2,}$/.test(firstName))
      temp.firstName = "Enter a valid first name";

    if (!/^[A-Za-z]{2,}$/.test(lastName))
      temp.lastName = "Enter a valid last name";

    if (!/^\S+@\S+\.\S+$/.test(email))
      temp.email = "Enter a valid email";

    if (!/^[0-9]{10}$/.test(mobile))
      temp.mobile = "Enter valid 10-digit mobile number";

    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(password))
      temp.password =
        "Password must contain uppercase, lowercase, number & special char";

    if (password !== confirmPassword)
      temp.confirmPassword = "Passwords do not match";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Signup Successful!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white shadow-2xl p-6 rounded-4xl
                   w-full max-w-md max-h-[90vh] overflow-y-auto relative"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-800 hover:text-teal-800 text-4xl"
        >
          <RxCross2 />
        </button>

        <h2 className="text-3xl font-semibold text-center mb-6 text-amber-800">
          Create Account
        </h2>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {/* First Name */}
          <label className="flex flex-col">
            <span className="font-medium mb-1">First Name</span>
            <input
              className="p-2 border rounded-2xl"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName}</p>
            )}
          </label>

          {/* Last Name */}
          <label className="flex flex-col">
            <span className="font-medium mb-1">Last Name</span>
            <input
              className="p-2 border rounded-2xl"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName}</p>
            )}
          </label>

          {/* Email */}
          <label className="flex flex-col">
            <span className="font-medium mb-1">Email</span>
            <input
              className="p-2 border rounded-2xl"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </label>

          {/* Mobile */}
          <label className="flex flex-col">
            <span className="font-medium mb-1">Mobile Number</span>
            <input
              className="p-2 border rounded-2xl"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {errors.mobile && (
              <p className="text-red-600 text-sm">{errors.mobile}</p>
            )}
          </label>

          {/* Password */}
          <label className="sm:col-span-2 flex flex-col">
            <span className="font-medium mb-1">Password</span>
            <input
              className="p-2 border rounded-xl w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </label>

          {/* Confirm Password */}
          <label className="sm:col-span-2 flex flex-col">
            <span className="font-medium mb-1">Confirm Password</span>
            <input
              className="p-2 border rounded-xl w-full"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="sm:col-span-2 w-full bg-orange-700 text-white py-2 rounded-3xl mt-4 hover:bg-purple-800"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-600 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Icons */}
        <div className="flex justify-center gap-6 text-3xl text-gray-700">
          <FaGoogle className="cursor-pointer hover:text-red-600" />
          <FaGithub className="cursor-pointer hover:text-blue-400" />
          <FaApple className="cursor-pointer hover:text-orange-300" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
