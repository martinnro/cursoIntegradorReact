import { Navigate, useRoutes } from 'react-router-dom';
import Layout from "./layouts/Layout";
import Home from './home/home';


const Routes = () => {
    return useRoutes([
        {
        path: '/',
        element: <Layout />,
        children: [
            { path: '', element: <Home /> }
        ]
    },
    ])
}


export default Routes;