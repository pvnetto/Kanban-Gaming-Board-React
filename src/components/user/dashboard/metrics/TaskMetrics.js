import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../../contexts/WorkspaceContext';
import MetricsBase from '../../../commons/MetricsBase';
import TaskStatus from '../../../commons/TaskStatus';
import LoadingSpinner from '../../../commons/spinners/LoadingSpinner';

const TaskMetrics = () => {

    const [data, setData] = useState({});
    const { projects, fetchAllTasksFromAllProjects } = useWorkspace();

    useEffect(() => {
        getMetricsData();
    }, []);

    const getMetricsData = async () => {
        let taskData = await fetchAllTasksFromAllProjects();

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