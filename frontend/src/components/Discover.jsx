import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const Discover = ({userId}) => {
  const [filters, setFilters] = useState({ role: "", skills: "", interest: "", userId})
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProfiles = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/v1/discover", {
        params: filters
      })
      setProfiles(response.data)
    } catch (error) {
      console.log("Error fetching profiles:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchProfiles()
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Discover Users</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filter Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={filters.role}
                onChange={handleChange}
                placeholder="Enter role"
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={filters.skills}
                onChange={handleChange}
                placeholder="Enter skills"
              />
            </div>
            <div>
              <Label htmlFor="interest">Interest</Label>
              <Input
                id="interest"
                name="interest"
                value={filters.interest}
                onChange={handleChange}
                placeholder="Enter interests"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : profiles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <Card key={profile.id}>
              <CardHeader>
                <CardTitle>{profile.role}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Skills:</strong> {profile.skills}</p>
                <p><strong>Interest:</strong> {profile.interest}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center">No profiles found.</p>
      )}
    </div>
  )
}

export default Discover










// import axios from 'axios';
// import React, { useEffect, useState } from 'react'


// const Discover = ({userId}) => {
//     const [filters, setFilters] = useState({role: "", skills: "", interest: "", userId: userId})
//     const [profiles, setProfiles] = useState([]);
//     const [loading, setLoading] = useState(false);

//     //Fetching Profiles according to filter values
//     const fetchProfiles = async() => {
//         setLoading(true);
//         try {
//             const response = await axios.get("http://localhost:3000/api/v1/discover", {
//                 params: filters
//             })
//             setProfiles(response.data);
//         } catch (error) {
//             console.log("Error fetching profile:", error)
//         } finally{
//             setLoading(false)
//         }
//     }

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setFilters({...filters, [name]: value})
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         fetchProfiles()
//     }

//     useEffect(() => {
//         fetchProfiles(); //Fetching all profiles presentin database
//     }, [])

//   return (
//     <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">User Discovery</h1>

//         {/* Filter Form */}
//         <form onSubmit={handleSubmit} className="mb-6 grid gap-4 md:grid-cols-3">
//         <div>
//             <label className="block text-sm font-medium">Role</label>
//             <input
//             type="text"
//             name="role"
//             value={filters.role}
//             onChange={handleChange}
//             placeholder="Enter role"
//             className="w-full border rounded p-2"
//             />
//         </div>
//         <div>
//             <label className="block text-sm font-medium">Skills</label>
//             <input
//             type="text"
//             name="skills"
//             value={filters.skills}
//             onChange={handleChange}
//             placeholder="Enter skills"
//             className="w-full border rounded p-2"
//             />
//         </div>
//         <div>
//             <label className="block text-sm font-medium">Interest</label>
//             <input
//             type="text"
//             name="interest"
//             value={filters.interest}
//             onChange={handleChange}
//             placeholder="Enter interests"
//             className="w-full border rounded p-2"
//             />
//         </div>
//         <button
//             type="submit"
//             className="bg-blue-500 text-white p-2 rounded-md col-span-full md:col-span-1"
//         >
//             Search
//         </button>
//         </form>

//         {/* Profile List */}
//         {loading ? (
//         <p>Loading...</p>
//         ) : profiles.length > 0 ? (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {profiles.map((profile) => (
//             <div key={profile.id} className="border p-4 rounded-md shadow-sm">
//                 <h2 className="text-lg font-bold">{profile.role}</h2>
//                 <p>
//                 <strong>Skills:</strong> {profile.skills}
//                 </p>
//                 <p>
//                 <strong>Interest:</strong> {profile.interest}
//                 </p>
//                 <p>
//                 <strong>Bio:</strong> {profile.bio}
//                 </p>
//             </div>
//             ))}
//         </div>
//         ) : (
//         <p>No profiles found.</p>
//         )}
//     </div>
//   )
// }

// export default Discover