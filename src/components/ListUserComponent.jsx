// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import {deleteUser, listUsers} from "../services/UserService.js";
import {useNavigate} from "react-router-dom";

const ListUserComponent = () => {

    const [users,setUsers] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    function getAllUsers(){
        listUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addNewUser() {
        navigator('/add-user')
    }

    function updateUser(userId) {
        navigator(`/update-user/${userId}`);
    }
    function removeUser(userId) {
        console.log(userId);
        deleteUser(userId).then((response) =>{
            console.log(response.data)
            getAllUsers();
        }).catch(error => {
            console.error(error)
        });
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Users</h2>
            <button className='btn btn-primary mb-2' onClick={addNewUser}>Add User</button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>User First Name</th>
                    <th>User Last Name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td className='text-center'>
                            <div className='btn-group' role='group' aria-label='User Actions'>
                                <button className='btn btn-info' onClick={() => updateUser(user.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeUser(user.id)}>Delete</button>
                            </div>
                        </td>

                    </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}
export default ListUserComponent
