import AppError from '@shared/errors/AppError';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(async () => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: 'provider_id',
      client_id: 'client_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
    expect(appointment.client_id).toBe('client_id');
  });

  it('should not be able to create appointments in a same time', async () => {
    const appointmentDate = new Date(2020, 5, 29, 17);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      client_id: 'client_id',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'provider_id',
        client_id: 'client_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
