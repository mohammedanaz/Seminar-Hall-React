import { createSlice, current } from "@reduxjs/toolkit";

const today = new Date().toISOString().split('T')[0];
const seatNumbersArray = Array.from({ length: 30 }, (_, i) => ({
    seatNumber: i + 1, 
    clicked: false,
    isBooked: false
}))
const initialState = {
    selectedDate: today,
    seatNumbers: seatNumbersArray,
    bookedData: [],
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
}

const seminarHallSlice = createSlice({
    name: 'seminarHall',
    initialState,
    reducers: {
        initializeDate: (state) => {
            console.log('inside initialize date reducer.');
            state.selectedDate = today;
        },
        loadBookedData: (state, action) => {
            console.log('loadBookedData reducer called.');
            state.bookedData = action.payload
        },
        refreshSeats: (state)=>{
            console.log('refresh Seats reducer called');
            const filteredData = state.bookedData.filter(seat=> seat.bookedDate === state.selectedDate)
            const bookedSeatsOnDate = filteredData.map(item => item.seats).flat();
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
            console.log('create booking reducer called');
            const {
                seats, 
                selectedDate,
                name,
                phoneNumber
            } = action.payload

            state.bookedData.push({ 
                name: name,
                phoneNumber: phoneNumber.toString(),
                bookedDate: selectedDate,
                seats: seats
            })
        },
        loginSuccess: (state, action) => {
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            console.log('inside logout reducer');
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        }
    }
})

export const {
    initializeDate,
    loadBookedData,
    seatClicked,
    createBooking,
    refreshSeats,
    changeSelectedDate,
    loginSuccess,
    logout
} = seminarHallSlice.actions;

export default seminarHallSlice.reducer;