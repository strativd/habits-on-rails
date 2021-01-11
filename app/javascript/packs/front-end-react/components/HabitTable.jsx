import React, { useState, useCallback } from 'react';
import { Table } from 'antd';
import { useQuery } from '@apollo/client';

import ActionButton from './ActionButton';
import DestroyButton from './DestroyButton';
import EditableCell from './EditableCell';
import HabitBits from './HabitBits';
import { ALL_HABITS } from './graphql';
import { getDatesThisWeek } from '../helpers';

const datesThisWeek = getDatesThisWeek();

const HabitTable = () => {
  const [tableData, setTableData] = useState([]);
  const [editRow, setEditRow] = useState({});
  const [preEdit, setPreEdit] = useState({});

  const {loading, error, data} = useQuery(ALL_HABITS, {
    onCompleted: (data) => setTableData(data.allHabits.map(habit => {
      let habitRecord = { ...habit}

      habitRecord['key'] = habit.id;
      datesThisWeek.forEach(date => habitRecord[date.formatFull] = habit.goal);

      return habitRecord;
    })),
  });

  if (error) console.log(`❗ ERROR: ${error}`);
  
  const isEditing = (record) => record.key === editRow.key;

  const generateColumnHeaders = () => {
    let daysArray = [];
  
    const renderHeader = (date) => (
      <>
        <div>{date.weekday[0].toUpperCase()}</div>
        <small>{date.formatTiny}</small>
      </>
    );
  
    datesThisWeek.forEach((date, index) => daysArray.push({
      title: renderHeader(date),
      dataIndex: date.formatFull,
      width: '10%',
      render: (_, record) => (
        <HabitBits
          editing={isEditing(record)}
          editRow={editRow}
          habitRecord={record}
          columnCount={index + 1}
        />
      ),
    }));
  
    return daysArray;
  }

  const columns = [
    {
      title: 'HABITS',
      dataIndex: 'title',
      width: '25%',
      fixed: true,
      render: (_, record) => (
        <EditableCell
          editing={isEditing(record)}
          editRow={editRow}
          setEditRow={setEditRow}
          setPreEdit={setPreEdit}
          habitRecord={record}
        />
      )
    },
    {
      title: '',
      dataIndex: 'update',
      fixed: true,
      render: (_, record) => (
        <DestroyButton
          record={record}
          editing={isEditing(record)}
          setEditRow={setEditRow}
          preEdit={preEdit}
          tableData={tableData}
          setTableData={setTableData}
        />
      )
    },
    ...generateColumnHeaders(),
  ];

  return (
    <>
      <Table
        loading={loading || !!error}
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowClassName={(record, index) => (
          isEditing(record) ? 'row--editable row--editable__editing' : 'row--editable'
        )}
      />
      <ActionButton
        loading={loading || !!error}
        editRow={editRow}
        setEditRow={setEditRow}
        setPreEdit={setPreEdit}
        tableData={tableData}
        setTableData={setTableData}
      />
    </>
  );
};

export default HabitTable;
