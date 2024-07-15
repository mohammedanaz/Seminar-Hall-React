import { seminarHallAxios } from "./axiosSeminarHall";

const signup = async (userData)=>{
    try {
        const response = await seminarHallAxios.post('signup/', userData)
        console.log('inside signup api Fn. success');
        return response
    } catch (error) {
        console.log('Error in signup - ', error.response.data);
        throw error
    }
}

export default signup;