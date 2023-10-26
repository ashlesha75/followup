'use client'

import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";
import axios from "axios";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

const Vector = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/api/task/adminTaskCounts", {
          headers: {
            Authorization: token,
          },
        });

        if (response.data) {
          // Extract the data you want to display in the chart
          const taskCounts = response.data;
          const chartData = [taskCounts.totalEmployeeTasks, taskCounts.completedTasks, taskCounts.pendingTasks];

          setChartData(chartData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: chartData,
            borderColor: ["rgb(75, 192, 192)", "rgb(255, 205, 86)", "rgb(255, 99, 132)"],
            backgroundColor: ["rgb(75, 192, 192)", "rgb(255, 205, 86)", "rgb(255, 99, 132)"],
            borderWidth: 2,
          },
        ],
        labels: ["Total Employee Tasks", "Completed Tasks", "Pending Tasks"],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });
  }, [chartData]);

  return (
    <>
      <Navbar />
      <AdminSidebar />
      <h1 className="w-[150px] mx-auto text-xl font-semibold capitalize mt-28 ">Dashboard</h1>
      <div className="w-[1100px] h-screen flex mx-auto my-auto pl-28">
        <div className="pt-0 rounded-xl w-full h-fit my-auto pb-2">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
};

export default Vector;
