import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(username, password);
    } catch (err) {
      setError('An error occurred during sign up');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Sign Up</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Signup;















// import React, { useState } from 'react'
// import { useAuth } from '../context/AuthContext'


// const Signup = () => {
//     const [username , setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const {signup} = useAuth()
//   return (
//     <div>
//         <input placeholder='username' onChange={(e) => {
//             setUsername(e.target.value) 
//         }} type='text'/>
//         <input placeholder='password' onChange={(e) => {
//             setPassword(e.target.value) 
//         }} type='password'/>
//         <button onClick={() => signup(username, password)}>Sign up</button>
//     </div>
//   )
// }

// export default Signup