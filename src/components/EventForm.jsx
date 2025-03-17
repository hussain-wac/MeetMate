// frontend/src/components/EventForm.js
import React from "react";
import useEventadd from "../hooks/useEventadd";
import { Form, Input, Button } from "antd";

const EventForm = ({ onAddEvent }) => {
  const { title, setTitle, start, setStart, end, setEnd, handleSubmit } = useEventadd(onAddEvent);
  const [form] = Form.useForm();

  const onFinish = () => {
    handleSubmit(); // This is correct—calls handleSubmit without args
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ minWidth: 300 }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter event title"
        />
      </Form.Item>

      <Form.Item
        label="Start"
        name="start"
        rules={[{ required: true, message: "Please select a start time" }]}
      >
        <Input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="End"
        name="end"
        rules={[{ required: true, message: "Please select an end time" }]}
      >
        <Input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Add Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;