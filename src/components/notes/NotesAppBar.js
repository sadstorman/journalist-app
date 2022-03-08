import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { startSavenote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const today = moment().format("Do MMM YY")

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

        if (file) {
            if (file.type.includes('image')) {
                dispatch(startUploading(file))
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Subir solo imagenes'
                })
            }
        }
        document.querySelector('#fileSelector').value = '';
    }



    return (
        <div className='container-fluid'>


            <div className='row  notes__appbar'>

                <div className='col-md-6 col-sm-12 text-start'>

                    <div>
                        <span>{today}</span>


                    </div>



                </div>

                <div className='col-md-6 col-sm-12 text-end'>

                    <input
                        id="fileSelector"
                        type="file"
                        name="file"
                        style={{ display: "none" }}
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




            </div>

        </div>

    )
}
