import { Router } from 'express'
import PageModel from '../database/models/PageModel'
const router = Router()

router.get('/pages/:collection', async (req, res) => {
  const pages = await PageModel.findAll({ where: { collectionId: req.params.collection } })
  console.log(pages)
  return res.send(pages)
})

router.post('/pages/:collection', async (req, res) => {
  const page = await PageModel.create({ ...req.body, collectionId: req.params.collection })
  return res.send(page)
})

router.get('/pages/:collection/:id', async (req, res) => {
  return res.send({ message: 'Not implemented' })
})

router.put('/pages/:id', async (req, res) => {
  const page = await PageModel.findByPk(req.params.id)
  if (!page) return res.status(404).send({ message: 'Page not found' })
  const pageUpdated = await page.update(req.body)
  return res.send(pageUpdated)
})

router.delete('/pages/:collection/:id', async (req, res) => {
  const page = await PageModel.findByPk(req.params.id)
  if (!page) return res.status(404).send({ message: 'Page not found' })
  page.destroy()
  return res.status(204).end()
})

export default router
