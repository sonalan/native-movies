import { ActivityIndicator, FlatList, Image, Text, View,  NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/tmdb.api'
import { icons } from '@/constants/icons'
import { SearchBar } from 'react-native-screens'

const Search = () => {
  // const route = useRoute();
  // const keyWord = route.params?.keyword;
  const [searchKeyword, setSearchKeyword] = useState('');
  const { 
    data : movies,
    loading, 
    error,  
    refetch: loadMovies,
    reset

  } = useFetch(() => fetchMovies({
    keyword: searchKeyword,
  }), false);

  const handleSearch = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const text = (e as any).nativeEvent.text || '';
    setSearchKeyword(text);
  }
  
  useEffect(() => {
    const func = async () => {
      if(searchKeyword.trim()){
        await loadMovies();
      }else{
         reset();
      }
    }
    func();
  }, [searchKeyword])

  return (
    <View
        className="flex-1 bg-primary"
    >
      <Image 
        source={images.bg} 
        className="absolute w-full z-0" 
        resizeMode="cover"
      
      />
      <FlatList 
        data={movies}
        numColumns={3}
        className="mt-5 pd-32"
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ 
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10

        }}
        renderItem={({item}) => <MovieCard {... item} />}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchKeyword}
                onChangeText={handleSearch}     
              />
            </View>
            
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
          </>
        }
      
      />

    </View>
  )
}

export default Search