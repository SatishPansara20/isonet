
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { toast } from 'react-toastify';
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd'

import { editNotification, getNotificationInfo, pushNotification } from '../../actions/dashboard';
import moment from 'moment';
import patterns from '../../utils/patterns';


const AddNotification = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    let schedule_noti_id = location.search.split('?')[1]

    const { Option } = Select;
    const [form] = Form.useForm();
    const [scheduale, setScheduale] = useState(false)


    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current.isBefore(moment().subtract(1, "day"))
    };

    useEffect(() => {
        if (location.pathname === "/notification-management/edit-notification") {
            setScheduale(true);
            dispatch(getNotificationInfo({ schedule_noti_id: schedule_noti_id }))
                .then(res => {
                    form.setFieldsValue({
                        user_type: res?.data?.user_type,
                        title: res?.data?.title,
                        message: res?.data?.description,
                        link: res?.data?.link,
                        time_interval: res?.data?.time_interval,
                        is_schedule: res?.is_schedule,
                        time: moment(res?.data?.date_time),
                    });

                },
                )
        }
    }, [dispatch, schedule_noti_id])



    const submitnotification = (value) => {
        const formData = new FormData();
        formData.append("user_type", value?.user_type)
        formData.append("title", value?.title?.trim())
        formData.append("message", value?.message?.trim())
        if (value?.link) {
            formData.append("link", value?.link)
        }
        formData.append("is_schedule", scheduale ? 'True' : 'False')
        if (scheduale) {
            formData.append("schedule_at_date", moment.utc(value?.time?._d).format("YYYY-MM-DD"))
            formData.append("schedule_at_time", moment.utc(value?.time?._d).format("HH:mm"))
            formData.append("time_interval", value?.time_interval)
        }

        if (location.pathname === "/notification-management/edit-notification") {
            formData.append('schedule_noti_id', schedule_noti_id)
            dispatch(editNotification(formData))
                .then((res) => {
                    if (res?.status === 200) {
                        form.resetFields();
                        toast.success(res?.message);
                        navigate('/notification-management')
                    }
                }).catch((err) => (toast.error(err?.message)))
        } else {
            dispatch(pushNotification(formData))
                .then((res) => {
                    if (res?.status === 200) {
                        form.resetFields();
                        toast.success(res?.message);
                        navigate('/notification-management')
                    }
                }).catch((err) => (toast.error(err?.message)))
        }
    }

    return (
        <>
            <div className='shadow-paper auto-height'>
                <Form form={form} onFinish={submitnotification}
                >
                    <div className='row'>
                        <div className='col-sm-12'>
                            <Form.Item
                                className='form-group'
                                name="user_type"
                                rules={[{ required: true, message: "Please Select Your Notification Role" }]}>
                                <Select placeholder="Select a Category">
                                    <Option value="ALL">All</Option>
                                    <Option value="FU">Funder</Option>
                                    <Option value="BR">Broker</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                className='form-group'
                                name="title"
                                rules={[{ required: true, message: 'Please Enter Your Notification Title' }]}
                            >
                                <Input placeholder="Notification Title" />
                            </Form.Item>
                            <Form.Item
                                className='form-group'
                                name="message"
                                rules={[{ required: true, message: 'Please Enter Your Notification message!' }]}
                            >
                                <Input placeholder="Notification message" />
                            </Form.Item>
                            <Form.Item
                                className='form-group'
                                name="link"
                                rules={[{ pattern: patterns.url, message: 'Please Enter Valid URL' }]}
                            >
                                <Input placeholder="Link" />
                            </Form.Item>

                            <Form.Item
                                name="is_schedule"
                            >
                                <Checkbox onClick={() => setScheduale(!scheduale)} checked={scheduale}>Schedule notification?</Checkbox>
                            </Form.Item>
                            {scheduale &&
                                <>
                                    <Form.Item
                                        className='form-group'
                                        name="time_interval"
                                        rules={[{ required: true, message: 'Please Select Your Recurring Time' }]}
                                    >
                                        {/* <label>Category </label> */}
                                        <Select placeholder="Select a recurring">
                                            <Option value="ONCE">Never</Option>
                                            <Option value="DAILY">Daily</Option>
                                            <Option value="WEEKLY">Weekly</Option>
                                            <Option value="TWISE-WEEKLY">Bi-Weekly</Option>
                                            <Option value="MONTHLY">Monthly</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        className='form-group'
                                        name="time"
                                        rules={[{ required: true, message: 'Please Select Date & Time' }]}
                                    >
                                        <DatePicker
                                            format="MM-DD-YYYY hh:mm A"
                                            disabledDate={disabledDate}
                                            showTime
                                            placeholder='Select date & time'
                                            use12Hours
                                        />
                                    </Form.Item>

                                </>
                            }

                            <Form.Item
                                className='form-group'
                            >
                                <Button type="primary" htmlType="submit"> Send </Button>
                            </Form.Item>

                        </div>
                    </div>
                </Form>

            </div>

        </>
    );
};

export default AddNotification;


