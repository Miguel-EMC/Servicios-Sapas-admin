import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "../contexts";
import { Login } from "../pages/login";
import { PublicRoute } from "./PublicRoute";
import { HomeAdmin } from '../pages/Admin/HomeAdmin';
import { HomePersonalSpa } from '../pages/PersonalSpa/HomePersonalSpa';

import ViewServices from '../components/formsServices/ViewServices';
import UpdateServices from '../components/formsServices/UpdateServices';
import FormServices from '../components/formsServices/FormServices';

import ViewCategories from '../components/formsCategories/ViewCategories';
import UpdateCategories from '../components/formsCategories/UpdateCategories';
import FormCategories from '../components/formsCategories/FormCategories';


import ViewSpas from '../components/formsSpas/ViewSpas';
import UpdateSpas from '../components/formsSpas/UpdateSpas';
import FormSpas from '../components/formsSpas/FormSpas';


import ViewUsers from '../components/formsUsers/ViewUsers';
import UpdateUsers from '../components/formsUsers/UpdateUsers';
import FormUsers from '../components/formsUsers/FormUsers';

import ViewSpaServices from '../components/SpasServices/ViewSpaServices';
import UpdateSpaServices from '../components/SpasServices/UpdateSpaServices';
import FormSpaServices from '../components/SpasServices/FormSpaServices';
export const AppRouter = () => {

    const user = JSON.parse(localStorage.getItem('user')) || {};
    const user_role = user.role;
    console.log(user_role)

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* RUTA PUBLICA */}
                    <Route path='login/*' element={
                        <PublicRoute>
                            <Routes>
                                <Route path='/*' element={<Login />} />
                            </Routes>
                        </PublicRoute>
                    } />

                    <Route path="/*" element={
                        <Routes>
                            {user_role === 'admin' && (
                                <>
                                    <Route index path="/homeAdmin" element={< HomeAdmin />} />
                                    <Route path='/services' element={< ViewServices />}></Route>
                                    <Route path='/createServices' element={< FormServices />}></Route>
                                    <Route path='/services/edit/:id' element={<UpdateServices />}></Route>

                                    <Route path='/categories' element={< ViewCategories />}></Route>
                                    <Route path='/createCategories' element={< FormCategories />}></Route>
                                    <Route path='/categories/edit/:id' element={<UpdateCategories />}></Route>

                                    <Route path='/spas' element={< ViewSpas />}></Route>
                                    <Route path='/createSpas' element={< FormSpas />}></Route>
                                    <Route path='/spas/edit/:id' element={<UpdateSpas />}></Route>

                                    <Route path='/users' element={< ViewUsers />}></Route>
                                    <Route path='/createUsers' element={< FormUsers />}></Route>
                                    <Route path='/users/edit/:id' element={<UpdateUsers />}></Route>                                    </>
                            )}
                            {
                                user_role === 'personal_spa' && (
                                    <>
                                        <Route index path="/home" element={< HomePersonalSpa />} />
                                        <Route path='/servicesSpa' element={< ViewSpaServices />}></Route>
                                        <Route path='/createServicesSpa' element={< FormSpaServices />}></Route>
                                        <Route path='/servicesSpa/edit/:id' element={<UpdateSpaServices />}></Route>
                                    </>
                            )}
                        </Routes>
                    } />
                </Routes>


            </BrowserRouter>
        </AuthProvider>
    )
}