import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "../../containers/Welcome";
import { CreateDate } from "../../views/private/dates/CreateDate";
import { ListDate } from "../../views/private/dates/ListDate";
import { CurrentProfile } from "../../views/private/profiles/CurrentProfile";
import { NewProfile } from "../../views/private/profiles/NewProfile";
import { ProfileAdmin } from "../../views/private/profiles/ProfileAdmin";
import { ProfileListed } from "../../views/private/profiles/ProfileListed";
import { About } from "../../views/private/users/About";
import { AdminUser } from "../../views/private/users/AdminUser";
import { CreateUser } from "../../views/private/users/CreateUser";
import { CurrentUser } from "../../views/private/users/CurrentUser";
import { DetailsUser } from "../../views/private/users/DetailsUser";
import { ListUser } from "../../views/private/users/ListUser";
import { AdminVehicle } from "../../views/private/vehicles/AdminVehicle";
import { CreateVehicle } from "../../views/private/vehicles/CreateVehicle";
import { ListVehicles } from "../../views/private/vehicles/ListVehicles";
import { DontFound } from "../../views/shared/DontFound";

const LazyAbout = lazy(() => import("../../views/private/users/About").then(() => ({ default: About })) );
const LazyWelcome = lazy(() => import("../../containers/Welcome").then(() => ({ default: Welcome, })) );
const LazyDontFound = lazy(() => import("../../views/shared/DontFound").then(() => ({ default: DontFound })) );

const LazyProfileList = lazy(() => import("../../views/private/profiles/ProfileListed").then(() => ({ default: ProfileListed })) );
const LazyNewProfile = lazy(() => import("../../views/private/profiles/NewProfile").then(() => ({ default: NewProfile, })) );
const LazyProfileAdmin = lazy(() => import("../../views/private/profiles/ProfileAdmin").then(() => ({ default: ProfileAdmin })) );
const LazyCurrentProfile = lazy(() => import("../../views/private/profiles/CurrentProfile").then(() => ({ default: CurrentProfile })) );

const LazyListUser = lazy(() => import("../../views/private/users/ListUser").then(() => ({ default: ListUser })) );
const LazyCreateUser = lazy(() => import("../../views/private/users/CreateUser").then(() => ({ default: CreateUser })) );
const LazyUserDetails = lazy(() => import("../../views/private/users/DetailsUser").then(() => ({ default: DetailsUser })) );
const LazyAdminUser = lazy(() => import("../../views/private/users/AdminUser").then(() => ({ default: AdminUser })) );
const LazyCurrentUser = lazy(() => import("../../views/private/users/CurrentUser").then(() => ({ default: CurrentUser })) );

const LazyCreateDate = lazy(() => import("../../views/private/dates/CreateDate").then(() => ({ default: CreateDate })) );
const LazyListDate = lazy(() => import("../../views/private/dates/ListDate").then(() => ({ default: ListDate })) );


const LazyListVec = lazy(() => import("../../views/private/vehicles/ListVehicles").then(() => ({ default: ListVehicles })) );
const LazyCreateVec = lazy(() => import("../../views/private/vehicles/CreateVehicle").then(() => ({ default: CreateVehicle })) );
const LazyAdminVec = lazy(() => import("../../views/private/vehicles/AdminVehicle").then(() => ({ default: AdminVehicle })) );






export const RuteoHome = () => {
  return (
    //To manage all routes or the complete routes
    <Routes>
      <Route path="/" element={<LazyWelcome />} />
      <Route path="/about" element={<LazyAbout />} />
      <Route path="/addprofile" element={<LazyNewProfile />} />
      <Route path="/listprofiles" element={<LazyProfileList />} />
      <Route path="/admprofile" element={<LazyProfileAdmin />} />


      <Route path="/updateprofile/:id" element={<LazyCurrentProfile />} />

        <Route path="/listusers" element={<LazyListUser />} />
        <Route path="/adduser" element={<LazyCreateUser />} />
        <Route path="/detailuser/:id" element={<LazyUserDetails />} />
        <Route path="/admuser" element={<LazyAdminUser />} />
        <Route path="/updateuser/:id" element={<LazyCurrentUser />} />

        <Route path="/addma" element={<LazyCreateDate />} />
        <Route path="/listma" element={<LazyListDate />} />

        <Route path="/admvec" element={<LazyAdminVec />} />
        <Route path="/addvec" element={<LazyCreateVec />} />

        <Route path="/listvec" element={<LazyListVec />} />


      
      <Route path="/*" element={<LazyDontFound />} />
    </Routes>
  );
};
