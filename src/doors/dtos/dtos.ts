export class ScheduleDto {
  id: string;

  schedule: {
    [day: string]: {
      opening_time: string;
      closing_time: string;
      is_open: boolean;
    };
  };
}
