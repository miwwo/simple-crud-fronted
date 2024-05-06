import {useEffect, useState} from 'react'
import {createUser, getUser, updateUser} from "../services/UserService.js";
import {useNavigate, useParams} from "react-router-dom";
import data from "bootstrap/js/src/dom/data.js";

const UserComponent = () => {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')

    const {id} = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })
    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getUser(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email)
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id]);
    function saveOrUpdateUser(e) {
        e.preventDefault();
        if(validateForm()) {
            const user = {firstName, lastName, email}
            console.log(user);
            if (id) {
                updateUser(id, user).then((response) =>{
                    console.log(response.data);
                    navigator('/users');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createUser(user).then((response) => {
                    console.log(response.data);
                    navigator('/users');
                }).catch(error => {
                    console.error(error)
                });
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required.';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }else{
            errorsCopy.lastName = 'Last name is required.';
            valid = false;
        }
        if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = 'Email is required.';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return  <h2 className='text-center m-2'>Update User</h2>
        }else{
            return  <h2 className='text-center m-2'>Add User</h2>
        }
    }
    return (
        <div className='container'>
            <br />
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'> First Name: </label>
                                <input
                                type='text'
                                placeholder='Enter User first name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={(e) => setFirstName(e.target.value)}/>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'> Last Name: </label>
                                <input
                                    type='text'
                                    placeholder='Enter User last name'
                                    name='lastName'
                                    value={lastName}
                                    className={
                                        `form-control ${errors.lastName ? 'is-invalid' : ''}`
                                    }
                                    onChange={(e) => setLastName(e.target.value)}/>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'> Email: </label>
                                <input
                                    type='text'
                                    placeholder='Enter User email'
                                    name='email'
                                    value={email}
                                    className={
                                        `form-control ${errors.email ? 'is-invalid' : ''}`
                                    }
                                    onChange={(e) => setEmail(e.target.value)}/>

                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateUser}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserComponent
