<?php


namespace Biz\Task\Service\Impl;


use Biz\BaseService;
use Biz\Task\Dao\TaskResultDao;
use Biz\Task\Service\TaskResultService;
use Topxia\Common\ArrayToolkit;

class TaskResultServiceImpl extends BaseService implements TaskResultService
{
    public function findUserTaskResultsByCourseId($courseId)
    {
        $user = $this->getCurrentUser();

        if (!$user->isLogin()) {
            throw $this->createAccessDeniedException('can not get task results because user not login');
        }

        return $this->getTaskResultDao()->findByCourseIdAndUserId($courseId, $user['id']);
    }

    public function getUserTaskResultByTaskId($taskId)
    {
        $user = $this->getCurrentUser();

        if (!$user->isLogin()) {
            throw $this->createAccessDeniedException('can not get task result because user not login');
        }

        return $this->getTaskResultDao()->getByTaskIdAndUserId($taskId, $user['id']);
    }

    public function createTaskResult($taskResult)
    {
        ArrayToolkit::requireds($taskResult, array(
            'activityId',
            'courseId',
            'courseTaskId',
            'userId'
        ));

        $user = $this->biz['user'];

        if (!$user->isLogin()) {
            throw $this->createAccessDeniedException('user must be login');
        }

        $taskResult['status'] = 'start';

        $this->getTaskResultDao()->create($taskResult);
    }

    public function updateTaskResult($id, $taskResult)
    {
        return $this->getTaskResultDao()->update($id, $taskResult);
    }

    public function waveLearnTime($id, $time)
    {
        return $this->getTaskResultDao()->wave(array($id), array(
            'time' => $time
        ));
    }

    public function findUserProgressingTaskResultByActivityId($activityId)
    {
        $user = $this->getCurrentUser();

        if (!$user->isLogin()) {
            throw $this->createAccessDeniedException('unlogin');
        }

        $conditions = array(
            'activityId' => $activityId,
            'userId'     => $user['id'],
            'status'     => 'start'
        );

        $count = $this->getTaskResultDao()->count($conditions);
        return $this->getTaskResultDao()->search($conditions, array('createdTime' => 'DESC'), 0, $count);
    }

    public function findUserProgressingTaskResultByCourseId($courseId)
    {
        $user = $this->getCurrentUser();

        if (!$user->isLogin()) {
            throw $this->createAccessDeniedException('unlogin');
        }

        $conditions = array(
            'courseId' => $courseId,
            'userId'   => $user['id'],
            'status'   => 'start'
        );

        $count = $this->getTaskResultDao()->count($conditions);
        return $this->getTaskResultDao()->search($conditions, array('createdTime' => 'DESC'), 0, $count);
    }


    public function countTaskResult($conditions)
    {
        return $this->getTaskResultDao()->count($conditions);
    }

    public function getUserLatestFinishedTaskResultByCourseId($courseId)
    {
        $user = $this->getCurrentUser();

        if (!$user->isLogin()) {
            throw $this->createAccessDeniedException('unlogin');
        }
        $conditions  = array(
            'userId'   => $user->getId(),
            'status'   => 'fini1sh',
            'courseId' => $courseId
        );
        $taskResults = $this->getTaskResultDao()->search($conditions, array('updatedTime' => 'DESC'), 0, 1);
        $result      = array_shift($taskResults);
        return $result;
    }

    public function findUserTaskResultsByTaskIds($taskIds)
    {
        $user = $this->getCurrentUser();

        if (!$user->isLogin()) {
            throw $this->createAccessDeniedException('unlogin');
        }
        return $this->getTaskResultDao()->findByTaskIdsAndUserId($taskIds, $user->getId());
    }


    /**
     * @return TaskResultDao
     */
    protected function getTaskResultDao()
    {
        return $this->createDao('Task:TaskResultDao');
    }
}