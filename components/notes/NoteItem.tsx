import formatDateTime from '@/utils/formatDateTime'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Category from './Category'

type NoteItem = {
  title: string
  content: string
  created_at: Date
  updated_at: Date
  category_id: number
}

type NoteItemProps = {
  note: NoteItem
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header_item}>
        <Text style={styles.heading_item}>{note.title}</Text>
        <Category id={+note.category_id} />
      </View>
      <Text>{note.content}</Text>
      <Text style={styles.createdAt}>
        {note.updated_at
          ? `Đã sửa vào ${formatDateTime(note.updated_at.toString())}`
          : formatDateTime(note.created_at.toString())}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#e2e2e2',
    marginTop: 4,
    marginBottom: 4,
  },
  header_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading_item: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 8,
  },
  createdAt: {
    marginTop: 20,
    fontSize: 12,
  },
})

export default NoteItem
