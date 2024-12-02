import { StyleSheet, View, Text } from 'react-native'
import NotesList from '@/components/notes/NotesList'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <NotesList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
})
