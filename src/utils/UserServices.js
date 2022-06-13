import { API_URL } from '../db/conexion.js';

class UserServices {
    getUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/usuario`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    getUserById = async userId => {
        try {
            const response = await fetch(`${API_URL}/usuario/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    getUserByName = async userName => {
        try {
            const response = await fetch(`${API_URL}/usuario`);
            const data = await response.json();
            return data.filter(user => user.usuario === userName)[0];
        } catch (error) {
            throw error;
        }
    }

    validateUserLoggedRolAdmin = async () => {
        try {
            let isAdmin = false;
            const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
            if (userLogged && userLogged.usuario) {
                const response = await fetch(`${API_URL}/usuario`);
                const data = await response.json();
                const userDB = await data.filter(user => user.usuario === userLogged.usuario)[0];
                if (!(await userDB) || await userDB.rol !== 'admin') {
                    isAdmin = false;
                } else isAdmin = true;
            } else isAdmin = false;

            return isAdmin;

        } catch (error) {
            throw error;
        }
    }
}

export default UserServices;