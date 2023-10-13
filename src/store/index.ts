// /store/index.ts
import { Info } from './info';
// import { User } from './User';

/** 将每个Store实例化 */
export const RootStore = {
  info: new Info(),
//   user: new User()
}