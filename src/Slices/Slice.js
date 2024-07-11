import { createSlice, current } from "@reduxjs/toolkit";

const today = new Date()
const seatNumbersArray = Array.from({ length: 30 }, (_, i) => ({
    seatNumber: i + 1, 
    clicked: false,
    isBooked: false
}))
const initialState = {
    selectedDate: today.toDateString(),
    seatNumbers: seatNumbersArray,
    bookedData: [],
}

const seminarHallSlice = createSlice({
    name: 'seminarHall',
    initialState,
    reducers: {
        refreshSeats: (state)=>{
            console.log('refresh Seats called');
            const filteredData = state.bookedData.filter(seat=> seat.date === state.selectedDate)
            const bookedSeatsOnDate = filteredData.reduce((acc, item)=>{
                return [...acc, ...item.seats]
            },[])
            const seatNumbersArray = Array.from({ length: 30 }, (_, i) => ({
                seatNumber: i + 1, 
                clicked: false,
                isBooked: bookedSeatsOnDate.includes(i+1)
            }));
            state.seatNumbers = seatNumbersArray;
        },
        changeSelectedDate: (state, action)=>{
            state.selectedDate = action.payload
        },
        seatClicked: (state, action)=>{
            state.seatNumbers = action.payload
        },
        createBooking: (state, action)=>{
            console.log('create booking called');
            const {
                selectedSeats, 
                selectedDate,
                name,
                phoneNumber
            } = action.payload
            const seats = selectedSeats.map(seat=> seat.seatNumber)
            state.bookedData.push({
                date: selectedDate, 
                seats: seats,
                name: name,
                phoneNumber: phoneNumber
            })
            window.alert(`Booking successfully completed.
                Details are:-
                Name- ${name}
                Phone Number - ${phoneNumber}
                Seats Booked- ${seats}`)  
        }
    }
})

export const {
    seatClicked,
    createBooking,
    refreshSeats,
    changeSelectedDate
} = seminarHallSlice.actions;

export default seminarHallSlice.reducer;