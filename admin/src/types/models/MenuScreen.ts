import { Menu } from './Menu';
import { Screen } from './Screen';

export type MenuScreen = {
  menu_id?: number;
  screen_id?: number;
  menu?: Menu;
  screen?: Screen;
}