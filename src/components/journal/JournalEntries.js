import React from 'react'
import { useSelector } from 'react-redux'
import { JournalEntry } from './JournalEntry'

export const JournalEntries = () => {

    const notes = useSelector(state => state.notes.notes)

    return (
        <div className="jornal__entries">
            
        {
            notes.map( note => {
               return <JournalEntry key ={note.id} id={note.id} {...note}/>
            })
        }

        </div>
    )
}
