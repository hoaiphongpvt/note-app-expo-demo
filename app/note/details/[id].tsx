import React, { useEffect, useState } from 'react'
import { useRouter, useGlobalSearchParams } from 'expo-router'
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getNote, updateNote } from '@/services/apiNotes'
import { Picker } from '@react-native-picker/picker'
import { getCategories } from '@/services/apiCategory'

const NoteDetails = () => {
  const { id } = useGlobalSearchParams()
  const [title, setTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('default')
  const [content, setContent] = useState('')
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(+id),
  })

  const { isLoading: isGettingCategories, data: categories } = useQuery({
    queryKey: ['categoies'],
    queryFn: getCategories,
  })

  const { isPending: isUpdating, mutate: updateNoteFn } = useMutation({
    mutationFn: updateNote,
  })

  const handleUpdate = async () => {
    if (!title || !content) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!')
      return
    }
    const currentDate = new Date()
    const timeZoneOffset = currentDate.getTimezoneOffset()
    const localDateTime = new Date(
      currentDate.getTime() - timeZoneOffset * 60000
    )
    const data = {
      id: +id,
      title,
      category_id: +selectedCategory,
      content,
      updated_at: localDateTime,
    }
    await updateNoteFn(data, {
      onSuccess: () => {
        Alert.alert('Thành công', 'Cập nhật ghi chú thành công!')
        queryClient.invalidateQueries({ queryKey: ['notes'] })
        router.back()
      },
      onError: (error) => {
        Alert.alert('Thất bại', 'Có lỗi khi cập nhật ghi chú!')
      },
    })
  }

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setSelectedCategory(note.category_id)
      setContent(note.content)
    }
  }, [note])

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <>
          <Text style={styles.heading}>Thông tin ghi chú</Text>
          <View style={styles.form}>
            <View style={styles.group}>
              <Text style={styles.label}>Tiêu đề</Text>
              <TextInput
                style={styles.input}
                placeholder='Nhập tiêu đề...'
                placeholderTextColor='#999'
                defaultValue={note.title}
                value={title}
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
                defaultValue={note.content}
                value={content}
                placeholder='Nhập nội dung...'
                placeholderTextColor='#999'
                onChangeText={(text) => setContent(text)}
              />
            </View>
            <View style={styles.btn_group}>
              <Button
                title='Trở lại'
                color='grey'
                onPress={() => router.back()}
              />
              <Button
                title={isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
                onPress={handleUpdate}
              />
            </View>
          </View>
        </>
      )}
    </View>
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
  btn_group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default NoteDetails
