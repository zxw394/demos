<template>
    <Table
    @cell-dblclick="cellDbClick">

    </Table>
</template>
<script>
    import {Table} from 'element-ui'
    let originCell
    let duplicateCell;
    let hasEditableInput = false;
    export default {
        name: "EditTable",
        extends: Table,
        methods: {
            cellDbClick(row, column, cell, event){
                console.log(row);
                console.log(column);
                console.log(cell);
                // console.log(event);
                if (hasEditableInput) return false
                duplicateCell = cell.cloneNode(true);
                let input = document.createElement("input");
                input.value = row[column.property];
                input.onblur = () => {
                    row[column.property] = input.value;
                    duplicateCell.querySelector(".cell").childNodes.forEach((ele) => {
                        if (ele.nodeType === 3) {
                            ele.textContent  = input.value;
                        }
                    })
                    originCell.replaceWith(duplicateCell);
                    hasEditableInput = false;
                }
                //循环删除子节点
                while(cell.hasChildNodes()) cell.removeChild(cell.firstChild);
                cell.appendChild(input);
                input.focus();
                originCell = cell;
                hasEditableInput = true
            },
        },
        components: {
            Table
        }
    }
</script>

