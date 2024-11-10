// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

// const Login = () => {
//   const [data, setData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = ({ currentTarget: input }) => {
//     setData({ ...data, [input.name]: input.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = "http://localhost:8090/api/auth";
//       const response = await axios.post(url, data);

//       const resData = response.data;

//       //console.log("API Response:", resData); 

     
//       localStorage.setItem("token", resData.token); 
//       localStorage.setItem("role", resData.role);   

      
//       if (resData.role === "Chef") {
// 		navigate("/chef-dashboard");
// 	  } else if (resData.role === "Manager") {
// 		navigate("/manager-dashboard");
// 	  } else {
// 		setError("Unexpected role: " + resData.role);
// 	  }
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status <= 500
//       ) {
//         setError(error.response.data.message);
//       }
//     }
//   };

//   return (
//     <div className={styles.login_container}>
//       <div className={styles.login_form_container}>
//         <div className={styles.left}>
//           <form className={styles.form_container} onSubmit={handleSubmit}>
//             <h1>Login to Your Account</h1>
//             <input
//               type="email"
//               placeholder="Email"
//               name="email"
//               onChange={handleChange}
//               value={data.email}
//               required
//               className={styles.input}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               onChange={handleChange}
//               value={data.password}
//               required
//               className={styles.input}
//             />
//             {error && <div className={styles.error_msg}>{error}</div>}
//             <button type="submit" className={styles.green_btn}>
//               Sign In
//             </button>
//           </form>
//         </div>
//         <div className={styles.right}>
//           <h1>New Here?</h1>
//           <Link to="/signup">
//             <button type="button" className={styles.white_btn}>
//               Sign Up
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8090/api/auth";
      const response = await axios.post(url, data);

      const resData = response.data;

      //console.log("API Response:", resData); 

     
      localStorage.setItem("token", resData.token); 
      localStorage.setItem("role", resData.role);   

      
      if (resData.role === "Chef") {
		navigate("/chef-dashboard");
	  } else if (resData.role === "Manager") {
		navigate("/manager-dashboard");
	  } else {
		setError("Unexpected role: " + resData.role);
	  }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.welcome_section}>
              <div className={styles.credentials_container}>
                <div className={styles.credentials_card}>
                  <h3>Manager Credentials</h3>
                  <ul>
                    <li>
                      <strong>Email:</strong> Manager@gmail.com
                    </li>
                    <li>
                      <strong>Password:</strong> Manager@123!
                    </li>
                  </ul>
                </div>
                <div className={styles.credentials_card}>
                  <h3>Chef Credentials</h3>
                  <ul>
                    <li>
                      <strong>Email:</strong> Chef@gmail.com
                    </li>
                    <li>
                      <strong>Password:</strong> Chef@123!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here?</h1>
		  <button
    type="button"
    className={styles.white_btn}
    disabled
    title="Sign Up is currently disabled."
  >Sign Up</button>
          {/* <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Login;












