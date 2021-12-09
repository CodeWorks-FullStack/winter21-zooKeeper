let animals = {
  sloth: {
    health: 100,
    img: 'https://m.media-amazon.com/images/I/41DWsv+wv6L._AC_.jpg'
  },
  tiger: {
    health: 100,
    img: 'https://cdn.pixabay.com/photo/2014/04/03/00/35/tiger-308768_1280.png'
  },
  giraffe: {
    health: 100,
    img: 'http://clipart.9file.net/770ddeaed8e20e0b205be28ee31cdd9e/cliparts/3089/medium/c17a7f4d570d1313e7293a425e1c2fc5.png'
  },
  monkey: {
    health: 100,
    img: 'https://i5.walmartimages.com/asr/a89e5b2b-35bc-4384-8af9-7cee1851b4ef_1.72eb439ea11073cf1aea6b8d685e5386.jpeg'
  },
  elephant: {
    health: 100,
    img: 'https://i.pinimg.com/originals/a5/ee/70/a5ee7008b6a46e5cd548d591cc2a0d80.png'
  },
  chicken: {
    health: 100,
    img: 'https://i.ytimg.com/vi/NXBw-eYZ5EQ/maxresdefault.jpg'
  },
  joeExotic: {
    health: 100,
    img: 'https://ih1.redbubble.net/image.1143067809.6903/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u2.jpg'
  }
}

let deaths = 0
let money = 50

function drawAllAnimals() {
  let template = ''
  for (const key in animals) {
    const animal = animals[key]
    template += /*html*/ `
    <div class="col-md-2 user-select-none" id="${key}">
      <div class="row">
        <h6 class="text-center">${key}</h6>
        <div class="col-12 text-center">
          <img src="${animal.img}" class="img-fluid" alt="">
        </div>
        <div class="col-12 py-3">
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${animal.health}%;" aria-valuenow="${animal.health}" aria-valuemin="0"
              aria-valuemax="100" id="${key}-health">
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="d-grid gap-2">
            <button class="btn btn-success" id="${key}-button" onclick="feed('${key}')">Feed</button>
          </div>
        </div>
     </div>
    </div>
    `
  }
  document.getElementById('animals').innerHTML = template
}

function feed(animalKey) {
  const animal = animals[animalKey]
  if (animal.health < 100 && animal.health > 0) {
    animal.health += Math.floor(Math.random() * 10)
  }
  drawAnimalHealth(animalKey)
}

function drawAnimalHealth(animalKey) {
  document.getElementById(`${animalKey}-health`).style = `width: ${animals[animalKey].health}%`
  if (animals[animalKey].health <= 0) {
    deaths++
    document.getElementById(animalKey).classList.add('border', 'border-danger')
    document.getElementById(animalKey + '-button').disabled = true
    if (deaths == 5) {
      playAudio()
    }
  }
}

function drawMoney() {
  document.getElementById('money').innerText = money
}

function decreaseHealth() {
  // remember that the 'key' is how we are accessing each individual object
  for (const key in animals) {
    if (animals[key].health >= 0) {
      animals[key].health -= Math.floor(Math.random() * 10)
      drawAnimalHealth(key)
    }
  }
}

function startInterval() {
  setInterval(decreaseHealth, 1000)
}

function makeMoney() {
  for (const key in animals) {
    const animal = animals[key];
    if (animal.health > 0) {
      money++
    }
  }
  drawMoney()
}

function moneyInterval() {
  setInterval(makeMoney, 5000)
}

function playAudio() {
  let clipToPlay = document.getElementById('spree')
  clipToPlay.play()
}

drawAllAnimals()
startInterval()
moneyInterval()
drawMoney()

// NOTE old repetitive method
// function feedSloth() {
//   console.log('feed sloth', animals.sloth.health)
// }

// function feedTiger() {
//   if (animals.tiger.health < 100 && animals.tiger.health > 0) {
//     animals.tiger.health += Math.floor(Math.random() * 10)
//   }
//   document.getElementById('tiger-health').style = `width: ${animals.tiger.health}%`
//   console.log('feed tiger', animals.tiger.health)
// }
// function feedGiraffe() {
//   if (animals.giraffe.health < 100 && animals.giraffe.health > 0) {
//     animals.giraffe.health += Math.floor(Math.random() * 10)
//   }
//   document.getElementById('giraffe-health').style = `width: ${animals.giraffe.health}%`
//   console.log('feed Giraffe', animals.giraffe.health)
// }
