import React, { useState , useEffect} from 'react'
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
const CreateNote = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.title || !formData.content) {
        toast.error('Please fill in all fields');
        setIsLoading(false);
        return;
    }
    try {
        const response = await fetch('http://localhost:8080/api/notes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();

        toast.success('Note created successfully!');
        navigate('/');

       
    } catch (error) {
        console.log(error);
        toast.error('Failed to create note');
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
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" placeholder="Note Title"
                   className="input input-bordered w-full" name='title'
                   onChange={handleChange}/>
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea placeholder="Write your note here..." className="textarea textarea-bordered w-full h-40"
                   name='content' onChange={handleChange}></textarea>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Note'}</button>  
                </div>  
              </form>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNote