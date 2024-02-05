import { Router } from 'express'
import collectionRoutes from './collection'
import pageRoutes from './page'

const router = Router()

router.use(collectionRoutes)
router.use(pageRoutes)

export default router
