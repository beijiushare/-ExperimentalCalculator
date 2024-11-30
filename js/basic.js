function goHome() {
  window.location.href = "../menu.html"; // 修改为您的首页链接
}

function addRow() {
  const rowCount = parseInt(document.getElementById("rowCount").value);
  const tableBody = document
    .getElementById("dataInput")
    .getElementsByTagName("tbody")[0];

  if (isNaN(rowCount) || rowCount < 1) {
    alert("请输入有效的行数。");
    return;
  }

  const currentRowCount = tableBody.rows.length; // 获取当前总行数

  for (let i = 0; i < rowCount; i++) {
    const newRow = tableBody.insertRow();
    const newCell = newRow.insertCell(0);
    newCell.innerText = currentRowCount + i + 1; // 设置行号
    for (let j = 1; j < 6; j++) {
      // 从1开始，因为0位置是行号
      const newCell = newRow.insertCell(j);
      newCell.contentEditable = "true"; // 允许编辑的单元格
      newCell.onkeydown = function (event) {
        moveCursor(event, newCell);
      }; // 绑定键盘事件
    }
  }
  // 更新行数显示
  updateRowCount();

  document.getElementById("rowCount").value = ""; // 清空输入框
}

function updateRowNumbers() {
  const rows = document.querySelectorAll("#dataInput tbody tr");
  rows.forEach((row, index) => {
    row.cells[0].innerText = index + 1; // 更新行号
  });
}

//  此函数优化了移动光标的逻辑，使得光标可以跨越单元格，并且可以正确处理边界情况。
function moveCursor(event, cell) {
  const row = cell.parentNode;
  const tableBody = document
    .getElementById("dataInput")
    .getElementsByTagName("tbody")[0];
  const cells = row.querySelectorAll("td");
  const cellIndex = Array.from(cells).indexOf(cell);
  const currentRowIndex = Array.from(tableBody.rows).indexOf(row);

  if (event.key === "ArrowRight") {
    if (cellIndex < cells.length - 1) {
      cells[cellIndex + 1].focus();
    } else if (currentRowIndex < tableBody.rows.length - 1) {
      tableBody.rows[currentRowIndex + 1].cells[1].focus();
    }
    event.preventDefault();
  } else if (event.key === "ArrowLeft") {
    if (cellIndex > 1) {
      cells[cellIndex - 1].focus();
    } else if (currentRowIndex > 0 && cellIndex == 1) {
      tableBody.rows[currentRowIndex - 1].cells[cells.length - 1].focus();
    }
    event.preventDefault();
  } else if (event.key === "ArrowDown") {
    if (currentRowIndex < tableBody.rows.length - 1) {
      tableBody.rows[currentRowIndex + 1].cells[cellIndex].focus();
    } else if (currentRowIndex == tableBody.rows.length - 1) {
      tableBody.rows[0].cells[cellIndex + 1].focus();
    }
    event.preventDefault();
  } else if (event.key === "ArrowUp") {
    if (currentRowIndex > 0) {
      tableBody.rows[currentRowIndex - 1].cells[cellIndex].focus();
    } else if (currentRowIndex == 0) {
      tableBody.rows[tableBody.rows.length - 1].cells[cellIndex - 1].focus();
    }
    event.preventDefault();
  }
}

// 下一步优化复制体验（类似于excel的复制粘贴功能）。
