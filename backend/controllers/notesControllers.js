import Note from '../models/Note.js';
export const getAllNotes = async(req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
        
    }

}

export const createNote = async(req, res) => {

    try {
        const {title, content} = req.body;
        if(!title || !content){
            return res.status(400).json({message: "Title and Content are required"});
        }
        const newNote = new Note({title, content});
        await newNote.save();
        res.status(201).json(newNote);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}


export const getNoteById = async(req, res) => {
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({message: `Note with id ${id} not found`});
        }    
        res.status(200).json(note);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
        
    }
}

export const updateNote = async(req, res) => {
    try {
        const {id} = req.params;
        const {title, content} = req.body;
        if(!title || !content){
            return res.status(400).json({message: "Title and Content are required"});
        }
        const updatedNote = await Note.findByIdAndUpdate(id, {title, content}, {new: true});

        if(!updatedNote){
            return res.status(404).json({message: `Note with id ${id} not found`});
        }
        await updatedNote.save();
        res.status(200).json(updatedNote);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
        
    }
}

export const deleteNote = async(req, res) => {
    try {
        const {id} = req.params;
        const deletedNote = await  Note.findByIdAndDelete(id);
        if(!deletedNote){
            return res.status(404).json({message: `Note with id ${id} not found`});
        }
        res.status(200).json({message: "Note deleted successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
        
    }   
}