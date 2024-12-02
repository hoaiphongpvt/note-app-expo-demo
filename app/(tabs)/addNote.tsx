import { getCategories } from '@/services/apiCategory'
import { createNote } from '@/services/apiNotes'
import { Picker } from '@react-native-picker/picker'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native'

const AddNote = () => {
  const [title, setTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('default')
  const [content, setContent] = useState('')

  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: addNewNote, isPending: isCreating } = useMutation({
    mutationFn: createNote,
  })

  const {
    isLoading,
    error,
    data: categories,
  } = useQuery({
    queryKey: ['categoies'],
    queryFn: getCategories,
  })

  const reset = () => {
    setTitle('')
    setContent('')
    setSelectedCategory('default')
  }

  const handleSave = async () => {
    if (!title || !content) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!')
      return
    }
    const newNote = {
      title,
      content,
      category_id: +selectedCategory,
    }
    await addNewNote(newNote, {
      onSuccess: () => {
        reset()
        Alert.alert('Thành công', 'Lưu ghi chú thành công!')
        queryClient.invalidateQueries({ queryKey: ['notes'] })
        router.back()
      },
      onError: () => {
        Alert.alert('Lỗi', 'Có lỗi xảy ra!')
      },
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <>
          <Text style={styles.heading}>Thêm ghi chú mới</Text>
          <View style={styles.form}>
            <View style={styles.group}>
              <Text style={styles.label}>Tiêu đề</Text>
              <TextInput
                style={styles.input}
                placeholder='Nhập tiêu đề...'
                placeholderTextColor='#999'
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>Loại ghi chú</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label='Chọn loại ghi chú' value='default' />
                  {categories?.map((category) => (
                    <Picker.Item
                      key={category.id}
                      label={category.name}
                      value={category.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>Nội dung</Text>
              <TextInput
                multiline={true}
                style={styles.textarea}
                placeholder='Nhập nội dung...'
                placeholderTextColor='#999'
                onChangeText={(text) => setContent(text)}
              />
            </View>
            <View style={styles.group}>
              <Button
                title={isCreating ? 'Đang lưu...' : 'Lưu'}
                onPress={handleSave}
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  form: {
    width: '100%',
  },
  group: {
    marginBottom: 16,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    color: '#555',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textarea: {
    width: '100%',
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
  },
})

export default AddNote
