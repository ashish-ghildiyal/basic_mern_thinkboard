import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { useEffect } from 'react'

const Home = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchNotes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/notes/',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log(data)
            setNotes(data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])
  return (
     <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto p-4 mt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    notes.map((note)=>{
                        return <NoteCard key={note._id} note={note} />
                    })
                }
             </div>
        </div>
     </div>
  )
}

export default Home