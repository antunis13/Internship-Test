const button = document.querySelector('.submit')

const elements = {
  divProductList: document.getElementById('productList'),
  divProduct: document.querySelectorAll('.product'),
  spanError: document.querySelector('span'),
}

const validateForm = (keyWord) => {
  if (!keyWord) {
    elements.spanError.classList.add('error')
    return
  } else {
    elements.spanError.classList.remove('error')
    setTimeout(() => {
      elements.divProductList.classList.add('show')
    }, 1000)

    setTimeout(() => {
      elements.divProduct.classList.add('show')
    }, 4000)
  }
}

button.onclick = function (e) {
  e.preventDefault()
  const keyWord = document.forms['form']['keyWord'].value
  const apiUrl = `http://localhost:8080/api/scrape?k=${keyWord}`

  const xhr = new XMLHttpRequest()
  xhr.open('GET', apiUrl, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText)

      console.log('dados:', response)

      if (response.message) {
        elements.divProductList.innerHTML = `<p>Nenhum resultado encontrado para "${keyWord}".</p>`
      } else {
        const products = response
          .map(
            (product) => `
            <div class="product">
            <img src="${product.imgUrl}" alt="" class="imgUrl" />
            <p class="title"> ${product.title}</p>
            <p class="rating">${product.rating}</p>
            <p class="viewNumbers">${product.reviews} avaliações</p>
            </div>  
          `
          )
          .join('')
        elements.divProductList.innerHTML = products
      }
    } else {
      console.log('erro na requisicao: ', xhr.status)
    }
  }
  xhr.send()
  validateForm(keyWord)
}
