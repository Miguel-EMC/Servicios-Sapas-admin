// import Home from "../pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "../contexts";
import { Login } from "../pages/login";
import { PublicRoute } from "./PublicRoute";
//import { PrivateRoute } from "./PrivateRouter";
import {HomeAdmin} from '../pages/Admin/HomeAdmin';
import ViewServices from '../components/formsServices/ViewServices';
import UpdateServices from '../components/formsServices/UpdateServices';
import FormServices from '../components/formsServices/FormServices';

import ViewCategories from '../components/formsCategories/ViewCategories';
import UpdateCategories from '../components/formsCategories/UpdateCategories';
import FormCategories from '../components/formsCategories/FormCategories';


import ViewSpas from '../components/formsSpas/ViewSpas';
import UpdateSpas from '../components/formsSpas/UpdateSpas';
import FormSpas from '../components/formsSpas/FormSpas';
export const AppRouter = () => {

    const user = JSON.parse(localStorage.getItem('user_info')) || {};
    const user_role = user.role;
    console.log(user_role)

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* RUTA PUBLICA */}
                    {/* <Route path='login/*' element={
                        <PublicRoute>
                            <Routes>
                                <Route path='/*' element={<Login />} />
                            </Routes>
                        </PublicRoute>
                    } /> */}

                    <Route path="/*" element={
                        // <PrivateRoute>
                            <Routes>
                                {/* {user_role === 'admin' && ( */}
                                    <>
                                        <Route index path="/homeAdmin" element={< HomeAdmin/>}/>
                                        <Route path='/services' element={< ViewServices />}></Route>
                                        <Route path='/createServices' element={< FormServices />}></Route>
                                        <Route path='/services/edit/:id' element={<UpdateServices />}></Route>

                                        <Route path='/categories' element={< ViewCategories />}></Route>
                                        <Route path='/createCategories' element={< FormCategories />}></Route>
                                        <Route path='/categories/edit/:id' element={<UpdateCategories />}></Route>

                                        <Route path='/spas' element={< ViewSpas />}></Route>
                                        <Route path='/createSpas' element={< FormSpas />}></Route>
                                        <Route path='/spas/edit/:id' element={<UpdateSpas />}></Route>

                                    </>
                                {/* )}
                                :
                                {
                                    
                                } */}
                            </Routes>
                        // </PrivateRoute>
                    } />
                </Routes>


            </BrowserRouter>
        </AuthProvider>
    )
}