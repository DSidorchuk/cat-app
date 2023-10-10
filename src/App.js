import { Routes, Route } from 'react-router-dom';
import MediaQuery from "react-responsive";

import { Home } from './pages/Home';
import { Breeds } from './pages/Breeds';
import { Layout } from './components/Layout';
import { Content } from './components/Content';
import { BreedData } from './pages/BreedData';
import { Voting } from './pages/Voting';
import { Search } from './pages/Search';
import { Likes } from './pages/Likes';
import { Favourites } from './pages/Favourites';
import { Gallery } from './pages/Gallery';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='content' element={<Content/>}>
          <Route path='breeds' element={<Breeds/>}/>
          <Route path='breeds/:breedId' element={<BreedData/>}/>
          <Route path='voting' element={<Voting/>}/>
          <Route path='search/:breed' element={<Search/>}/>
          <Route path='likes' element={<Likes rate={1}/>}/>
          <Route path='dislikes' element={<Likes rate={-1}/>}/>
          <Route path='favourites' element={<Favourites/>}/> 
          <Route path='gallery' element={<Gallery/>}/> 
        </Route>
      </Route>
    </Routes> 
  );
}

export default App;
