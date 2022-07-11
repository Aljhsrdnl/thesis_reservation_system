import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'

function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    // useEffect(() => {
    //     if(activation_token){
    //         const activationEmail = async () => {
    //             try {
    //                 const res = await axios.post('/user/activation', {activation_token})
    //                 setSuccess(res.data.msg)
    //                 console.log(res)
    //             } catch (error) {
    //                 // err.response.data.msg && setErr(err.response.data.msg)
    //                 // setErr(error.message)
    //                 // console.log(error)
    //             }
    //         }
    //         activationEmail()
    //     }
    // },[activation_token])

    
        const activationEmail = async () => {
            try {
                const res = await axios.post('/user/activation', {activation_token})
                setSuccess(res.data.msg)
                console.log(res)
            } catch (err) {
               setErr(err.response.data.msg)
                
                console.log(err)
            }
        }
        activationEmail()
    
    return (
        <div className="active_page">
            {success ? <p>{success}</p> : err ? <p>{err}</p>: ""}
           
        </div>
    )
}

export default ActivationEmail
