import { PUBLIC, PUBLIC_SUBFOLDERS } from './server.config'
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const createMissingFolders = () => {
    PUBLIC_SUBFOLDERS.forEach(subfolder => {
        const path = join(PUBLIC, subfolder);
        if(!existsSync(path)) { mkdirSync(path) }
    })
}