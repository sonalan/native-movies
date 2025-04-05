import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
//import { useRoute } from '@react-navigation/native'
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from '@/services/useFetch'
import { fetchMovie } from '@/services/tmdb.api'
import { icons } from '@/constants/icons';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5 p-4">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2 ">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { 
    data: movie ,
    loading, 
    error,  

  } = useFetch(() => fetchMovie({
    id: id
  }));
  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        
        {loading
          ? <Text>Loading...</Text>
          : error? <Text>Error</Text>
          : (
            <>
              <View>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                  }}
                  className="w-full h-[550px]"
                  resizeMode="stretch"
                />
              </View>
              <View className="flex-col items-start justify-center mt-5 px-5">
                <Text className="text-white font-bold text-xl">{movie?.title}</Text>
              </View>
              <MovieInfo label="Overview" value={movie?.overview} />
              <MovieInfo
                label="Genres"
                value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
              />
              <View className="flex flex-row justify-between w-1/2">
                <MovieInfo
                  label="Budget"
                  value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
                />
                <MovieInfo
                  label="Revenue"
                  value={`$${Math.round(
                    (movie?.revenue ?? 0) / 1_000_000
                  )} million`}
                />
              </View>
              <MovieInfo
                label="Production Companies"
                value={
                  movie?.production_companies?.map((c) => c.name).join(" • ") ||
                  "N/A"
                }
              />
            </>
          )
        }
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails
