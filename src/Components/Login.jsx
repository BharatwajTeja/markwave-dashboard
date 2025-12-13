import { useState } from "react";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";  
import logo from "../assets/icon.png";   // PNG file

function Login() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [res, setRes] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [pswdErr, setPswdErr] = useState("");
  const [openSignup, setOpenSignup] = useState(false);

  let login = () => {
    setEmailErr("");
    setPswdErr("");
    setRes("");

    let valid = true;

    if (email !== "admin@gmail.com") {
      setEmailErr("Enter Valid Email");
      valid = false;
    }

    if (pswd !== "Markwave@25") {
      setPswdErr("Enter Valid Password");
      valid = false;
    }

    if (valid) {
      setRes("Login Success!!");
      navigate("/home/");
    } else {
      setRes("Login Fail!!");
    }
    
    setEmail("");
    setPswd("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100"
    
      onClick={() => {
    setEmailErr("");
    setPswdErr("");
    setRes("");
  }}

    
    >

      <div 
        className="bg-white shadow-xl rounded-3xl overflow-hidden w-[90%] max-w-3xl flex relative"
 
         
      >

        {/* LOGIN FORM */}
        <form className="bg-pink-200 p-8 w-1/2 bg-opacity-90 backdrop-blur-sm"
        

        
                >
          <h2 className="text-2xl font-extrabold text-center mb-8 text-gray-900">
            Login
          </h2>

          <label className="block mb-2">
            <span className="text-gray-800 font-medium text-cyan-900">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               onClick={(e) => e.stopPropagation()}
              type="email"
              className="mt-1 w-75 p-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {emailErr && <p className="text-red-600 text-sm font-bold mt-1">{emailErr}</p>}
          </label>

          <label className="block mb-4">
            <span className="text-gray-800 font-medium text-cyan-900">Password</span>
            <input
              value={pswd}
              onChange={(p) => setPswd(p.target.value)}
               onClick={(e) => e.stopPropagation()}
              type="password"
              className="mt-1 w-75 p-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 "
            />
            {pswdErr && <p className="text-red-600 text-sm font-bold mt-1">{pswdErr}</p>}
          </label>

          <button 
            type="button"
            
              onClick={(e) => {
              e.stopPropagation(); // prevent clearing errors
              login();
              }}
            className="w-40 ml-15 mt-5 bg-amber-950 text-white py-2 rounded-3xl hover:bg-blue-900 transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setOpenSignup(!openSignup)}
            className="w-2/4 mb-5 ml-116 bg-lime-600 text-white py-2 rounded-2xl hover:bg-gray-900 transition"
          >
            Signup
          </button>

          <h5 className="text-center mb-10 mr-10  font-bold text-black">{res}</h5>
        </form>

          <div
 
            className="w-1/2 flex items-center justify-center mb-2"
            style={{
                       backgroundImage: `url(${logo})`,
                       backgroundRepeat: "no-repeat",
                       backgroundPosition: "center",
                       backgroundSize: "200px 200px", // fixed symbol size
                   }}
                  >

                    <h2 ></h2>
                    </div>


      </div>

      {openSignup && <Signup onClose={() => setOpenSignup(false)} />}
    </div>
  );
}

export default Login;
