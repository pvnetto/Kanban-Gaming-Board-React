import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchAllTasksFromAllProjects } from '../../../dispatchers/projects/project-actions-async';

import MetricsBase from '../../../utils/MetricsBase';
import TaskStatus from '../../../utils/types/TaskStatus';
import LoadingSpinner from '../../../utils/spinners/LoadingSpinner';

const TaskMetrics = () => {

    const [data, setData] = useState({});
    const projects = useSelector(state => state.projects.projects);
    const firebaseClient = useSelector(state => state.auth.firebaseClient);

    useEffect(() => {
        getMetricsData();
    }, [projects]);

    const getMetricsData = async () => {
        const taskData = await fetchAllTasksFromAllProjects(projects, firebaseClient.taskService);

        if (taskData[TaskStatus.COMPLETED]) {
            let completedCount = taskData[TaskStatus.COMPLETED].length;
            let totalCount = 0;
            Object.keys(taskData).forEach(key => {
                totalCount += taskData[key].length;
            });
            let pendingCount = totalCount - completedCount;

            let metricsData = {};
            metricsData['total'] = buildChartData('Total Tasks', totalCount, '');
            metricsData['pending'] = buildChartData('Pending', pendingCount, '#E38627');
            metricsData['completed'] = buildChartData('Completed', completedCount, '#C13C37');

            setData(metricsData);
        }
    }

    const buildChartData = (title, value, color) => ({ title, value, color });

    if (!data['total']) {
        return <LoadingSpinner size={"sm"} />;
    }

    return (
        <MetricsBase data={[data['pending'], data['completed']]}>
            <MetricsBase.Item label={"Projects"} count={projects.length} />
            <MetricsBase.Item label={"Total Tasks"} count={data['total'].value} />
            <MetricsBase.Item label={"Pending Tasks"} count={data['pending'].value} />
            <MetricsBase.Item label={"Completed Tasks"} count={data['completed'].value} />
        </MetricsBase>
    );
};

export default TaskMetrics;