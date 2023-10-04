const API_KEY = 'live_vfEPLjp6cYRzdgnjKbRqdLT9gJV1qTiksiSaLsCjbXbm9T6gh5WAYNCXCpaycsYF';
const BASE_URL = 'https://api.thecatapi.com/v1';


export const httpRequest = () => {
   const headers = {
      "Content-Type": "application/json",
      'x-api-key': API_KEY,
  }
   const getImages = async (limit, breed, order) => {
      const breedId = breed === 'all' ? '' : breed;
      const url = `${BASE_URL}/images/search?limit=${limit}&has_breeds=1&breed_ids=${breedId}&order=${order}`;
      const options = {
         method: 'GET', 
         headers
      }

      const res = await fetch(url, options)
      if (res.ok) {
         return await res.json()
      } else {
         throw new Error('Request was rejected')
      }
   }
   const getBreeds = async () => {
      const res = await fetch(`${BASE_URL}/breeds`);
      if (res.ok) {
         return await res.json()
      } else {
         throw new Error('Request was rejected')
      }
   }

   const getBreedData = async (id) => {
      const url = `${BASE_URL}/images/search?limit=5&has_breeds=1&breed_ids=${id}`;
      const options = {
         method: 'GET', 
         headers
      }
      const res = await fetch(url, options)
      if (res.ok) {
         return await res.json();
      } else {
         throw new Error('Request was rejected')
      }
   }

   const postFavourite = async (body) => {
      const url = `${BASE_URL}/favourites`;
      const options = {
         method: 'POST',
         headers,
         body: JSON.stringify(body),
      }
      const res = await fetch(url, options);
      if (res.ok) {
         return await res.json();
      } else {
         throw new Error('Request was rejected')
      }
   }

   const getFavourite = async () => {
      const url = `${BASE_URL}/favourites`;
      const options = {
         method: 'GET', 
         headers
      }
      const res = await fetch(url, options);
      if (res.ok) {
         return await res.json();
      } else {
         throw new Error('Request was rejected')
      }
   }

   const deleteFavourite = async (favouriteId) => {
      const url = `${BASE_URL}/favourites/${favouriteId}`;
      const options = {
         method: 'DELETE', 
         headers
      }
      const res = await fetch(url, options);
   }

   const postVote = async (body) => {
      const url = `${BASE_URL}/votes`;
      const options = {
         method: 'POST',
         headers,
         body: JSON.stringify(body),
      }
      const res = await fetch(url, options)
   }
   const getVote = async () => {
      const url = `${BASE_URL}/votes`;
      const options = {
         method: 'GET', 
         headers
      }
      const res = await fetch(url, options);
      if (res.ok) {
         return await res.json();
      } else {
         throw new Error('Request was rejected')
      }
   }

   const postPhoto = async (file) => {
      const url = `${BASE_URL}/images/upload`;
      const formData = new FormData();
      formData.append('file', file);
      const options = {
         method: 'POST',
         headers:{
         // "Content-Type": "multipart/form-data",
         'x-api-key': API_KEY,
         },
         body: formData,
         redirect: 'follow',
     }
     const res = await fetch(url, options);
     if (res.ok) {
        return await res.json();
     } else {
        throw new Error('Request was rejected')
     }
   }


   return {
      getImages,
      getBreeds,
      getBreedData,
      postFavourite,
      getFavourite,
      deleteFavourite,
      postVote,
      getVote,
      postPhoto,
   }
} 
