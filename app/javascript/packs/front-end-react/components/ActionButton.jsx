import React from 'react';
import { message, Button } from 'antd';
import { useMutation } from '@apollo/client';

import { CREATE_HABIT, UPDATE_HABIT } from './graphql';
import { errorMessages } from '../helpers';

const ActionButton = ({
  loading,
  editRow,
  setEditRow,
  setPreEdit,
  tableData,
  setTableData,
}) => {
  const editingMode = !!editRow.key; // check if key exists
  const addingHabit = editRow.key === 'new';

  const [
    createHabit, { createLoading, createError }
  ] = useMutation(CREATE_HABIT, {
    onError: res => errorMessages(res.errors),
    onCompleted: data => updateTableData(data.createHabit.habit),
  });

  const [
    updateHabit, { updateLoading, updateError }
  ] = useMutation(UPDATE_HABIT, {
    onError: res => errorMessages(res.errors),
    onCompleted: data => updateTableData(data.updateHabit.habit),
  });

  if (loading) return null;

  const updateTableData = habit => {
    if (habit) {
      let messageText;
      const newHabit = { ...habit, key: habit.id };
      const newData = [...tableData];
      // Get index of habit being saved and check if it exists
      const index = newData.findIndex(record => newHabit.id === record.id);

      if (index > -1) {
        newData[index] = newHabit;
        messageText = 'updated!';
      } else {
        // Remove editing row and add habit
        let indexLastRow = newData.length - 1;
        newData[indexLastRow] = newHabit;
        messageText = 'saved!';
      }
      // Update state of parent component
      setTableData(newData);
      setPreEdit({});
      setEditRow({});
      message.success(`${habit.title} ${messageText}`);
    }
  }

  const addNewHabit = () => {
    const newHabit = {};

    newHabit['title'] = '';
    newHabit['goal'] = 1;
    newHabit['period'] = 'daily';
    newHabit['key'] = 'new';
  
    setPreEdit(newHabit);
    setEditRow(newHabit);
    setTableData([...tableData, newHabit]);
  }

  if (editingMode && addingHabit) {
    return (
      <Button id="action-button" type="primary" loading={createLoading} onClick={() => createHabit({ variables: { ...editRow } })}>
        SAVE HABIT
      </Button>
    )
  } else if (editingMode) {
    return (
      <Button id="action-button" type="primary" loading={updateLoading} onClick={() => updateHabit({ variables: { ...editRow } })}>
        SAVE CHANGES
      </Button>
    )
  } else {
    return (
      <Button id="action-button" type="primary" onClick={() => addNewHabit()}>
        ADD HABIT
      </Button>
    )
  }
};

export default ActionButton;
