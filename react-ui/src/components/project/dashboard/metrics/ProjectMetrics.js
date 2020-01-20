import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import TaskStatus from '../../../utils/types/TaskStatus';
import LoadingSpinner from '../../../utils/spinners/LoadingSpinner';
import MetricsBase from '../../../utils/MetricsBase';
import { fetchTasksFromProject } from '../../../dispatchers/tasks/task-actions-async';

const ProjectMetrics = () => {
    const [data, setData] = useState({});
    const firebaseClient = useSelector(state => state.auth.firebaseClient);
    const currentProject = useSelector(state => state.boards.currentProject);

    useEffect(() => {
        getMetricsData();
    }, [currentProject]);

    const getMetricsData = async () => {
        let taskData = await fetchTasksFromProject(currentProject.id, firebaseClient.taskService);

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