import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import UpdateProfile from './pages/UpdateProfile';
import Listing from './pages/Listing';
import SearchListings from './components/SearchListings';
import SearchResults from './pages/SearchResults';

export default function App() {
  return (
  <BrowserRouter>
  <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>

      <Route path="/sign-in" element={<SignIn />}/>

      <Route path="/sign-up" element={<SignUp />}/>

      <Route path='/about' element={<About />}/>
       
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />}/>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path='/update-profile/:userID' element={<UpdateProfile />}/>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path='/create-listing' element={<CreateListing />}/>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path='/update-listing/:listingID' element={<UpdateListing />}/>
      </Route>

      <Route path='/listing/:listingID' element={<Listing />}/>

      <Route path='/search' element={<SearchListings />}/>

      <Route path='/results' element={<SearchResults />}/>

    </Routes>
  </BrowserRouter>)
  
}
