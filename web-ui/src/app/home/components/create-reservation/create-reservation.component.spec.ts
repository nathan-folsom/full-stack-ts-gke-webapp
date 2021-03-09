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
    const formatted = component.getDateFromInputs(new Date(originalDate), {hour: '1', minute: '15', period: 'am'});
    expect(originalDate.getDate()).toEqual(formatted.getDate());
    expect(formatted.getHours()).toEqual(1);
    expect(formatted.getMinutes()).toEqual(15);

    const afternoon = component.getDateFromInputs(new Date(), {hour: '1', minute: '15', period: 'pm'});
    expect(afternoon.getHours()).toEqual(13);

    const noon = component.getDateFromInputs(new Date(), {hour: '12', minute: '15', period: 'pm'});
    expect(noon.getHours()).toEqual(12);
  });
});
