import model from '../baseModel';
import { brandApi } from '../../services/biz';

const brand = model('biz/brand', brandApi); 

console.log('brand model', brand);

export default brand;