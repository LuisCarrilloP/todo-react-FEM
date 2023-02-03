import React, { useState, useContext, useEffect } from 'react';
import './list.css';

import TodoItem from '../todo-item/TodoItem';

//Context
import TodoContext from '../../context/TodoContext';

const List = () => {

   const { todoItems, todoCount, clearCompleted } = useContext(TodoContext)

   const [todoList, setTodoList] = useState([])
   const [filter, setFilter] = useState("all")
   const [showAll, setShowAll] = useState(true)

   const showActiveTasks = () => {
      setShowAll(false)
      let newItems = todoItems.filter((item) => item.isActive === true)
      setTodoList(newItems)
   }

   const showCompletedTasks = () => {
      setShowAll(false)
      let newItems = todoItems.filter((item) => item.isActive === false)
      setTodoList(newItems)
   }

   useEffect(() => {
      //select the filter
      let filterOption = document.querySelector(`#${filter}`)
      //add color to the selected filter
      filterOption.classList.add('selected')
      if (showAll) {
         setTodoList(todoItems)
      }

      //ticks show appear whenever the list rerenders
      todoList.forEach((item) => {
         if (item.isActive === false) {
            let todoCircle = document.querySelector(`#todo-icon-${item.id}`);
            let check = document.querySelector(`#check-${item.id}`);
            let todoItemTitle = document.querySelector(`#todo-item-${item.id}`);

            todoCircle.classList.add("checked");
            check.classList.remove("hidden");
            todoItemTitle.classList.add("checked");
         }
      })

      return () => {
         filterOption.classList.remove('selected')
      }
   }, [todoItems, todoList, showAll, filter])

   return (
      <div className="list-container">

         {
            todoList.length > 0
               ? todoList.map((item) => {
                  return (
                     <TodoItem key={item.id} todoItem={item} />
                  )
               }
               ) : null
         }

         <div className="list-footer">

            <div className="footer-1">{`${todoCount}`} items left</div>

            <div className="footer-2">
               <div id="all" onClick={() => {
                  setShowAll('true')
                  setFilter('all')
               }}
               >All</div>
               <div id="active" onClick={() => {
                  setFilter('active')
                  showActiveTasks()
               }}
               >Active</div>
               <div id="completed" onClick={() => {
                  setFilter('completed')
                  showCompletedTasks()
               }}
               >Completed</div>
            </div>

            <div className="footer-3" onClick={clearCompleted}>Clear Completed</div>

         </div>
      </div>
   )
}

export default List;