import { AutoMap } from '@automapper/classes';
import { BaseVm } from '@shared/models/base-vm.model';

export class UserVm extends BaseVm {
  @AutoMap()
  username: string;

  @AutoMap()
  email: string;

  @AutoMap()
  phone: string;
}
