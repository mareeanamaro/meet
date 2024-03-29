import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
    const [ data, setData ] = useState([]);
    const colors = [
        "#11ABAD",
        "#095ABA",
        "#0A90C4",
        "#0AC493",
        "#09BA59"
      ];

    useEffect(() => {
        const getData = () => {
          const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
          const data = genres.map((genre) => {
            const value = events.filter(({ summary} ) =>
              summary.includes(genre)
            ).length;
            return { name: genre, value };
          });
          return data.filter((genre) => { return genre.value > 0});
        };
        setData(() => getData());
      }, [events]);
      
    return (
        <ResponsiveContainer height={400}>
            <PieChart height={400}>
                <Pie
                    data={data}
                    cx={'50%'}
                    cy={'50%'}
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenre;