import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSavenote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {

        dispatch(startSavenote(active))
    }

    const handleClick = () => {
        document.querySelector('#fileSelector').click();
    }
    
    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (file ) {
            dispatch (startUploading(file))
        }
        document.querySelector('#fileSelector').value = '';
    }
    


    return (
        <div className="notes__appbar">
            <span>28 de Agosto 2021</span>

            <input 
                id="fileSelector"
                type="file"
                name="file"
                style={{ display:"none" }}
                onChange={handleFileChange}
            />

            <div>
                <button className="btn"
                    onClick={handleClick}
                >
                    Picture
                </button>
                <button onClick={handleSave} className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}
