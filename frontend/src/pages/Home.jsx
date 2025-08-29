import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { useEffect } from 'react'
import NotesNotFound from '../components/NotesNotFound'
import RateLimitUI from '../components/RateLimitUI'
import toast from 'react-hot-toast'

const Home = () => {
     const [isRateLimited, setIsRateLimited] = useState(false);
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
            setNotes(data);
            setIsRateLimited(false);
        } catch (error) {
            console.log(error)
            if (error.status === 429) {
                setIsRateLimited(true);
            }
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
        {isRateLimited && <RateLimitUI />}
        <div className="max-w-7xl mx-auto p-4 mt-6">
            {loading && <div className="text-center text-lg">Loading...</div>}
           {notes.length==0 && !loading && <NotesNotFound/>}

           {notes.length > 0 && !isRateLimited &&  (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    notes.map((note)=>{
                        return <NoteCard key={note._id} note={note} setNotes={setNotes} />
                    })
                }
             </div>)}
        </div>
     </div>
  )
}

export default Home