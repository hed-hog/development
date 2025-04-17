import { ComponentType } from './ComponentType';
<<<<<<< HEAD
import { Instance } from './Instance';
import { ComponentProp } from './ComponentProp';
=======
import { ComponentProp } from './ComponentProp';
import { Instance } from './Instance';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651

export type Component = {
  id?: number;
  type_id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  component_type?: ComponentType;
<<<<<<< HEAD
  instance?: Instance[];
  component_prop?: ComponentProp[];
=======
  component_prop?: ComponentProp[];
  instance?: Instance[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
}