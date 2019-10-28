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
        let tasks = await fetchTasksFromProject();

        let pendingCount = 0;
        let completedCount = 0;
        let totalCount = tasks.length;

        if (totalCount > 0) {
            tasks.forEach(task => {
                if (task.status == TaskStatus.COMPLETED) {
                    completedCount += 1;
                }
                else {
                    pendingCount += 1;
                }
            });
        }

        let metricsData = {};
        metricsData['total'] = buildChartData('Total Tasks', totalCount, '');
        metricsData['pending'] = buildChartData('Pending', pendingCount, '#E38627');
        metricsData['completed'] = buildChartData('Completed', completedCount, '#C13C37');

        setData(metricsData);
    }

    const buildChartData = (title, value, color) => ({ title, value, color });

    if (!data['total']) {
        return <LoadingSpinner />;
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