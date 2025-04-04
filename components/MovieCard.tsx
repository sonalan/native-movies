import { Link, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MovieCard = ({
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image
                source={{ uri: poster_path 
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}` 
                    : 'https://palceholder.com/600x400/1a1a1a/ffffff.png'
                }}
                className='w-full h-53 rounded-lg'
                resizeMode='cover'
            />
            <Text className='text-white text-sm text-bold mt-2'>{title}</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard