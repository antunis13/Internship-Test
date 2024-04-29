const ScrapeModel = require('../models/scrapeModel')

async function get(req, res) {
  try {
    const keyWord = req.query.k
    console.log('palavra recebida:', keyWord)
    const scrapedData = await ScrapeModel.scrapeModel(keyWord)

    console.log('dados retornados do modelo:', scrapedData)

    res.json(scrapedData)
  } catch (error) {
    console.log('erro no controller: ', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
}

module.exports = {
  get,
}
