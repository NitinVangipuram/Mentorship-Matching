import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signin(username, password);
    } catch (err) {
      setError('An error occurred during sign in');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
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
          <Button type="submit" className="w-full">Sign In</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default Signin













// import React, { useState } from 'react'
// import { useAuth } from '../context/AuthContext'

// const Signin = () => {
//     const [username , setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const {signin} = useAuth()

//   return (
//     <div>
//         <input placeholder='username' onChange={(e) => {
//             setUsername(e.target.value) 
//         }} type='text'/>
//         <input placeholder='password' onChange={(e) => {
//             setPassword(e.target.value) 
//         }} type='password'/>
//         <button onClick={() => signin(username, password)}>Sign In</button>
//     </div>
//   )
// }

// export default Signin