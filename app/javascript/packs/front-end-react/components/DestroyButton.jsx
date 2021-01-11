import React from 'react';
import { message, Popconfirm } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import { DELETE_HABIT } from './graphql';
import { mutationError } from '../helpers';

const DestroyButton = ({
  record,
  editing,
  setEditRow,
  preEdit,
  tableData,
  setTableData,
}) => {
  const [
    deleteHabitMutation, { loadingMutation, errorMutation }
  ] = useMutation(DELETE_HABIT, {
    onError: res => mutationError(res.errors),
    onCompleted: data => deleteHabit(data.deleteHabit.habit),
  });

  const deleteHabit = habit => {
    if (habit) {
      const newData = [...tableData];
      const index = newData.findIndex(row => row.id === habit.id);

      newData.splice(index, 1);
      setTableData(newData);
      setEditRow({});
      message.success(`DELETED – ${habit.title}`);
    }
  }

  const revertHabit = record => {
    const newData = [...tableData];
    const isNewHabit = record.key === 'new';

    if (isNewHabit) {
      newData.pop(); // remove editing row
    } else {
      let index = newData.findIndex(row => row.id === record.id);
      newData[index] = preEdit; // revert habit data
    }
    
    setTableData(newData);
    setEditRow({});
  }

  return editing ? (
    <Popconfirm title="CANCEL?" onConfirm={() => revertHabit(record)}>
      <CloseCircleFilled />
    </Popconfirm>
  ) : (
    <Popconfirm title="DELETE?" onConfirm={() => deleteHabitMutation({ variables: { id: record.id } })}>
      <CloseCircleFilled />
    </Popconfirm>
  );
};

export default DestroyButton;
