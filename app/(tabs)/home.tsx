import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type UserProps ={
  name : string,
  url : string
  title : string,
  id : number
  thumbnailUrl : string
}

export default function home() {
  const [user, setUser] = useState<UserProps[]>([]);
  const getUsers = async() => {
    try{
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      setUser(response.data)
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() =>{
    getUsers()
  }, []);

  return (
    <View>
      <Text>home</Text>
      <FlatList
        data={user}
        keyExtractor={(item) => item.url}
        renderItem={({item})=>(
          <View>
            <Text style={{color:'red'}}>{item.title}</Text>
            <Text style={{color:'red'}}>{item.url}</Text>
            <Text style={{color:'red'}}>{item.thumbnailUrl}</Text>
          </View>
        )}
      />
    </View>
  )
}