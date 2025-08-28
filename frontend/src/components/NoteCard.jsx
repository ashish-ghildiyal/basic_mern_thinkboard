import React from 'react'
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
const NoteCard = ({note}) => {
    const {_id, title, content, createdAt } = note;
    console.log("val", note)
  return (
    <Link  className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]">
     <div className="card-body">
        <h3 className="card-title text-base-content">{title}</h3>
        <p className="text-base-content/70 line-clamp-3">{content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
          {createdAt}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error">
            <Trash2Icon className="size-4" />
            </button>
            </div>
        </div>
     </div>
    </Link>
  )
}

export default NoteCard