
import React,{useState} from "react";

const Login = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage]   = useState("");
    const [jwt,setJwt]           =useState("");
    const [profile,setprofile]   = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
       try{
           const response = await fetch("http://localhost:8081/signin", {
            method:"POST",
            headers:{
               "Content-Type": "application/json",
            },
            body:JSON.stringify({username,password}),

           }

           );

           if(response.ok){
           const data = await response.json();
           console.log("Login response:",data);
           setUsername(data.username)
           setJwt(data.jwtToken);
         
           setPassword(data.password)
           setMessage("Login Successful");
           fetchUserProfile(data.jwtToken);
           }else{
            setMessage("Login Failed please check login credentials");

           }

       
    }catch(error){

        console.log("Error :" + error);
        setMessage("an error occured please try again.");
    }
};



 const fetchUserProfile = async (token) => {

   try{
        const response = await fetch("http://localhost:8081/profile", {
        method:"GET",
     
         headers:{
            "Authorization": `Bearer ${token}`
            
        },
       }

       );

        if(response.ok){
       const data = await response.json();
        console.log("Profile Response:",data);
       setprofile(data);
     
       }else{
        setMessage(" Failed to fetch the profile ");
 
        } 

   
 }catch(error){

     console.log("Error :" + error);
     setMessage("an error occured please try again at fetch profile.");
 }
 };


 const handleLogout =(e) => {
    setUsername("user1");
    setPassword("password1");
    setJwt("");
    setprofile(null);
    setMessage("You have been logged out");
 }
return(
    <div>
      
       {/* //<h2>Login</h2> */}
       {!profile ?(
        <form onSubmit={handleLogin}>
            <div>
                <label>Username: </label>
                <input type="text" value={username || ""} onChange={(e) =>setUsername(e.target.value)}/>
                 </div>
                 <div>
                <label>Password</label>
                <input type="password" value={password || ""} onChange={(e) =>setPassword(e.target.value)}/>
            </div>

            <button type = "submit">Login</button>
        </form>
       ) : (
            <div> 
                <h3>User profile</h3>
                <p>Username: {profile.username}</p>
                <p>Roles:{profile.roles.join(", ")}</p>
                <p>message:{profile.message}</p>
               <button onClick={handleLogout}>Logout</button>
            </div>
        )}
        {message && <p>{message}</p>}
         {jwt && <p>{jwt}</p> }
        {/* {username && <p>{username}</p>} */}
       
        </div>

     
      
);
}

export default Login;