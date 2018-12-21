<?php

namespace ApiBundle\Api\Resource\Page;

use ApiBundle\Api\Resource\Filter;
use ApiBundle\Api\Resource\User\UserFilter;
use ApiBundle\Api\Resource\Course\CourseFilter;
use ApiBundle\Api\Util\AssetHelper;
use ApiBundle\Api\Util\Converter;
use ApiBundle\Api\Util\Money;
use AppBundle\Common\ServiceToolkit;
use ApiBundle\Api\Resource\Classroom\ClassroomReviewFilter;

class PageClassroomFilter extends Filter
{
    protected $simpleFields = array(
        'id', 'title', 'smallPicture', 'middlePicture', 'largePicture', 'price', 'studentNum', 'about',
    );

    protected $publicFields = array(
        'status', 'price', 'vipLevelId', 'headTeacher', 'teachers', 'assistants',
        'hitNum', 'auditorNum', 'studentNum', 'courseNum', 'threadNum', 'noteNum', 'postNum', 'service', 'recommended',
        'recommendedSeq', 'rating', 'ratingNum', 'maxRate', 'showable', 'buyable', 'expiryMode', 'expiryValue',
        'createdTime', 'updatedTime', 'creator', 'access', 'courses', 'reviews', 'member', 'vipLevel',
    );

    protected function simpleFields(&$data)
    {
        $data['about'] = $this->convertAbsoluteUrl($data['about']);
        $this->transformCover($data);

        $data['price2'] = Money::convert($data['price']);
    }

    protected function publicFields(&$data)
    {
        empty($data['vipLevel']) && $data['vipLevel'] = null;

        if ('date' == $data['expiryMode']) {
            Converter::timestampToDate($data['expiryStartDate']);
        }

        $data['service'] = AssetHelper::callAppExtensionMethod('transServiceTags', array(ServiceToolkit::getServicesByCodes($data['service'])));

        $userFilter = new UserFilter();
        $userFilter->setMode(Filter::SIMPLE_MODE);
        $userFilter->filter($data['creator']);
        $userFilter->filters($data['teachers']);
        $userFilter->filters($data['assistants']);
        if (!empty($data['headTeacher'])) {
            $userFilter->setMode(Filter::PUBLIC_MODE);
            $userFilter->filter($data['headTeacher']);
        }
        $courseFilter = new CourseFilter();
        $courseFilter->setMode(Filter::PUBLIC_MODE);
        $courseFilter->filters($data['courses']);

        $reviewFilter = new ClassroomReviewFilter();
        $reviewFilter->setMode(Filter::PUBLIC_MODE);
        $reviewFilter->filters($data['reviews']);
    }

    private function transformCover(&$data)
    {
        $data['smallPicture'] = AssetHelper::getFurl($data['smallPicture'], 'classroom.png');
        $data['middlePicture'] = AssetHelper::getFurl($data['middlePicture'], 'classroom.png');
        $data['largePicture'] = AssetHelper::getFurl($data['largePicture'], 'classroom.png');
        $data['cover'] = array(
            'small' => $data['smallPicture'],
            'middle' => $data['middlePicture'],
            'large' => $data['largePicture'],
        );

        unset($data['smallPicture']);
        unset($data['middlePicture']);
        unset($data['largePicture']);
    }
}
