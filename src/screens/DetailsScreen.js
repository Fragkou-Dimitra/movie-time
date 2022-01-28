import React, {useEffect,useState} from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

const DetailsScreen = ( {navigation, route} ) => {
    console.log(route);
    const movie = route.params.movie;
    const [movieDetails,setMovieDetails]=useState(null);
    useEffect(()=>{
      const xhr=new XMLHttpRequest();
      xhr.open('GET',`http://www.omdbapi.com/?apikey=cc456efe&t=${movie.title}`);
      xhr.send();
      xhr.onload=()=>{
        if (xhr.status==200){
          let response=JSON.parse(xhr.response);
          setMovieDetails(response);
        }else{
          console.log(`HTTP Request Failed ${xhr.status}`);
        }
        
      };
      xhr.onerror=()=>{
        console.log("Error")
      };
      
    },[]);
    
    
    
    return (
      <View style={styles.mainView}>
        <Text>{movieDetails==null?"": movieDetails.Title}</Text>
        <Text>{movieDetails==null?"":movieDetails.Released}</Text>
        <Text>{movieDetails==null?"":movieDetails.Plot}</Text>
      </View>
    )
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default DetailsScreen;