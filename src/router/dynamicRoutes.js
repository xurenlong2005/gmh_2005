import allRoutes from "./allRoutes"
const dynamicRoutes = [
    {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: "home" */ "../pages/Home"),
        children: [...allRoutes]
    },
    {
        path: "*",
        component: () => import(/* webpackChunkName: "page404" */ "../pages/Page404"),
    }
]

export default dynamicRoutes
