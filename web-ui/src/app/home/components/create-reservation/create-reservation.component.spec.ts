import { CreateReservationComponent } from './create-reservation.component';
import createSpyObj = jasmine.createSpyObj;

describe('CreateReservationComponent', () => {
  let component: CreateReservationComponent;
  let snackBar;
  let reservationService;

  beforeEach(() => {
    reservationService = createSpyObj('reservationService', ['']);
    snackBar = createSpyObj('snackBar', ['open']);
    component = new CreateReservationComponent(reservationService, snackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should construct date and time', () => {
    const originalDate = new Date();
    const hour = '1';
    const minute = '15';
    const period = 'am';
    const time = {hour, minute, period};
    const formatted = component.getDateFromInputs(new Date(originalDate), time);
    expect(originalDate.getDate()).toEqual(formatted.getDate());
    expect(formatted.getHours()).toEqual(parseInt(hour));
    expect(formatted.getMinutes()).toEqual(parseInt(minute));
    time.period = 'pm';

    const afternoon = component.getDateFromInputs(new Date(), time);
    expect(afternoon.getHours()).toEqual(parseInt(hour) + 12);
  });
});
