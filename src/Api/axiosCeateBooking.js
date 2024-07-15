import { seminarHallAxios } from "./axiosSeminarHall";

const axiosCreateBooking = async (newData)=>{
    try {
        const response = await seminarHallAxios.post('bookings/create/', newData)
        console.log('inside createBooking Fn. success');
        return response
    } catch (error) {
        console.log('Error in createBooking - ', error.response.data);
        throw error
    }
}

export default axiosCreateBooking;