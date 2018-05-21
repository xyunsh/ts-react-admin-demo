import model from '../baseModel';
import { resourceApi } from '@services/admin';
import { ADMIN_RESOURCE } from './index';

export default model(ADMIN_RESOURCE, resourceApi); 
