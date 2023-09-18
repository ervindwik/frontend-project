import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const GraphPage = () => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-graph');
        setGraphData(response.data);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Graph Page</h1>
      {graphData && <Line data={graphData} options={options} />}
    </div>
  );
};

export default GraphPage;
