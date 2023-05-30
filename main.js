let API_KEY = 'AIzaSyCXSGYpfRCot4RTLtUDkCpHrKF52c1_fjA'
let VIDEO_LIST = 'https://www.googleapis.com/youtube/v3/videos?'
let CHANNELS = 'https://www.googleapis.com/youtube/v3/channels?'

const videoCardList = document.querySelector('.video__list')
const nextButton = document.querySelector('.container__btn-next')

fetch(VIDEO_LIST + new URLSearchParams({

    key: API_KEY,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 10,
    regionCode: 'RU'
}))
    .then(r => r.json())
    .then(data => {

        data.items.forEach(item => {
            getIcon(item)
        })
    })
    .catch(err => console.log(err))


const getIcon = (video_data) => {

    fetch(CHANNELS + new URLSearchParams({

        key: API_KEY,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(r => r.json())
        .then(data => {

            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url
            makeVideoCard(video_data)
        })

}

const makeVideoCard = (data) => {

    videoCardList.innerHTML += `

                  <div class="video__list-item" onclick="location.href = 'https://www.youtube.com/watch?v=${data.id}'">
                    <img class="item__content-thumbnail" src="${data.snippet.thumbnails.high.url}" alt="">
                        <div class="list__item-content">
                          
                                <div class="item__content-info">
                                    <h4 class="item__content-title">${data.snippet.title}</h4>
                                     <p class="item__content-name">${data.snippet.channelTitle}</p>  
                                     <img class="item__content-icon" src="${data.channelThumbnail}" alt="">
                                </div>
                        </div>
                  </div>
    `
}


const searchInput = document.querySelector('.search__box-input')
const searchBtn = document.querySelector('.search__box-btn')

let SEARCH_LINK = 'https://www.youtube.com/results?search_query='

searchBtn.addEventListener('click', () => {

    if (searchInput.value.length) {

        location.href = SEARCH_LINK + searchInput.value
    }
})

nextButton.addEventListener('click', () => {

    fetch(VIDEO_LIST + new URLSearchParams({

        key: API_KEY,
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 10,
        regionCode: 'RU'
    }))
})


