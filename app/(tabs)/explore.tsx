import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import tw from 'twrnc';

type NewsArticle = {
  title: any;
  description: string;
  url: string;
  urlToImage: string;
  author: string;
}

export default function explore() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  const getNews = async () =>{
    try{
      const response = await axios.get('https://newsapi.org/v2/top-headlines?q=trump&apiKey=b67226388eca4095844c27e34188bd4b')
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <View>
      <Text>Halaman Berita</Text>
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={({item}) =>(
            <View>
              <Image source={{uri: item.urlToImage}} style={tw`w-full h-40 object-cover`}/>
              <Text>{item.title}</Text>
              <Text>{item.author}</Text>
              <Text>{item.description}</Text>
              <Text>{item.url}</Text>

            </View>
          )}
        />      
    </View>
  )
}