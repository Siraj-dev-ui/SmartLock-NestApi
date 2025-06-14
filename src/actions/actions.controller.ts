import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { AddActionDto } from './dtos/add-action.dto';
import { Response } from 'express';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Get('active-action')
  async GetActiveAction(@Res() res: Response) {
    const action = await this.actionsService.getActiveAction();
    if (action.length > 0 && action[0]['action_active'] === true) {
      //   return res.status(200).json({ action_id: action['action_id'] });
      console.log('active action found...');
      return res.status(200).send(action[0]['action_id']);
    } else {
      console.log('no active action found...');
      return res.status(204).send();
    }
  }

  @Post('add-action')
  AddNewAction(@Body() addActionDto: AddActionDto) {
    return this.actionsService.addNewAction(addActionDto);
  }

  @Get('test')
  test() {
    return 'actions api working...';
  }
}
