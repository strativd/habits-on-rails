import React, { useState, useCallback } from 'react';
import { Checkbox } from 'antd';

const HabitBits = ({
  editing,
  editRow,
  habitRecord,
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
      {renderBits(editRow.goal, true)}
    </>
  ) :(
    <>
      {renderBits(habitRecord.goal)}
    </>
  )
};

export default HabitBits;
