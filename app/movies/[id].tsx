import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import useFetch from '@/services/useFetch'
import { fetchMovie } from '@/services/tmdb.api'


const MovieDetails = () => {
  const route = useRoute()
  const { id } = route.params;
  const { 
    data: movie ,
    loading, 
    error,  

  } = useFetch(() => fetchMovie({
    id: id
  }));
  return (
    <View>
      {loading
        ? <Text>Loading...</Text>
        : error? <Text>Error</Text>
        : <Text>{movie?.title}</Text>
      }
    </View>
  )
}

export default MovieDetails
