import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Reducer/UserReducer';
import phoneSlice from './Reducer/phoneSlice';
import customerAccount from './Reducer/CreateAccount/CustomerAccount'
import doctorAccount from './Reducer/CreateAccount/DoctorAccount'
import doctorSlice from './Reducer/doctorSlice';
import DoctorVisits from './Reducer/DoctorVisits';
import availabilitySlice from './Reducer/availabilitySlice';
import Notifications from './Reducer/Notifications';
import FCMToken from './Reducer/CreateAccount/FCMToken';

const store = configureStore({
  reducer: {
    user: UserReducer,
    phone: phoneSlice,
    customerAccount: customerAccount,
    doctorAccount: doctorAccount,
    doctorDetails: doctorSlice,
    visits: DoctorVisits,
    availability: availabilitySlice,
    notification : Notifications,
    fcmToken : FCMToken
  },
});

export default store;