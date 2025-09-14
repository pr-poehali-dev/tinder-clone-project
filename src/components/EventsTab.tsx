import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function EventsTab() {
  const events = [
    { title: 'Speed Dating', date: '15 октября', participants: 24, location: 'Центр Москвы' },
    { title: 'Винная дегустация', date: '20 октября', participants: 18, location: 'Винотека' },
    { title: 'Мастер-класс по танцам', date: '25 октября', participants: 12, location: 'Танц-студия' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Мероприятия</h2>
        <p className="text-gray-600">Присоединяйтесь к интересным событиям</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {events.map((event, idx) => (
          <Card key={idx} className="card-hover animate-fade-in">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-center">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  {event.date}
                </p>
                <p className="flex items-center">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  {event.location}
                </p>
                <p className="flex items-center">
                  <Icon name="Users" size={16} className="mr-2" />
                  {event.participants} участников
                </p>
              </div>
              <Button className="w-full btn-gradient">
                Присоединиться
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}