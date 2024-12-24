import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HomeIcon, User, Search, Users, LogOut } from 'lucide-react'

const Home = () => {
  const { logout, authUser } = useAuth()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">MentorMatch</h2>
        </div>
        <nav className="mt-6">
          <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
            <HomeIcon className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link to="/api/v1/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
            <User className="inline-block w-5 h-5 mr-2" />
            Profile
          </Link>
          <Link to="/api/v1/discover" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
            <Search className="inline-block w-5 h-5 mr-2" />
            Discover
          </Link>
          <Link to="/api/v1/match" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
            <Users className="inline-block w-5 h-5 mr-2" />
            Matches
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button  onClick={() => logout()} variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {authUser.id}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">5 Connections</p>
              <p className="text-sm text-gray-500">2 Pending Requests</p>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Meeting with John Doe</p>
              <p className="text-sm text-gray-500">Tomorrow at 3:00 PM</p>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">John Doe accepted your request</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Mentors/Mentees */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Based on your interests and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-shrink-0">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src={`/placeholder.svg?height=64&width=64&text=User${i}`} alt={`User ${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-semibold text-center">User {i}</p>
                  <p className="text-xs text-gray-500 text-center">Software Engineer</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Home










// import React from 'react'
// import { useAuth } from '../context/AuthContext'
// import Profile from './Profile'

// const Home = () => {
//   const {logout, authUser} = useAuth()
//   return (
//     <div>
//        <h1>Welcome, {authUser.id}</h1>
//        <button onClick={() => logout()}>Log Out</button>
//     </div>
//   )
// }

// export default Home