import { Router } from 'express';
import DirController from './dirController';

const router = Router();
const dirController = new DirController();

// Define routes
router.get('/', dirController.getAllDir);
router.post('/', dirController.createDirectory);
router.get('/:id', dirController.getDirectoryById);
router.delete('/:id', dirController.deleteDirectoryById);
router.patch('/:id', dirController.updateDirectoryById);
router.get('/search', dirController.searchFileAndDir);

export default router;
