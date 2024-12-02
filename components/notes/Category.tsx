import { StyleSheet, Text, View } from 'react-native'

const Category: React.FC<{ id: number }> = ({ id }) => {
  switch (id) {
    case 1:
      return (
        <View style={styles.category_1}>
          <Text style={{ color: '#FFF' }}>Công việc</Text>
        </View>
      )
    case 2:
      return (
        <View style={styles.category_2}>
          <Text style={{ color: '#FFF' }}>Học tập</Text>
        </View>
      )
    case 3:
      return (
        <View style={styles.category_3}>
          <Text style={{ color: '#FFF' }}>Thông tin</Text>
        </View>
      )
    default:
      return
  }
}
const styles = StyleSheet.create({
  category_1: {
    fontSize: 8,
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'green',
  },
  category_2: {
    fontSize: 8,
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  category_3: {
    fontSize: 8,
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
})

export default Category
