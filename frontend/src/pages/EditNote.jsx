import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from "lucide-react";
import { useParams } from 'react-router';
import toast from "react-hot-toast";

const EditNote = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        title:  '',
        content:  ''
    })  
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {   
        const { name, value } = e.target;

        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    }

    useEffect(() => {
        const fetchNote = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setFormData({
                    title: data.title,
                    content: data.content
                }); 
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);        
            }
        }  
        fetchNote();
    }, [id])

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            // Handle validation error (e.g., show a message)
            return;
        }
        // Make an API call to update the note
            try {
                const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                 await response.json();
               toast.success('Note updated successfully!');
                // Optionally, redirect or show a success message
                Navigate('/');

                
            } catch (error) {
               toast.error('Failed to update note');
                console.log(error);
                // Handle error (e.g., show an error message)
            } finally {
                setIsLoading(false);
            }
    }


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-4">
            <ArrowLeftIcon className="size-4 mr-2" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Update  Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" placeholder="Note Title"
                   className="input input-bordered w-full" name='title'
                   value={formData.title}
                   onChange={handleChange}
                   />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea placeholder="Write your note here..." className="textarea textarea-bordered w-full h-40"
                   name='content' 
                     value={formData.content}
                   onChange={handleChange}
                   >

                   </textarea>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'updating': 'update'}</button>  
                </div>  
              </form>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EditNote