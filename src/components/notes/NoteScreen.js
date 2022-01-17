import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active: note } = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note)
    const { body, title } = formValues

    const activeId = useRef( note.id )

    useEffect(() => {
        if( note.id !== activeId.current) {
            reset(note)
            activeId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {
        dispatch( activeNote( formValues.id, {...formValues}) )
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleting( activeId.current ) );
    }
    

    return (
        <div className="notes__main-content animate__animated animate__fadeIn animate__slower">

            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="Write about today!"
                    className="notes__textarea"
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    (note.url) &&
                    <div className="notes__image">
                        <img
                            alt="img4"
                            src={note.url}
                        />
                    </div>
                }
            </div>

                <button 
                    className='btn btn-danger'
                    onClick={handleDelete}
                >
                    Delete
                </button>

        </div>
    )
}
