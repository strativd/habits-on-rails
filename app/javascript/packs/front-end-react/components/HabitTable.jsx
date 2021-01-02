import React, { useEffect, useState, useCallback } from 'react';
import { Table, Input, Popconfirm, Checkbox } from 'antd';
import { CloseCircleFilled, SaveFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';

import { ALL_HABITS } from './graphql';
import { getDatesThisWeek } from '../helpers';

const datesThisWeek = getDatesThisWeek();

const HabitBits = ({
  editing,
  editHabit,
  habitRecord,
  setHabitData,
  columnCount,
}) => {
  const [progress, setProgress] = useState(0);
  const isFirstColumn = columnCount === 1;

  const handleClick = (event) => {
    let count = progress;
    let checked = event.target.checked;

    checked ? count++ : count--;
    setProgress(count);
  }

  const renderBits = (goal, editing) => {
    let bits = [];

    for (let i = 0; i < goal; i++) {
      bits.push(<Checkbox key={i} checked={editing || progress > i} onClick={e => handleClick(e)} />)
    }

    return bits;
  }

  return editing && isFirstColumn ? (
    <>
      {renderBits(editHabit.goal, true)}
    </>
  ) :(
    <>
      {renderBits(habitRecord.goal)}
    </>
  )
};

const EditableCell = ({
  editing,
  editHabit,
  habitRecord,
  setHabitData,
}) => {
  const changeGoal = (habit, diff) => {
    let newGoal = habit.goal + diff;
    if (newGoal > 8 || newGoal < 1) return;
    setHabitData(habit, 'goal', newGoal);
  };

  const changeHabitTitle = (event, habit) => setHabitData(habit, 'title', event.target.value)

  return editing ? (
    <Input
      value={editHabit.title}
      addonBefore={<MinusOutlined onClick={() => changeGoal(editHabit, -1)} />}
      addonAfter={<PlusOutlined onClick={() => changeGoal(editHabit, 1)} />}
      onChange={(e) => changeHabitTitle(e, editHabit)}
    />
  ) : (
    <>{habitRecord.title}</>
  )
};

const HabitTable = () => {
  const [tableData, setTableData] = useState([]);
  const [editHabit, setEditHabit] = useState({});

  const {loading, error, data} = useQuery(ALL_HABITS, {
      onCompleted: (data) => setTableData(data.allHabits.map((habit, index) => {
        let habitRecord = {}

        habitRecord['title'] = habit.title;
        habitRecord['goal'] = habit.goal;
        habitRecord['key'] = index;
        habitRecord['id'] = habit.id;
        datesThisWeek.forEach(date => habitRecord[date.formatFull] = habit.goal);

        return habitRecord;
      })),
    }
  );

  if (!data || error) {
    console.log(`❗ ERROR: ${error}`);

    return null;
  }
  
  const isEditing = (record) => (record.key === editHabit.key);

  const setHabitData = (habit, key, value) => {
    let newHabit = { ...habit };
    newHabit[key] = value;
    setEditHabit(newHabit);
  }

  const enableEditHabit = function(record) {
    const editing = isEditing(record);

    if (!editing) {
      setEditHabit(record);
    }
  };

  const cancel = () => {
    setEditHabit({});
  };

  const saveEditHabit = record => {
    const newData = [...tableData];
    const index = record.key;

    newData[index] = editHabit;
    setTableData(newData);
    setEditHabit({});
  };
  
  const deleteHabit = async key => {
    console.log(key);
  }

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
      render: (_, record) => (<HabitBits
        editing={isEditing(record)}
        editHabit={editHabit}
        habitRecord={record}
        setHabitData={setHabitData}
        columnCount={index + 1}
    />),
    }));
  
    return daysArray;
  }

  const columns = [
    {
      title: 'HABITS',
      dataIndex: 'title',
      width: '25%',
      fixed: true,
      onCell: (record) => ({
        onClick: () => enableEditHabit(record),
      }),
      render: (_, record) => <EditableCell
        editing={isEditing(record)}
        editHabit={editHabit}
        habitRecord={record}
        setHabitData={setHabitData}
      />
    },
    {
      title: '',
      dataIndex: 'update',
      fixed: true,
      render: (_, record) => {
        const editing = isEditing(record);

        return editing ? (
          <SaveFilled onClick={() => saveEditHabit(record)} />
        ) : (
          <Popconfirm title="Delete habit?" onConfirm={() => deleteHabit(record.key)}>
            <CloseCircleFilled />
          </Popconfirm>
        );
      },
    },
    ...generateColumnHeaders(),
  ];

  return (
    <Table
      loading={loading}
      dataSource={tableData}
      columns={columns}
      rowClassName="editable-row"
      pagination={false}
    />
  );
};

export default HabitTable;
