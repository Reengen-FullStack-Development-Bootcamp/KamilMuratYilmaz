import CustomerForm from "@/components/CustomerForm";
import HotelCard from "@/components/HotelCard"
import Reservation from "@/components/Reservation"
import HotelPage from "@/components/HotelPage"
import Home from "@/components/Home.vue"

export const routes = [
    {path: '/', component: Home},
    {path: '/hotel/:id', component: HotelPage, props: true},
    {path: '/hotel/:id/customerForm', name: "CustomerForm" , component: CustomerForm, props: true},
    {path: '/hotelCard', component: HotelCard, props: true},
    {path: '/hotel/:id/reservation', name: "Reservation", component: Reservation, props: true},
]