import React, { useState, useEffect } from 'react';
import TaskStatus from '../../../commons/TaskStatus';
import LoadingSpinner from '../../../commons/spinners/LoadingSpinner';
import { useTasks } from '../../../contexts/TasksContext';
import MetricsBase from '../../../commons/MetricsBase';

const ProjectMetrics = () => {
    const [data, setData] = useState({});
    const { fetchTasksFromProject } = useTasks();

    useEffect(() => {
        getMetricsData();
    }, []);

    const getMetricsData = async () => {
        let taskData = await fetchTasksFromProject();

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

    const buildChartData = (title, value, color) => ({ title, value, color });

    if (!data['total']) {
        return <LoadingSpinner size={'sm'} />;
    }

    return (
        <MetricsBase data={[data['pending'], data['completed']]}>
            <MetricsBase.Item label={"Total Tasks"} count={data['total'].value} />
            <MetricsBase.Item label={"Pending Tasks"} count={data['pending'].value} />
            <MetricsBase.Item label={"Completed Tasks"} count={data['completed'].value} />
        </MetricsBase>
    );
};

export default ProjectMetrics;