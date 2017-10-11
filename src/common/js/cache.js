import storage from 'good-storage'

const SEARCH_KRY = '_search_'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '_play_'
const PLAY_MAX_LENGTH = 200

const FACORITE_KEY = '_favorite_'
const FACORITE_MAX_LENGTH = 200

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KRY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KRY, searches)
  return searches
}

export function loadSearch() {
  //获取本地存储，在state中初始化searchHistory
  return storage.get(SEARCH_KRY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KRY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KRY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KRY)
  return []
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  //获取本地存储，在state中初始化playHistory
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FACORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FACORITE_MAX_LENGTH)
  storage.set(FACORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FACORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FACORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  //获取本地存储，在state中初始化favoriteList
  return storage.get(FACORITE_KEY, [])
}
