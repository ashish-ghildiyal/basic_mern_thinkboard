import React, { useEffect } from 'react'
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { formatDate } from '../lib/utils';
const NoteCard = ({note, setNotes}) => {
    const {_id, title, content, createdAt } = note;

    const handleDeleteNote = async (e, id) => {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this note?")) return;
      try {
        const res = await fetch(`http://localhost:8080/api/notes/${id}`, {
          method: "DELETE",
        });
         await res.json();
         setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
         toast.success("Note deleted successfully");
       
      } catch (error) {
        console.log(error)
        toast.error("Failed to delete the note");
      }
  }



  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]">
     <div className="card-body">
        <h3 className="card-title text-base-content">{title}</h3>
        <p className="text-base-content/70 line-clamp-3">{content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
          {formatDate(createdAt)} 
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error"
             onClick={(e) => handleDeleteNote(e,_id)}>
        
            <Trash2Icon className="size-4" />
            </button>
            </div>
        </div>
     </div>
    </div>
  )
}

export default NoteCard;