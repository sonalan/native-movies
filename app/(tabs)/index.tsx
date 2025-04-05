import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { View, Image, Text, ScrollView, ActivityIndicator, FlatList } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/tmdb.api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const { 
    data : movies,
    loading: moviesLoading, 
    error: moviesError,  

  } = useFetch(() => fetchMovies({
    keyword: ''
  }));

  return (
    <View className="flex-1 bg-primary" >
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />
          {moviesLoading ? (
            <ActivityIndicator 
              size="large"
              color="#fff"
            />
          ): moviesError ? (
            <Text className="text-white">{moviesError?.message}</Text>
          ) : (
            <>
              <Text className="text-white text-lg font-bold mt-10 border-b-orange-700 border-b-4">Popular Movies</Text>
              <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                className="mt-5 pd-32"
                columnWrapperStyle={{ 
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10

                }}
                renderItem={({ item }) => (
                  <MovieCard {... item} />
                )}
              />
            </>
          ) 
          }
        </View>
      </ScrollView>
    </View>
  );
}
