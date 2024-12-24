import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Profile = () => {
  const { authUser } = useAuth()
  const [role, setRole] = useState('')
  const [skills, setSkills] = useState('')
  const [interest, setInterest] = useState('')
  const [bio, setBio] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (authUser) {
      axios.get(`/api/v1/profile/${authUser.id}`)
        .then((response) => {
          const { role, skills, interest, bio } = response.data
          setRole(role || '')
          setSkills(skills || '')
          setInterest(interest || '')
          setBio(bio || '')
          setIsEditing(true)
        })
        .catch((error) => {
          console.log("Error fetching Profile:", error)
          setIsEditing(false)
        })
    }
  }, [authUser])

  const handleSave = async () => {
    const profileData = { role, skills, interest, bio }
    try {
      await axios.post("/api/v1/profile", { ...profileData, userId: authUser.id })
      alert('Profile saved successfully!')
    } catch (error) {
      console.log("Error saving Profile:", error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Profile' : 'Create Profile'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                placeholder="Enter your role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="Enter your skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interest">Interest</Label>
              <Textarea
                id="interest"
                placeholder="Enter your interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Write a short bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <Button type="submit">Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile



// import React, { useEffect, useState } from 'react'
// import { useAuth } from '../context/AuthContext'
// import axios from 'axios'
// import "./Profile.css"

// const Profile = () => {
//   const {authUser} = useAuth()
//   const [role, setRole] = useState('')
//   const [skills, setSkills] = useState('')
//   const [interest, setInterset] = useState('')
//   const [bio, setBio] = useState('')
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(()=> {
//     if (authUser) {
//       axios.get(`http://localhost:3000/api/v1/profile/${authUser.id}`)
//       .then((response) => {
//         const {role, skills, interest, bio} = response.data
//         setRole(role || '')
//         setSkills(skills || '')
//         setInterset(interest || '')
//         setBio(bio || '')
//         setIsEditing(true)
//       })
//       .catch((error) => {
//         console.log("Error fetching Profile:", error)
//         setIsEditing(false)
//       })
//     }
//   }, [authUser])


//   const handleSave = async () => {
//     const profileData = {role, skills, interest, bio};
//     try {
//       const response = await axios.post("http://localhost:3000/api/v1/profile", {...profileData, userId: authUser.id})
//       alert('Profile saved successfully!')

//     } catch (error) {
//       console.log("Error fetching Profile:", error)
//     }
//   }

//   return (
//     <div className="profile-container">
//     <h1>{isEditing ? 'Edit Profile' : 'Create Profile'}</h1>
//     <div className="form-group">
//       <label>Role:</label>
//       <input
//         type="text"
//         placeholder="Enter your role"
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//       />
//     </div>
//     <div className="form-group">
//       <label>Skills:</label>
//       <input
//         type="text"
//         placeholder="Enter your skills"
//         value={skills}
//         onChange={(e) => setSkills(e.target.value)}
//       />
//     </div>
//     <div className="form-group">
//       <label>Interest:</label>
//       <textarea
//         type="text"
//         placeholder="Enter your interest"
//         value={interest}
//         onChange={(e) => setInterset(e.target.value)}
//       ></textarea>
//     </div>
//     <div className="form-group">
//       <label>Bio:</label>
//       <textarea
//         placeholder="Write a short bio"
//         value={bio}
//         onChange={(e) => setBio(e.target.value)}
//       ></textarea>
//     </div>
//     <button className="save-button" onClick={handleSave}>
//       Save Profile
//     </button>
//   </div>
//   )
// }

// export default Profile