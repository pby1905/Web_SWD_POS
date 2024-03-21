import React, { useState, useEffect } from 'react';
import { Card, Statistic } from 'antd';
import Chart from 'chart.js/auto';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [revenueByMonth, setRevenueByMonth] = useState([]);

    const fetchDashboardData = async () => {
        try {
            // Fetch total orders
            const totalOrdersResponse = await axios.get('https://localhost:7052/Order/Total_Order');
            setTotalOrders(totalOrdersResponse.data);

            // Fetch total revenue
            const totalRevenueResponse = await axios.get('https://localhost:7052/Order/Total_Revenue');
            setTotalRevenue(totalRevenueResponse.data);

            // Fetch revenue by month
            const month = 3; // Example month
            if (isValidMonth(month)) {
                const totalMonthRevenueResponse = await axios.get(`https://localhost:7052/Order/Total_MonthRevenue?month=${month}`);
                setRevenueByMonth(totalMonthRevenueResponse.data);
                updateCharts(totalRevenueResponse.data, totalOrdersResponse.data, totalMonthRevenueResponse.data);
            } else {
                console.error('Invalid month. Month should be between 1 and 12.');
                // Handle error here, e.g., display a message to the user
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error here, e.g., display a message to the user
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const isValidMonth = (month) => {
        return month >= 1 && month <= 12;
    };

    const updateCharts = (revenue, orders, revenueByMonth) => {
        // Doughnut chart for total revenue
        const revenueChart = document.getElementById('revenueChart').getContext('2d');
        new Chart(revenueChart, {
            type: 'doughnut',
            data: {
                labels: ['Total Revenue', 'Remaining'],
                datasets: [{
                    label: 'Total Revenue',
                    data: [revenue, 100 - revenue],
                    backgroundColor: [
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            }
        });

        // Bar chart for total orders
        const ordersChart = document.getElementById('ordersChart').getContext('2d');
        new Chart(ordersChart, {
            type: 'bar',
            data: {
                labels: ['Total Orders'],
                datasets: [{
                    label: 'Total Orders',
                    data: [orders],
                    backgroundColor: '#FF6384'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Line chart for revenue by month
        if (Array.isArray(revenueByMonth) && revenueByMonth.length > 0) {
            const revenueByMonthChart = document.getElementById('revenueByMonthChart').getContext('2d');
            new Chart(revenueByMonthChart, {
                type: 'line',
                data: {
                    labels: revenueByMonth.map(month => month.month),
                    datasets: [{
                        label: 'Revenue by Month',
                        data: revenueByMonth.map(month => month.totalRevenue),
                        borderColor: '#FF5722',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.error('Error: Invalid or empty revenueByMonth data');
            // Handle error here, if necessary
        }
    };

    return (
        <div className="dashboard-container">
            <Card>
                <Statistic title="Total Revenue" value={totalRevenue} precision={2} suffix="USD" />
                <canvas id="revenueChart" width="400" height="400"></canvas>
            </Card>
            <Card>
                <Statistic title="Total Orders" value={totalOrders} />
                <canvas id="ordersChart" width="400" height="400"></canvas>
            </Card>
            <Card>
                <Statistic title="Revenue by Month" value={revenueByMonth} precision={2} suffix="USD" />
                <canvas id="revenueByMonthChart" width="400" height="400"></canvas>
            </Card>
        </div>
    );
};

export default Dashboard;
