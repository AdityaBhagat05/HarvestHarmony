import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function CropMatrix() {
  const [matrix, setMatrix] = useState([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ]);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);

  const vegetables = [
    { id: 1, name: 'Tomato', icon: '🍅' },
    { id: 2, name: 'Potato', icon: '🥔' },
    { id: 3, name: 'Carrot', icon: '🥕' },
    { id: 4, name: 'Corn', icon: '🌽' }
  ];

  const addRow = () => {
    setRows(rows + 1);
    setMatrix([...matrix, Array(cols).fill(null)]);
  };

  const addColumn = () => {
    setCols(cols + 1);
    setMatrix(matrix.map(row => [...row, null]));
  };

  const handleDrop = (row, col, vegetable) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = vegetable;
    setMatrix(newMatrix);
  };

  return (
    <div className="crop-matrix-container">
      <div className="controls">
        <button onClick={addRow}>Add Row</button>
        <button onClick={addColumn}>Add Column</button>
      </div>
      
      <div className="matrix-layout">
        <div className="vegetable-menu">
          {vegetables.map(veg => (
            <div 
              key={veg.id} 
              className="vegetable-item"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('vegetable', JSON.stringify(veg))}
            >
              <span>{veg.icon}</span>
              <span>{veg.name}</span>
            </div>
          ))}
        </div>

        <div className="matrix-grid" 
             style={{ 
               gridTemplateColumns: `repeat(${cols}, 80px)`,
               gridTemplateRows: `repeat(${rows}, 80px)`
             }}>
          {matrix.map((row, i) => 
            row.map((cell, j) => (
              <div 
                key={`${i}-${j}`}
                className="matrix-cell"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const veg = JSON.parse(e.dataTransfer.getData('vegetable'));
                  handleDrop(i, j, veg);
                }}
              >
                {cell && <span>{cell.icon}</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CropMatrix;