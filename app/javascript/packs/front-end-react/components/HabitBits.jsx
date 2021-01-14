import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Checkbox } from 'antd';

import { GET_DAILY_STEPS, UPDATE_DAILY_STEPS } from './graphql';
import { mutationError } from '../helpers';

const HabitBits = ({
  editing,
  editRow,
  habitRecord,
  columnCount,
  date,
}) => {
  const [progress, setProgress] = useState(0);

  const { loading, error, data } = useQuery(GET_DAILY_STEPS, {
    variables: {
      habitId: habitRecord.id,
      date,
    },
    onCompleted: ({dailySteps}) => {
      let habitProgress = dailySteps ? dailySteps.progress : 0;
      setProgress(habitProgress);
    },
    onError: (data) => {
      console.log(data);
    }
  });

  const [
    updateSteps, { updateLoading, updateError }
  ] = useMutation(UPDATE_DAILY_STEPS, {
    onError: res => mutationError(res.errors),
  });

  const isFirstColumn = columnCount === 1;

  const handleClick = (event) => {
    let count = progress;
    let checked = event.target.checked;

    checked ? count++ : count--;
    setProgress(count);
    updateSteps({
      variables: {
        habitId: habitRecord.id,
        progress: count,
        date,
      }
    })
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
      {renderBits(editRow.goal, true)}
    </>
  ) :(
    <>
      {renderBits(habitRecord.goal)}
    </>
  )
};

export default HabitBits;
