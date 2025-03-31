import React,{useState} from "react";

const Login = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage]   = useState("");
    const [jwt,setJwt]           =useState("");
    const [profile,setprofile] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
       try{
           const response = await fetch("http://localhost:8080/login", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({username,password}),

           }

           );

           if(response.ok){
           const data = await response.json();
           console.log(data);
           setJwt(data.jwtToken);
           setMessage("Login Successful");
           }else{
            setMessage("Login Failed please check login credentials");

           }

       
    }catch(error){

        console.log("Error :" + error);
        setMessage("an error occured please try again.");
    }
};




return(
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
                <label>Username: </label>
                <input type="text" value={username} onChange={(e) =>setUsername(e.target.value)}/>
                 </div>
                 <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
            </div>

            <button type = "submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        {jwt && <p>{jwt}</p>}
    </div>
);
}

export default Login;