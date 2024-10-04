import cookie from "react-cookies"
import axios from "axios";

export const endpoints = {
    "routes": "/routes/",
    "stations":"/stations/",
    "trips": "/trips/",
    "tickets": "/tickets/",
    "detailRoute": (routeId) => `/routes/${routeId}/`,
    "detailTrip": (tripId) => `/trips/${tripId}/`,
    "login": "/login/",
    "current-user": "/current-user/",
    "signup": "/users/create-user/",
    "create-station": "/stations/create-station/",
    "create-routing": "/routes/create-route/",
    "create-trip": "/trips/create-trip/",
    "add-station": (routeId)=> `/routes/add-station/${routeId}/`,
    "add-bus": (routeId) => `/routes/add-bus/${routeId}/`,
    "buses": "/buses/",
    "create-bus": "/buses/create-bus/",
    "book-seats": (tripId) => `/trips/book-seat/${tripId}`,
    "find-station": "/stations/find-station/",
    "my-trip": "/users/my-trip/",
    "blogs": "/blogs/",
    "create-blog": "/blogs/create-blog/",
    "get-blog-detail": (blogId) => `/blogs/${blogId}`,
    "get-comments": (blogId) => `/blogs/${blogId}/get-comments/`,
    "post-comment": (blogId) => `/blogs/${blogId}/post-comment/`,
    "drivers": "/users/drivers/",
    "reports": "/reports/",
    "update-report": (id) => `/reports/${id}/update-report/`,
    "create-report": '/reports/create-report/',
    "getYearRevenue": '/tickets/get-years/',
    "getRevenue": '/tickets/get-revenue/',
    "revenue-predict": '/predicts/predict-revenue/',
    "predict-spending": '/predicts/predict-spending/',
    "assistant": "/predicts/assistant/"
}

export const authApi = (accessToken) => {
    return axios.create({
        baseURL: "http://localhost:5000",
        headers:{
            'Authorization':  `Bearer ${accessToken? accessToken : cookie.load("token")}`
        }
    })
}
export default axios.create({
    baseURL: "http://localhost:5000"
})