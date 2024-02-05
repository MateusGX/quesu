import { Router } from 'express'
import CollectionModel from '../database/models/CollectionModel'

const router = Router()

router.get('/collections', async (req, res) => {
  const collections = await CollectionModel.findAll()
  return res.send(collections.map((collection) => collection.toJSON()))
})

router.post('/collections', async (req, res) => {
  const collection = await CollectionModel.create(req.body)
  return res.send(collection)
})

router.get('/collections/:id', async (req, res) => {
  const collection = await CollectionModel.findByPk(req.params.id)
  if (!collection) return res.status(404).send({ message: 'Collection not found' })
  return res.send(collection)
})

router.put('/collections/:id', async (req, res) => {
  const collection = await CollectionModel.findByPk(req.params.id)
  if (!collection) return res.status(404).send({ message: 'Collection not found' })
  const collectionUpdated = await collection.update(req.body)
  return res.send(collectionUpdated)
})

router.delete('/collections/:id', async (req, res) => {
  const collection = await CollectionModel.findByPk(req.params.id)
  if (!collection) return res.status(404).json({ message: 'Collection not found' })
  collection.destroy()
  return res.status(204).end()
})

export default router
