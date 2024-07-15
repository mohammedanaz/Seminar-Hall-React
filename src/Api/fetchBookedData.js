import { seminarHallAxios } from "./axiosSeminarHall";

const fetchBookedData = async ()=>{
    try {
        const response = await seminarHallAxios.get('fetch_booking/')
        console.log('inside fetchBookedData Fn. success');
        return response
    } catch (error) {
        console.log('Error in fetchBookedData - ', error.response.data);
        throw error
    }
}

export default fetchBookedData;