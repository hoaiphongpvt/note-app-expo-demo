const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString)
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const formattedDate = date.toLocaleDateString([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  return `${time} ${formattedDate}`
}

export default formatDateTime
