import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const MatchingPage = ({ userId }) => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/v1/match/${userId}`)
        if (Array.isArray(response.data.matches)) {
          setMatches(response.data.matches)
        } else {
          setMatches([])
          setError(response.data.message || "Unexpected response format")
        }
      } catch (error) {
        console.error("Error fetching matches:", error)
        setError("Failed to fetch matches")
      } finally {
        setLoading(false)
      }
    }
    fetchMatch()
  }, [userId])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Mentorship Matches</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : matches.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <Card key={match.userId}>
              <CardHeader>
                <CardTitle>{match.role}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Skills:</strong> {match.skills}</p>
                <p><strong>Interests:</strong> {match.interest}</p>
                <p><strong>Bio:</strong> {match.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center">No profile matches found!</p>
      )}
    </div>
  )
}

export default MatchingPage















// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import "./MatchingPage.css"


// const MatchingPage = ({userId}) => {
//     const [matches, setMatches] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState("")

//     useEffect(() => {
//         const fetchMatch = async () => {
//             try {
//                 setLoading(true)
//                 const response = await axios.get(`http://localhost:3000/api/v1/match/${userId}`)
//                 console.log(userId)
//                 console.log("Full response:", response); // Debugging
//                 console.log("Response data:", response.data); // Debugging
//                 if (Array.isArray(response.data.matches)) {
//                     setMatches(response.data.matches)
//                 } else {
//                     setMatches([]);
//                     setError(response.data.message || "Unexpected response format");
//                 }
//             } catch (error) {
//                 console.error("Error fetching matches:", err);
//                 setError("Failed to fetch match")
//             } finally {
//                 setLoading(false)
//             }
//         };
//         fetchMatch()
//     }, [userId])

//   return (
//     <div className="match-page">
//         <h1>Find Your Mentorship Matches</h1>
//         {loading ? (
//         <p>Loading...</p>
//         ) : error ? (
//         <p>{error}</p>
//         ) : matches.length > 0 ? (
//         <div className="matches-list">
//             {matches.map((match) => (
//             <div key={match.userId} className="match-card">
//                 <h3>{match.role}</h3>
//                 <p><strong>Skills:</strong> {match.skills}</p>
//                 <p><strong>Interests:</strong> {match.interest}</p>
//                 <p><strong>Bio:</strong> {match.bio}</p>
//             </div>
//             ))}
//         </div>
//         ) : (
//         <p>No profile matches found!</p>
//         )}
//   </div>
//   )
// }

// export default MatchingPage