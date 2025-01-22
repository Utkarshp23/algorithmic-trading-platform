import React from 'react';
import { useSpring, animated } from '@react-spring/web';
// import { Bar } from 'react-chartjs-2'; // Commented out
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeaturesSection = () => {
  const slideIn = useSpring({
    from: { transform: 'translateY(50px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    config: { duration: 1000 },
  });

  // const data = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Performance',
  //       backgroundColor: 'rgba(0, 255, 17, 0.5)',
  //       borderColor: 'rgba(0, 255, 17, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(0, 255, 17, 0.7)',
  //       hoverBorderColor: 'rgba(0, 255, 17, 1)',
  //       data: [65, 59, 80, 81, 56, 55]
  //     }
  //   ]
  // };

  return (
    <animated.div style={slideIn} className="App-section features-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg shadow-lg glass-card">
            <h3 className="text-xl font-bold mb-4">Real-Time Market Data</h3>
            <p>Access real-time market data to make informed trading decisions.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg glass-card">
            <h3 className="text-xl font-bold mb-4">Automated Trading Strategies</h3>
            <p>Implement and automate your trading strategies with ease.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg glass-card">
            <h3 className="text-xl font-bold mb-4">Secure and Reliable</h3>
            <p>Experience a secure and reliable trading platform.</p>
          </div>
        </div>
        {/* <div className="mt-8">
          <Bar data={data} />
        </div> */}
      </div>
    </animated.div>
  );
};

export default FeaturesSection;
