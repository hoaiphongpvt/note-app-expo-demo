import { deleteNote, getNotes } from '@/services/apiNotes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import NoteItem from './NoteItem'
import { useRouter } from 'expo-router'
import { IconSymbol } from '../ui/IconSymbol'
import { useDebounce } from '@/hooks/useDebounce'

const NotesList = () => {
  const queryClient = useQueryClient()
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 300)
  const { isLoading, error, data } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })
  const { isPending: isDeleting, mutate: deleteNoteFn } = useMutation({
    mutationFn: deleteNote,
  })

  const router = useRouter()

  const handleDelete = (id: number) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa ghi chú này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () =>
            deleteNoteFn(id, {
              onSuccess: () => {
                Alert.alert('Thành công', 'Đã xóa ghi chú thành công.')
                queryClient.invalidateQueries({ queryKey: ['notes'] })
              },
              onError: () => {
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa ghi chú.')
              },
            }),
        },
      ],
      { cancelable: true }
    )
  }

  const handleClearSearch = () => {
    setSearchText('')
  }

  const filteredNotes = data?.filter((note) =>
    note.title.toLowerCase().includes(debouncedSearchText.toLowerCase())
  )
  return (
    <View style={styles.container}>
      {(isLoading || isDeleting) && <ActivityIndicator size='large' />}
      {!isLoading && !error && data && (
        <>
          <Text style={styles.heading}>Ghi chú</Text>
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder='Tìm kiếm ghi chú...'
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText && (
              <TouchableOpacity
                style={styles.close}
                onPress={handleClearSearch}
              >
                <IconSymbol size={28} name='close.fill' color='black' />
              </TouchableOpacity>
            )}
          </View>
          {!filteredNotes?.length ? (
            <View>
              <Text style={{ textAlign: 'center' }}>
                Không có ghi chú nào phù hợp.
              </Text>
            </View>
          ) : (
            <>
              <ScrollView style={styles.listNotes}>
                {filteredNotes.map((note) => (
                  <TouchableOpacity
                    key={note.id}
                    onPress={() => router.push(`/note/details/${note.id}`)}
                    onLongPress={() => handleDelete(note.id)}
                  >
                    <NoteItem note={note} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  listNotes: {
    width: '100%',
  },
  searchInput: {
    width: '100%',
    marginBottom: 10,
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  close: {
    position: 'absolute',
    right: 4,
    top: 8,
  },
})

export default NotesList
