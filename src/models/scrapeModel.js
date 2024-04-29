const axios = require('axios')
const { JSDOM } = require('jsdom')

async function scrapeModel(keyWord) {
  try {
    const url = `https://www.amazon.com.br/s?k=${keyWord}`
    const scrapedData = []

    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    })

    const htmlContent = response.data
    const dom = new JSDOM(htmlContent)
    const products = dom.window.document.querySelectorAll(
      '.puis-card-container'
    )

    products.forEach((product) => {
      const title = product.querySelector('.a-size-mini')?.textContent.trim()
      const rating = product.querySelector('.a-icon-alt')?.textContent.trim()
      const reviews = product.querySelector('.a-size-base')?.textContent.trim()
      const imgUrl = product.querySelector('.s-image')?.getAttribute('src')

      scrapedData.push({
        title,
        imgUrl,
        rating,
        reviews,
      })
    })

    return scrapedData
  } catch (error) {
    console.log('erro no model:', error)
    throw new Error('Erro ao acessar dados da Amazon')
  }
}

module.exports = {
  scrapeModel,
}
