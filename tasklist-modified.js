// 2D Array to store tasks - each task is [taskText, priority]
let tasks = [];
// New 2D array to store date and time - each item is [dateString, timeString]
let taskDueDates = [];

// Array of random tasks for the random task feature - focused on health and student wellness
const randomTasks = [
  "Take a short walk",
  "Drink a glass of water",
  "Stretch for 5 minutes",
  "Practice deep breathing for 2 minutes",
  "Stand up and move around for 5 minutes",
  "Do a quick meditation session",
  "Write in a gratitude journal",
  "Have a healthy snack",
  "Rest your eyes for 2 minutes",
  "Fix your posture",
  "Do a quick workout",
  "Call a friend or family member",
  "Take a short nap",
  "Listen to calming music",
  "Drink a cup of tea",
  "Practice mindfulness for 5 minutes",
  "Step outside for fresh air",
  "Do a quick stretching routine"
];

// Get DOM elements
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');

// Function to validate date in MM/DD format
// TODO
/* 1. Create a function that validates the date string in MM/DD format
   2. Check if the string has exactly one '/' character
   3. Split the string by '/' and check if we have exactly 2 parts
   4. Check if both parts have exactly 2 digits
   5. Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
   6. Convert parts to numbers and check if month is between 1-12
   7. Check if day is valid for the given month (use an array for days in each month)
   8. Return true if date is valid, false otherwise
*/
function validateDate(dateStr) {
  //2. Check if the string has exactly one '/' character
    if (dateStr.indexOf('/') !== dateStr.lastIndexOf('/') || dateStr.indexOf('/') === -1) {
    // handle the error or invalid format
    return false;
  }
  //Split the string by '/' and check if we have exactly 2 parts
  const parts = dateStr.split('/');
  if (parts.length !== 2){
    return false 
  }
   const month = parts[0];
   const day = parts [1];

  //Check if both parts have exactly 2 digits
    if (month.length !== 2 || day.length !==2){
      return false;
    }

  // Verify that all characters are digits 
    for (let i = 0; i< month.length; i++){
      if (month.charCodeAt(i) < 48 || month.charCodeAt(i) > 57) {
        return false;
      }
    }
    for (let i = 0; i < day.length; i++){
      if (day.charCodeAt(i) < 48 || day.charCodeAt(i) > 57){
        return false;
      }
    }

 //Convert parts to numbers 
    const monthNum = parseInt(month,10);
    const dayNum = parseInt(day, 10);

//Check if month is between 1-12

if (monthNum < 1 || monthNum > 12 ){
  return false;
}

 //Check if day is valid for the given month (use an array for days in each month)   
  const daysInMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (dayNum < 1 || dayNum > daysInMonth[monthNum]){
    return false;
  } 
  
  return true;
}

// Function to validate time in 24-hour format (HH:MM)
// TODO
/* 1. Create a function that validates the time string in 24-hour (HH:MM) format
   2. Check if the string has exactly one ':' character
   3. Split the string by ':' and check if we have exactly 2 parts
   4. Check if both parts have exactly 2 digits
   5. Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
   6. Convert parts to numbers and check if hours are between 0-23
   7. Check if minutes are between 0-59
   8. Return true if time is valid, false otherwise
*/
function validateTime(timeStr) {
  // write the body of this function please
  //if (dateStr.indexOf)
  //Create a function that validates the time string in 24-hour (HH:MM) format
  if (timeStr.indexOf(':') !== timeStr.lastIndexOf(':') || timeStr.indexOf(':') === -1) {
    // handle the error or invalid format
    return false;
  }

  //Check if the string has exactly one ':' character
  const parts = timeStr.split(':');
  if (parts.length !== 2){
    return false 
  }
    const hours = parts[0];
   const minutes = parts [1];

//Check if both parts have exactly 2 digits
if (hours.length !== 2 || minutes.length !==2){
    return false;
  }
  
// Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
for (let i = 0; i< hours.length; i++){
    if (hours.charCodeAt(i) < 48 || hours.charCodeAt(i) > 57) {
      return false;
    }
  }
  for (let i = 0; i < minutes.length; i++){
    if (minutes.charCodeAt(i) < 48 || minutes.charCodeAt(i) > 57){
      return false;
    }
  }
  //Convert parts to numbers and check if hours are between 0-23
  const hoursNum = parseInt(hours,10);
  const minutesNum = parseInt(minutes, 10);

  if (hoursNum < 0 || hoursNum > 23 ){
    return false;
  }
 //Check if minutes are between 0-59

if (minutesNum < 0 || minutesNum > 59 ){
    return false;
  }
  
  return true;
}

// TODO
/* 1. Create a function that calculates priority based on date and time
   2. Get the current year using new Date().getFullYear()
   3. Parse the date and time from strings to numbers using:
      - Split dateStr by '/' and convert parts to numbers
      - Split timeStr by ':' and convert parts to numbers
   4. Create a new Date object with the provided date and time
      (Hint: new Date(year, month-1, day, hours, minutes))
   5. Return the timestamp (milliseconds since epoch) by using dueDate.getTime()
      (This will be used for sorting tasks by due date/time) 
      (This last return statement is already given to you.)
*/
function calculatePriority(dateStr, timeStr) {
  // Get current date
  // write the code to get the year
    let now = new Date();
    let currentYear = now.getFullYear();
  
  // Parse the date and time
  // write the code to parse the date and time
    const [month, day] = dateStr.split('/').map(Number) ;
    const [hours, minutes] = timeStr.split(':').map(Number) ;
  
  // Create a date object for the due date
  // write the code to create a date object for the due date
  let dueDate = new Date(currentYear , month-1, day, hours, minutes);

  // For sorting, we'll use a more precise priority based on exact timestamp
  // Return the timestamp itself for more accurate sorting
  return dueDate.getTime();
}



// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const dateStr = dateInput.value.trim();
  const timeStr = timeInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task first!');
    return;
  }
  
  if (!validateDate(dateStr)) {
    alert('Please enter a valid date in MM/DD format!');
    return;
  }
  
  if (!validateTime(timeStr)) {
    alert('Please enter a valid time in 24-hour format (HH:MM)!');
    return;
  }
  
  // Calculate priority based on date and time
  const priority = calculatePriority(dateStr, timeStr);
  console.log(priority);
  
  // Create task array [taskText, priority]
  const task = [taskText, priority];
  
  // Add to tasks array
  tasks.push(task);
  
  // Add to due dates array
  taskDueDates.push([dateStr, timeStr]);
  
  // Sort tasks by priority
  sortTasksByPriority();
  
  // Update task display
  updateTaskDisplay();
  
  // Clear the input field
  clearInput();
}

// Function to add a random task
function addRandomTask() {
  // Get random task from the array
  const randomIndex = Math.floor(Math.random() * randomTasks.length);
  const randomTask = randomTasks[randomIndex];
  
  // Set the task input value
  taskInput.value = randomTask;
  
  // Focus on the date input
  dateInput.focus();
}

// Function to sort tasks by priority and update the taskDueDates array accordingly
function sortTasksByPriority() {
  // Create an array of indices
  let indices = Array.from(Array(tasks.length).keys());
  
  // Sort indices based on due dates and times
  indices.sort(function(a, b) {
    // Get date and time from taskDueDates
    const dateA = taskDueDates[a][0];
    const timeA = taskDueDates[a][1];
    const dateB = taskDueDates[b][0];
    const timeB = taskDueDates[b][1];
    
    // Parse date components
    const [monthA, dayA] = dateA.split('/').map(Number);
    const [monthB, dayB] = dateB.split('/').map(Number);
    
    // Compare months first
    if (monthA !== monthB) {
      return monthA - monthB;
    }
    
    // If months are the same, compare days
    if (dayA !== dayB) {
      return dayA - dayB;
    }
    
    // If dates are the same, compare times
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [hoursB, minutesB] = timeB.split(':').map(Number);
    
    // Compare hours
    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    }
    
    // Compare minutes
    return minutesA - minutesB;
  });
  
  // Create new arrays based on sorted indices
  const newTasks = [];
  const newTaskDueDates = [];
  
  for (let i = 0; i < indices.length; i++) {
    newTasks.push(tasks[indices[i]]);
    newTaskDueDates.push(taskDueDates[indices[i]]);
  }
  
  // Replace original arrays with sorted arrays
  tasks = newTasks;
  taskDueDates = newTaskDueDates;
}

// Function to handle keypress (for Enter key)
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

// Assign the onkeydown property directly
taskInput.onkeydown = handleKeyPress;

// Function to clear the input fields
function clearInput() {
  taskInput.value = '';

  taskInput.focus();
}

// Function to update the task display
function updateTaskDisplay() {
  // Clear current task list
  taskList.innerHTML = '';
  
  // Add each task item using for loop as requested
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task[0]; // Task text is at index 0
    const dateStr = taskDueDates[i][0]; // Date string
    const timeStr = taskDueDates[i][1]; // Time string
    
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    // Create task details container
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    
    // Get current date
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Parse the date and time
    const [month, day] = dateStr.split('/').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    // Create a date object for the due date
    const dueDate = new Date(currentYear, month - 1, day, hours, minutes);
    
    // Calculate time difference in hours
    const diffMs = dueDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // Assign visible priority class based on time difference
    let priorityClass = 1; // Default to highest priority (red)
    if (diffHours < 0) {
      priorityClass = 1; // Overdue - highest priority (red)
    } else if (diffHours < 4) {
      priorityClass = 1; // Due within 4 hours - highest priority (red)
    } else if (diffHours < 24) {
      priorityClass = 2; // Due within a day (orange)
    } else if (diffHours < 48) {
      priorityClass = 3; // Due within 2 days (blue)
    } else if (diffHours < 72) {
      priorityClass = 4; // Due within 3 days (green)
    } else {
      priorityClass = 5; // Due later - lowest priority (gray)
    }
    
    // Create task text container
    const taskTextContainer = document.createElement('span');
    taskTextContainer.className = 'task-text';
    
    // Create priority dot element
    const priorityDot = document.createElement('span');
    priorityDot.className = `priority-indicator priority-${priorityClass}`;
    
    // Create the actual task text element
    const taskTextElement = document.createTextNode(taskText);
    
    // Create due date text
    const dueDateText = document.createElement('span');
    dueDateText.className = 'due-date-text';
    dueDateText.textContent = `Due: ${dateStr} at ${timeStr}`;
    
    // Create delete button with onclick attribute
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('onclick', `deleteTask(${i})`);
    
    // Append elements to containers
    taskTextContainer.appendChild(priorityDot);
    taskTextContainer.appendChild(taskTextElement);
    
    taskDetails.appendChild(taskTextContainer);
    taskDetails.appendChild(dueDateText);
    
    listItem.appendChild(taskDetails);
    listItem.appendChild(deleteButton);
    
    // Append list item to task list
    taskList.appendChild(listItem);
  }
}

// Function to delete a specific task
function deleteTask(index) {
  // Remove task from both arrays
  tasks.splice(index, 1);
  taskDueDates.splice(index, 1);
  
  // Update the display
  updateTaskDisplay();
}

// Function to clear all tasks
function clearTasks() {
  // Clear both arrays
  tasks = [];
  taskDueDates = [];
  
  // Update the display
  updateTaskDisplay();
}

// Initial input field setup and display update
window.onload = function() {
  // Initial update of task display
  updateTaskDisplay();
};