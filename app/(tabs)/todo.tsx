import { View, Text, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'

const API_URL = "https://62bb-182-253-179-88.ngrok-free.app"
type SiswaProps = {
    id: string,
    nama: string,
    nis: number,
    kelas: string,
    jurusan: string
}
export default function todo() {
const [siswa, setSiswa] = useState<SiswaProps[]>([]);
const [nama, setNama] = useState('');
const [nis, setNis] = useState('');
const [kelas, setKelas] = useState('');
const [jurusan, setJurusan] = useState('');
  const getSiswa = async() => {
    try{
        const response = await axios.get(`${API_URL}/api/siswa`)
        setSiswa(response.data)
    }  catch(error){
        console.log(error)
    }
  }

  const addSiswa = async() => {
    if(!nama || !nis || !kelas || !jurusan) {
        return alert('Lengkapi data siswa')
    }
    try{
        const response = await axios.post(`${API_URL}/api/siswa`,{
            nama: nama,
            nis: Number(nis),
            kelas: kelas,
            jurusan: jurusan
        });
        console.log(response.data);
        Alert.alert('Success', 'Siswa berhasil ditambahkan');
        setNama('');
        setNis('');
        setKelas('');
        setJurusan('');
        getSiswa();
    }  catch(error){
        console.log(error)
        Alert.alert('Error', 'Gagal menambahkan siswa');
    }
  }

  useEffect(() => {
    getSiswa();
  }, [])

  return (
    <SafeAreaView>
      <Text>todo</Text>
      <TextInput placeholder='Nama' value={nama} onChangeText={(text) => setNama(text)} />
      <TextInput placeholder='NIS' value={nis} onChangeText={(text) => setNis(text)} keyboardType="numeric" />
      <TextInput placeholder='Kelas' value={kelas} onChangeText={(text) => setKelas(text)} />
      <TextInput placeholder='Jurusan' value={jurusan} onChangeText={(text) => setJurusan(text)} />
      <TouchableOpacity style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}} onPress={addSiswa}>
        <Text style={{color: 'white'}}>Tambah Siswa</Text>
      </TouchableOpacity>
      <FlatList
        data={siswa}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=>(
            <View>
                <Text>{item.nama}</Text>
                <Text>{item.nis}</Text>
                <Text>{item.kelas}</Text>
                <Text>{item.jurusan}</Text>
            </View>
        )}
      />
    </SafeAreaView>
  )
}