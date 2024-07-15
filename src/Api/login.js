import { seminarHallAxios } from "./axiosSeminarHall";

const login = async (userData)=>{
    try {
        const response = await seminarHallAxios.post('login/', userData)
        console.log('inside login api Fn. success');
        return response
    } catch (error) {
        console.log('Error in login - ', error.response.data);
        throw error
    }
}

export default login;