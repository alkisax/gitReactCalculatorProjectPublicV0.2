# Calculator App Overview

This calculator app was created in **January 2025** as part of a learning project for the **FreeCodeCamp React lesson**. It is a fully functional calculator that allows users to perform basic arithmetic operations, including addition, subtraction, multiplication, and division. The app also supports advanced features like handling unary operators (e.g., negative numbers) and reducing multiple consecutive operators into a single operator. 

**Note**: This README was auto-created in large part using generative AI, with careful checking and supervision by the app creator.

## Main Features

### 1. **Expression Parsing**
- The app can parse arithmetic expressions entered by the user, breaking them down into individual components (numbers and operators).
- It handles edge cases like multiple decimal points, leading zeros, and invalid inputs.

### 2. **Unary Operator Handling**
- The app correctly processes unary operators, such as negative numbers (e.g., `-3`), and ensures they are evaluated properly.

### 3. **Operator Reduction**
- If multiple operators are entered consecutively (e.g., `++`, `--`, `+-`), the app reduces them to a single operator for accurate evaluation.

### 4. **Real-Time Evaluation**
- The app evaluates expressions in real-time and displays the result dynamically.
- It supports both keyboard and button inputs for a seamless user experience.

### 5. **State Management**
- The app uses React's state management to track the current expression, result, and intermediate calculations.
- State updates are passed between components (e.g., `Keypad` and `Resulter`) to ensure consistent rendering.

### 6. **User Interface**
- The app features a clean and intuitive user interface built with **Bootstrap**.
- Buttons are organized into a grid layout, and the display area shows the current expression and result.

### 7. **Error Handling**
- The app includes basic error handling to prevent invalid inputs (e.g., multiple decimal points or leading zeros) and provides feedback to the user.

## How It Works
1. **Input Handling**: The user can input numbers and operators using either the on-screen buttons or the keyboard.
2. **Expression Processing**: The input is parsed and processed to handle unary operators and reduce multiple operators.
3. **Evaluation**: The processed expression is evaluated, and the result is displayed in real-time.
4. **State Updates**: The app updates its state with the current expression and result, ensuring the UI reflects the latest calculations.

## Technologies Used
- **React**: For building the component-based architecture and managing state.
- **Bootstrap**: For styling the user interface and ensuring responsiveness.
- **JavaScript**: For implementing the core logic of expression parsing and evaluation.

## Learning Outcomes
This project was designed to reinforce key React concepts, including:
- Component composition and state management.
- Event handling and user input processing.
- Dynamic rendering and real-time updates.
- Debugging and error handling in a React application.



# Splitting an Arithmetic Expression into Components

The `expressionComponentSpliter` function takes an arithmetic expression in string format and breaks it down into its individual components: numbers and operators. This is useful for parsing and evaluating expressions in a structured manner.

## 1. Code Overview

```javascript
const expressionComponentSpliter = (expression) => {
  console.log("inputed expression: ", expression);
  let expressionComponents = [];
  let expComponent = "";

  let isNumRegex = /^[0-9.]$/;
  let isOperatorRegex = /^[-+*/]$/;

  const charENUM = ["Num", "NaN", "none"];
  let previousCharType = charENUM[2];
  let thisCharType = charENUM[2];

  if (expression === "") {
    return "enter expression";
  }

  for (const char of expression) {
    if (isNumRegex.test(char)) {
      thisCharType = charENUM[0];
    } else {
      thisCharType = charENUM[1];
    } 

    if (thisCharType === previousCharType) {
      expComponent += char;
    } else {
      if (expComponent.length !== 0) {
        expressionComponents.push(expComponent);
      }
      expComponent = char;
      previousCharType = thisCharType;
    }
  }
  expressionComponents.push(expComponent); // add last component
  console.log(expressionComponents);

  return expressionUnaryFixer(expressionComponents);
};
```

## 2. Detailed Explanation

### Initial Setup & Logging
- The function starts by logging the received expression for debugging purposes.
- It initializes an empty array `expressionComponents` to hold the tokens and a temporary string `expComponent` for building individual tokens.

```javascript
console.log("inputed expression: ", expression);
let expressionComponents = [];
let expComponent = "";
```

### Regular Expressions
- Two regex patterns are defined:
  - `isNumRegex`: Checks if a character is a number or a decimal point (`/^[0-9.]$/`).
  - `isOperatorRegex`: Checks if a character is one of the basic arithmetic operators (`/^[-+*/]$/`).
- An enumeration (`charENUM`) is used to differentiate between number characters and operator characters.

```javascript
let isNumRegex = /^[0-9.]$/;
let isOperatorRegex = /^[-+*/]$/;
const charENUM = ["Num", "NaN", "none"];
```

### Handling Empty Input
- Before processing, the function checks if the input string is empty. If it is, a message prompts the user to enter an expression.

```javascript
if (expression === "") {
  return "enter expression";
}
```

### Iterating Through Characters
- The function loops through each character in the input string.
- It determines whether the character is a number or an operator.
- If a character is of the same type as the previous character, it is appended to the current token (`expComponent`).
- Otherwise, the completed token is pushed to `expressionComponents`, and a new token starts.

```javascript
for (const char of expression) {
  if (isNumRegex.test(char)) {
    thisCharType = charENUM[0];
  } else {
    thisCharType = charENUM[1];
  } 

  if (thisCharType === previousCharType) {
    expComponent += char;
  } else {
    if (expComponent.length !== 0) {
      expressionComponents.push(expComponent);
    }
    expComponent = char;
    previousCharType = thisCharType;
  }
}
```

### Finalizing the Components
- After the loop, the last token is added to the array.
- The function logs the extracted components for debugging.
- Finally, it returns the processed components after passing them to `expressionUnaryFixer`.

```javascript
expressionComponents.push(expComponent);
console.log(expressionComponents);
return expressionUnaryFixer(expressionComponents);
```


# Fixing Unary Operators in an Arithmetic Expression

The `expressionUnaryFixer` function processes a list of components representing an arithmetic expression to handle unary operators and clean up the expression by adjusting components where necessary.

## 1. Code Overview

```javascript
const expressionUnaryFixer = (expressionComponents) => {
  //trim expression components
  expressionComponents = expressionComponents.map(component => component.replaceAll(" ", ""));
  console.log("after trim : ", expressionComponents)

  const isNumRegex = /^[0-9.]$/
  const isOperatorRegex = /^[+\-*/]+$/;
  for (let i = 0; i < expressionComponents.length; i++){
    // console.log("checking component: ", expressionComponents[i])
    //if is an operator component
    if (isOperatorRegex.test(expressionComponents[i])) {
      console.log("its indeed operator component: ",expressionComponents[i])
      if (i === expressionComponents.length - 1) {
        "there is indeed trailing operators"
        expressionComponents.splice(i, 1)
        break
      }
      // if operator component has only one operator
      if (expressionComponents[i].length === 1) {
        // if it's the first and it's a minus, convert it to unary operator
        if (i === 0 && expressionComponents[i][0] == "-"){
          expressionComponents[i+1] = "-" + expressionComponents[i+1] // add - to next(i+1) number set
          expressionComponents.splice(0,1) // remove the first element
          i--; // Adjust index after splicing
        } else if (i !== 0 && expressionComponents[i][0] == "-") {
          continue 
        }
      // Now check if it's a bunch of operators like +-*/*-+-
      } else if (expressionComponents[i].length !== 1){
        console.log("found bunch of operators ", expressionComponents[i])
        // check if the last operator in the sequence is a minus
        if (expressionComponents[i][expressionComponents[i].length - 1] === "-") {
          expressionComponents[i+1] = "-" + expressionComponents[i+1]
          // Remove the last character from the operator sequence
          expressionComponents[i] = expressionComponents[i].slice(0, -1);
        } else {
          continue
        }
      }
    }
  }
  const unaryExpComponents = expressionComponents
  console.log(unaryExpComponents)

  // operatorReducer(unaryExpComponents)

  return operatorReducer(unaryExpComponents)
}
```

## 2. Detailed Explanation

### Trimming Expression Components
- First, all spaces are removed from the components of the expression to ensure clean processing.

```javascript
expressionComponents = expressionComponents.map(component => component.replaceAll(" ", ""));
```

### Identifying Operators and Numbers
- The function uses two regular expressions:
  - `isNumRegex`: Checks for numeric characters or decimal points (`/^[0-9.]$/`).
  - `isOperatorRegex`: Matches arithmetic operators (`/^[+\-*/]+$/`).
  
```javascript
const isNumRegex = /^[0-9.]$/;
const isOperatorRegex = /^[+\-*/]+$/;
```

### Looping Through Components
- The function iterates through each component to identify and handle unary operators:
  - If a component is an operator:
    - If it's the last component in the expression, it removes it (if it's a trailing operator).
    - If it’s a single operator (e.g., `+`, `-`), it checks whether it’s at the start of the expression or after another operator. If it’s the first, it converts it into a unary operator (e.g., `-3` becomes `-3`).
    - If there is a sequence of operators (e.g., `+*-`), it processes the last operator and adjusts the next number accordingly.

```javascript
for (let i = 0; i < expressionComponents.length; i++) {
  // logic to handle operators and unary operator adjustment
}
```

### Finalizing and Returning Components
- Once the unary operators are fixed, the function passes the components to another function (`operatorReducer`), which is responsible for further reduction and returning the final result.

```javascript
const unaryExpComponents = expressionComponents;
return operatorReducer(unaryExpComponents);
```

Got it! Here's the corrected response in proper Markdown format, using `#`, `##`, `###`, and ``` for code blocks. You can copy and paste this directly into your `README.md`:

---

# Reducing Multiple Operators in an Arithmetic Expression

The `operatorReducer` function processes a list of components representing an arithmetic expression to reduce multiple consecutive operators into a single operator. This ensures that the expression is simplified and ready for final evaluation.

## Code Overview

```javascript
const operatorReducer = (unaryExpComponents) => {
  console.log("**reducer**");
  const isNumRegex = /^[0-9.]$/;
  const isOperatorRegex = /^[+\-*/]+$/;
  for (let i = 0; i < unaryExpComponents.length; i++) {
    if (
      isOperatorRegex.test(unaryExpComponents[i]) &&
      unaryExpComponents[i].length !== 1
    ) {
      console.log("starting operator reducer for ", unaryExpComponents[i]);
      unaryExpComponents[i] = unaryExpComponents[i].slice(-1);
      console.log("reduced ", unaryExpComponents[i]);
    }
  }
  const finalExp = unaryExpComponents;
  console.log(finalExp);

  serialiazeExp(finalExp);

  return serialiazeExp(finalExp);
};
```

## Detailed Explanation

### Initial Setup & Logging
The function starts by logging a message to indicate the start of the operator reduction process. Two regular expressions are defined:
- `isNumRegex`: Checks if a character is a number or a decimal point (`/^[0-9.]$/`).
- `isOperatorRegex`: Checks if a character is one of the basic arithmetic operators (`/^[+\-*/]+$/`).

```javascript
console.log("**reducer**");
const isNumRegex = /^[0-9.]$/;
const isOperatorRegex = /^[+\-*/]+$/;
```

### Iterating Through Components
The function loops through each component in the `unaryExpComponents` array. It checks if the current component is an operator and if it has more than one character (indicating multiple consecutive operators).

```javascript
for (let i = 0; i < unaryExpComponents.length; i++) {
  if (
    isOperatorRegex.test(unaryExpComponents[i]) &&
    unaryExpComponents[i].length !== 1
  ) {
    // Reduction logic
  }
}
```

### Reducing Multiple Operators
If the component is a sequence of operators (e.g., `++`, `--`, `+-`), it reduces it to the last operator in the sequence using `slice(-1)`. This ensures that only the final operator in the sequence is retained, simplifying the expression.

```javascript
console.log("starting operator reducer for ", unaryExpComponents[i]);
unaryExpComponents[i] = unaryExpComponents[i].slice(-1);
console.log("reduced ", unaryExpComponents[i]);
```

### Finalizing the Expression
After reducing all operator sequences, the function logs the final components for debugging. It then passes the reduced components to the `serialiazeExp` function for further processing and returns the result.

```javascript
const finalExp = unaryExpComponents;
console.log(finalExp);

serialiazeExp(finalExp);

return serialiazeExp(finalExp);
```


# Serializing and Evaluating the Final Expression

The `serialiazeExp` and `functionizerExp` functions work together to serialize the final expression components into a single string and evaluate it to produce the result.

## Code Overview

```javascript
const serialiazeExp = (finalExp) => {
  let final = finalExp.join("");
  console.log("final: ", final);
  return functionizerExp(final);
};

const functionizerExp = (final) => {
  // Replace double negative signs with positive
  final = final.replace(/--/g, "+");

  let result = new Function("return " + final)();

  if (Number.isInteger(result)) {
    return result;
  } else {
    return parseFloat(result.toFixed(4));
  }
};
```

## Detailed Explanation

### `serialiazeExp` Function
The `serialiazeExp` function takes the final components of the expression (`finalExp`) and joins them into a single string. This string represents the complete arithmetic expression ready for evaluation.

#### Key Steps:
1. **Joining Components**: The `join("")` method concatenates all components into a single string.
2. **Logging the Final Expression**: The function logs the final expression for debugging purposes.
3. **Passing to `functionizerExp`**: The joined string is passed to the `functionizerExp` function for evaluation.

```javascript
let final = finalExp.join("");
console.log("final: ", final);
return functionizerExp(final);
```

### `functionizerExp` Function
The `functionizerExp` function evaluates the serialized expression string and returns the computed result. It also handles edge cases like double negatives and ensures the result is formatted correctly.

#### Key Steps:
1. **Replacing Double Negatives**: Double negative signs (`--`) are replaced with a positive sign (`+`) to simplify the expression.
2. **Evaluating the Expression**: The `new Function()` constructor is used to dynamically evaluate the expression string. This is a powerful but potentially risky feature, so it should only be used with trusted input.
3. **Formatting the Result**:
   - If the result is an integer, it is returned as-is.
   - If the result is a floating-point number, it is rounded to 4 decimal places for precision.

```javascript
final = final.replace(/--/g, "+");
let result = new Function("return " + final)();

if (Number.isInteger(result)) {
  return result;
} else {
  return parseFloat(result.toFixed(4));
}
```


# Keypad Component: Core Logic and Functionality

The `Keypad` component is a React class component responsible for handling user input in a calculator application. It interacts with the parent component (`Displayer`) to update and display the state. Below is a breakdown of its core logic and functionality.

## State Flow

The state is managed in the parent component (`Displayer`), and the `Keypad` component accesses and updates this state via props. Here's how the state flow works:

- The `Resulter` component accesses the state through:
  ```jsx
  <Resulter testExpression={this.state.testExpression} />
  ```
- The `Keypad` component accesses the state and the `updateTestExpression` function through:
  ```jsx
  <Keypad testExpression={this.state.testExpression} updateTestExpression={this.updateTestExpression} />
  ```
- The `updateTestExpression` function updates the state with a new value:
  ```javascript
  this.props.updateTestExpression(result);
  ```
- The `Resulter` component renders the state:
  ```jsx
  {this.props.testExpression}
  ```

## Core Logic

### `logicCaller` Method
This method processes the expression and updates the state with the result:
```javascript
logicCaller = (expression) => {
  const result = expressionComponentSpliter(expression);
  this.props.updateTestExpression(result);
};
```

### `buttonHandler` Method
This method handles button clicks and delegates to the `inputer` function:
```javascript
buttonHandler = (button) => {
  if (button >= "0" && button <= "9") {
    this.inputer(button);
  }
  if (button === "+" || button === "-" || button === "*" || button === "/" || button === ".") {
    console.log(button, " is pressed");
    this.inputer(button);
  }
  if (button === "AC") {
    this.inputer("AC");
  }
  if (button === "=") {
    this.inputer("=");
  }
};
```

### `keyboardHandler` Method
This method maps keyboard input to calculator functions:
```javascript
keyboardHandler = (event) => {
  const key = event.key.toLowerCase();
  switch (event.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "+":
    case "-":
    case "*":
    case "/":
    case ".":
      this.inputer(event.key);
      break;
    case "Escape":
      this.inputer("AC");
      break;
    case "=":
      this.inputer("=");
      break;
    case "Enter":
      this.inputer("=");
      break;
    case "x":
      this.inputer("*");
      break;
    case "Backspace":
      this.inputer("back");
      break;
    case "z":
      this.inputer("z");
      break;
    default:
      if (event.shiftKey) {
        return; // Ignore Shift key events
      }
      console.log("ERROR: Unknown key");
      return;
  }
};
```

### `checker` Method
This method validates input to prevent invalid expressions:
```javascript
checker = (expression, value) => {
  // Prevent multiple leading zeros
  if (value === "0") {
    const lastNumber = expression.split(/[-+*/]/).pop(); // Get last number
    if (lastNumber === "0") {
      return false; // Block input if number is just "0"
    }
  }

  // Prevent multiple decimal points in one number
  if (value === ".") {
    const lastNumber = expression.split(/[-+*/]/).pop(); // Get last number
    if (lastNumber.includes(".")) {
      return false; // Block input if number already has a decimal
    }
  }

  return true; // Allow valid inputs
};
```

### `inputer` Method
This method processes input and updates the expression:
```javascript
inputer = (value) => {
  if ((value >= 0 && value <= 9) || value === ".") {
    if (!this.checker(this.props.expression, value)) return;
    this.props.updateExpression(this.props.expression + value);
    console.log(this.props.expression);
  }
  if (value === "+" || value === "-" || value === "*" || value === "/") {
    this.props.updateExpression(this.props.expression + value);
    console.log(this.props.expression);
  }
  if (value === "back") {
    this.props.updateExpression(this.props.expression.slice(0, -1)); // Removes the last character
  }
  if (value === "AC") {
    console.log("AC");
    this.props.updateExpression("");
    this.logicCaller("");
  }
  if (value === "=") {
    this.logicCaller(this.props.expression);
    console.log("equals pressed");
  }
};
```

### Lifecycle Methods
- `componentDidMount`: Adds a keyboard event listener when the component mounts.
- `componentWillUnmount`: Removes the keyboard event listener when the component unmounts.

```javascript
componentDidMount() {
  document.addEventListener("keydown", this.keyboardHandler);
}

componentWillUnmount() {
  document.removeEventListener("keydown", this.keyboardHandler);
}
```

# Keypad Component: Render Method

The `render` method of the `Keypad` component is responsible for rendering the calculator's user interface. It creates a grid of buttons for digits, operators, and special functions (e.g., `AC` and `=`). Below is a breakdown of its structure and functionality.

## UI Structure

The UI is structured as a grid of buttons, organized into rows and columns. Each button is styled using Bootstrap classes and has an `onClick` handler to trigger the `buttonHandler` method.

### Container
The outer container defines the calculator's layout and styling:
```jsx
<div
  className="container p-4 bg-dark"
  style={{
    border: '2px solid #333',
    maxWidth: '250px',   // Set a max width for the container
    width: '100%',       // Ensure the container takes up the full available space within the max width
  }}
>
```

### Button Rows
The buttons are organized into rows, with each row containing a set of related buttons (e.g., digits, operators).

#### Row A: Buttons for 7, 8, 9, and Division (/)
```jsx
<div className="row d-flex justify-content-between mb-2">
  <div onClick={() => this.buttonHandler("7")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="7">
    7
  </div>
  <div onClick={() => this.buttonHandler("8")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="8">
    8
  </div>
  <div onClick={() => this.buttonHandler("9")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="9">
    9
  </div>
  <div onClick={() => this.buttonHandler("/")} className="btn col-3 bg-info rounded-circle text-center p-3" id="/">
    /
  </div>
</div>
```

#### Row B: Buttons for 4, 5, 6, and Multiplication (*)
```jsx
<div className="row d-flex justify-content-between mb-2">
  <div onClick={() => this.buttonHandler("4")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="4">
    4
  </div>
  <div onClick={() => this.buttonHandler("5")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="5">
    5
  </div>
  <div onClick={() => this.buttonHandler("6")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="6">
    6
  </div>
  <div onClick={() => this.buttonHandler("*")} className="btn col-3 bg-info rounded-circle text-center p-3" id="*">
    *
  </div>
</div>
```

#### Row C: Buttons for 1, 2, 3, and Subtraction (-)
```jsx
<div className="row d-flex justify-content-between mb-2">
  <div onClick={() => this.buttonHandler("1")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="1">
    1
  </div>
  <div onClick={() => this.buttonHandler("2")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="2">
    2
  </div>
  <div onClick={() => this.buttonHandler("3")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="3">
    3
  </div>
  <div onClick={() => this.buttonHandler("-")} className="btn col-3 bg-info rounded-circle text-center p-3" id="-">
    -
  </div>
</div>
```

#### Row D: Buttons for 0, Decimal (.), Equals (=), and Addition (+)
```jsx
<div className="row d-flex justify-content-between mb-2">
  <div onClick={() => this.buttonHandler("0")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="0">
    0
  </div>
  <div onClick={() => this.buttonHandler(".")} className="btn col-3 bg-warning rounded-circle text-center p-3" id=".">
    .
  </div>
  <div onClick={() => this.buttonHandler("=")} className="btn col-3 bg-success rounded-circle text-center p-3" id="=">
    =
  </div>
  <div onClick={() => this.buttonHandler("+")} className="btn col-3 bg-info rounded-circle text-center p-3" id="+">
    +
  </div>
</div>
```

#### AC Button
The `AC` (All Clear) button resets the calculator:
```jsx
<div onClick={() => this.buttonHandler("AC")} className="btn col-12 bg-danger text-center p-3 font-weight-bold rounded" id="AC">
  AC
</div>
```

## Styling
- **Bootstrap Classes**: The buttons use Bootstrap classes like `btn`, `col-3`, `rounded-circle`, and `text-center` for consistent styling and layout.
- **Custom Styles**: Inline styles are used for the container's border and max width.

## Event Handling
Each button has an `onClick` handler that calls the `buttonHandler` method with the corresponding value (e.g., `"7"`, `"+"`, `"="`). This method processes the input and updates the calculator's state.

```jsx
onClick={() => this.buttonHandler("7")}
```

# Resulter and Displayer Components

The `Resulter` and `Displayer` components work together to manage and display the state of the calculator application. Below is a breakdown of their structure and functionality.

## Resulter Component

The `Resulter` component is responsible for displaying the current expression and result. It receives these values as props from the parent component (`Displayer`).

### Code
```javascript
class Resulter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="card shadow-sm border-0 rounded-3 p-3 text-center bg-light">
          <p>{this.props.expression}</p>
          <p>{this.props.testExpression}</p>
        </div>
      </div>
    );
  }
}
```

### Key Features
- **Props**: Receives `expression` and `testExpression` as props to display the current input and result.
- **Styling**: Uses Bootstrap classes like `card`, `shadow-sm`, and `rounded-3` for a clean and modern look.

## Displayer Component

The `Displayer` component acts as the parent component, managing the state and passing it down to `Resulter` and `Keypad`.

### Code
```javascript
class Displayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testExpression: "",
      expression: "",
      result: "",
    };
  }

  // Updates the expression state
  updateExpression = (inputExpression) => {
    this.setState({
      expression: inputExpression,
    });
  };

  // Updates the testExpression state
  updateTestExpression = (newExpression) => {
    this.setState({
      testExpression: newExpression,
    });
  };

  // Updates the result state
  updateResult = (result) => {
    this.setState({
      result: result,
    });
  };

  render() {
    return (
      <div className="container p-4 bg-dark" style={{ maxWidth: "250px", border: "2px solid #333" }}>
        <Resulter
          testExpression={this.state.testExpression}
          expression={this.state.expression}
          result={this.state.result}
        />
        <Keypad
          testExpression={this.state.testExpression}
          updateTestExpression={this.updateTestExpression}
          expression={this.state.expression}
          updateExpression={this.updateExpression}
          result={this.state.result}
          updateResult={this.updateResult}
        />
      </div>
    );
  }
}
```

### Key Features
- **State Management**: Manages three pieces of state:
  - `testExpression`: Stores the evaluated result.
  - `expression`: Stores the current input expression.
  - `result`: Stores the final computed result.
- **Update Methods**: Provides methods (`updateExpression`, `updateTestExpression`, `updateResult`) to update the state, which are passed down to `Keypad`.
- **Rendering**: Renders the `Resulter` and `Keypad` components, passing the necessary state and methods as props.

## Rendering the Application

The `ReactDOM.render` method mounts the `Displayer` component into the DOM, initializing the calculator application.

### Code
```javascript
ReactDOM.render(
  <div>
    <Displayer />
  </div>,
  document.getElementById("calculator")
);
```

### Key Features
- **Mounting**: The `Displayer` component is rendered inside the DOM element with the ID `calculator`.


