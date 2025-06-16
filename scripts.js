/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "startpage"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"i8Y7hZYbw6wPRWSp","label":"social","bookmarks":[{"id":"M0GsWXV2Fw7jze0I","label":"youtube","url":"https://www.youtube.com/"},{"id":"2qlwIKpfGxI1pvcR","label":"tumblr","url":"https://www.tumblr.com/"},{"id":"IaP3uaSkOPVwoykR","label":"spacehey","url":"https://spacehey.com/"}]},{"id":"Z84ZCdDVLXBKuwlT","label":"games","bookmarks":[{"id":"t5FnvBTJpGRXxPZl","label":"pgr","url":"https://grayravens.com/"},{"id":"eUPWERzWWPD8Sgam","label":"wuwa","url":"https://wutheringlab.com/"},{"id":"bGM0SVVYodtVpsdX","label":"sdv","url":"https://stardewvalleywiki.com/"}]},{"id":"FJK9IvhQe5iDzWKo","label":"animanga","bookmarks":[{"id":"2t885yWUSCuaQtal","label":"MAL","url":"https://myanimelist.net/"},{"id":"kvIQV8GzWUnE5n35","label":"mangadex","url":"https://mangadex.org/"},{"id":"4mH76an3qMKPQdz8","label":"aniphane","url":"https://animepahe.ru/"}]},{"id":"GuLn1nIDP2EJTaNV","label":"general","bookmarks":[{"id":"rUmuphDcc89K9HNU","label":"torrents","url":"https://nyaa.si/"},{"id":"uIu5sXPUTJcIURcl","label":"bash bible","url":"https://github.com/dylanaraps/pure-bash-bible"},{"id":"aeXfZL9KM7VI3iNP","label":"neocities","url":"https://neocities.org/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
