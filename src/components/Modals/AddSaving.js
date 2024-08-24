import React from 'react';
import { Modal, Form, Input, Button, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

const AddSavingModal = ({ isSavingModalVisible, handleSavingCancel, onFinish }) => {
  const [form] = Form.useForm();

  const onFinishForm = (values) => {
    // Convert date to YYYY-MM-DD format
    const formattedValues = {
      ...values,
      date: moment(values.date).format("YYYY-MM-DD"),
      type: "saving" // Ensure type is set to "saving"
    };
    onFinish(formattedValues, "saving");
  };

  return (
    <Modal
      title="Add Savings"
      visible={isSavingModalVisible}
      onCancel={handleSavingCancel}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinishForm}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Saving Name"
          rules={[{ required: true, message: 'Please enter a name for the saving!' }]}
        >
          <Input placeholder="Enter saving name" />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please enter the saving amount!' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={0.01}
            placeholder="Enter saving amount"
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select the saving date!' }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
            defaultValue={moment()}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Saving
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSavingModal;
