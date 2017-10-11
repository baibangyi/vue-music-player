import storage from 'good-storage'

const SEARCH_KRY = '_search_'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '_play_'
const PLAY_MAX_LENGTH = 200

const FACORITE_KEY = '_favorite_'
const FACORITE_MAX_LENGTH = 200

function insertArray(arr, val, compare, maxLen) {
  //定义在某一数组中插入数组项的方法在插入歌曲时调用
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
  //定义在某一数组中删除数组项的方法在删除歌曲时调用
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  //本地存储搜索历史的方法，在actions调用
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
  //清空所有历史的方法
  storage.remove(SEARCH_KRY)
  return []
}

export function savePlay(song) {
  //本地存储最近播放列表的方法，在actions调用
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
  //本地存储收藏列表的方法，在actions调用
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
