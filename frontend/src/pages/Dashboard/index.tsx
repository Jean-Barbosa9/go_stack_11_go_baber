import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { isToday, isTomorrow } from 'date-fns';
import { FiPower, FiClock, FiCamera } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getWeekDay from '../../utils/getWeekDay';

import logoImg from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  ProfileImg,
  ProfileInfos,
  Logout,
  Body,
  Schedule,
  NextAppointment,
  Section,
  Calendar,
  Appointment,
} from './styles';

interface MonthAvailability {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([]);

  const dayReference = useMemo(() => {
    if(isToday(selectedDate)) {
      return 'Hoje'
    }

    if(isTomorrow(selectedDate)) {
      return 'Amanhã'
    }

    return selectedDate.toLocaleDateString();
  }, [selectedDate])
  const dayDate = useMemo(
    () => String(selectedDate.getDate()).padStart(2, '0'), [selectedDate]
  );
  const weekDay = useMemo(() => getWeekDay(selectedDate), [selectedDate]);
  const weekdaysShort = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const disabledDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    return monthAvailability.filter(
      monthDay => monthDay.available === false
    ).map(date => new Date(year, month, date.day))
  }, [currentMonth, monthAvailability])

  const handleModifier = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.available) {
      setSelectedDate(day);
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, [])

  useEffect(() => {
    api.get(`/availability/${user.id}/month`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      },
    }).then(response => {
      setMonthAvailability(response.data);
    })
  }, [currentMonth, user.id])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Logo GoBarber" />
          <Profile  onClick={() => history.push('/profile')}>
            <ProfileImg>
              {
                user.avatar_url
                ? <img src={user.avatar_url} alt={`Foto perfil ${user.name}`} />
                : <FiCamera size={20} />
              }
            </ProfileImg>
            <ProfileInfos>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </ProfileInfos>
          </Profile>
          <Logout onClick={signOut}><FiPower size={20} /></Logout>
        </HeaderContent>
      </Header>

      <Body>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>{dayReference}</span>
            {
              (dayReference === 'Hoje' || dayReference === 'Amanhã') &&
                <span>{dayDate}</span>
            }
            <span>{weekDay}</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              {
                user.avatar_url
                 ? <img src={user.avatar_url} alt={user.name} />
                 : <FiCamera size={15} />
              }
              <strong>{user.name}</strong>
              <span><FiClock /> 08:00</span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span><FiClock /> 09:00</span>
              <div>
              {
                user.avatar_url
                 ? <img src={user.avatar_url} alt={user.name} />
                 : <FiCamera size={15} />
              }
                <strong>{user.name}</strong>
              </div>
            </Appointment>
            <Appointment>
              <span><FiClock /> 11:00</span>
              <div>
              {
                user.avatar_url
                 ? <img src={user.avatar_url} alt={user.name} />
                 : <FiCamera size={15} />
              }
                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span><FiClock /> 13:00</span>
              <div>
              {
                user.avatar_url
                 ? <img src={user.avatar_url} alt={user.name} />
                 : <FiCamera size={15} />
              }
                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar weekDay={weekDay}>
          <DayPicker
            weekdaysShort={weekdaysShort}
            months={months}
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5]}
            }}
            disabledDays={[
              {daysOfWeek: [0, 6]},
              ...disabledDays,
            ]}
            selectedDays={selectedDate}
            onDayClick={handleModifier}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Body>
    </Container>
  )
};

export default Dashboard;
