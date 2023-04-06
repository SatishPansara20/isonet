import React from "react"
import { Form, Input } from "antd"
import { PrefixSearch } from '../svg'
import '../components/common/scss/FormField.scss'


export const RenderSearchResponsive = () => (
  <>
    <Form.Item>
      <Input
        size="large"
        allowClear
        placeholder="Search Here"
        prefix={<PrefixSearch />}
      />
    </Form.Item>
  </>
)