const testExpression = "2+2"

const expressionComponentSpliter = (expression) => {
  console.log("inputed expression: ", expression)
  let expressionComponents = []
  let expComponent = ""

  let isNumRegex = /^[0-9.]$/
  let isOperatorRegex = /^[-+*/]$/;

  const charENUM = ["Num", "NaN", "none"]
  let previousCharType = charENUM[2]
  let thisCharType = charENUM[2]

  // if (testExpression === "") {
  if (expression === "") {
    return "enter expression"
  }

  // for (const char of testExpression) {
  for (const char of expression) {
    if (isNumRegex.test(char)) {
      thisCharType = charENUM[0]
    } else {
      thisCharType = charENUM[1]
    } 

    if (thisCharType === previousCharType) {
      expComponent += char
    } else {
      if (expComponent.length !== 0) {
        expressionComponents.push(expComponent)
      }
      expComponent = char
      previousCharType = thisCharType
    }
  }
  expressionComponents.push(expComponent); //add last
  console.log(expressionComponents)

  // expressionUnaryFixer(expressionComponents)

  return expressionUnaryFixer(expressionComponents)
}

const expressionUnaryFixer = (expressionComponents) => {
  //trim expression components
  expressionComponents = expressionComponents.map(component => component.replaceAll(" ", ""));
  console.log("after trim : ", expressionComponents)


  const isNumRegex = /^[0-9.]$/
  const isOperatorRegex = /^[+\-*/]+$/;
  for (let i = 0; i < expressionComponents.length; i++){
    // console.log("checking component: ", expressionComponents[i])
    //if is an oparator component
    if (isOperatorRegex.test(expressionComponents[i])) {
      console.log("its indeed operator component: ",expressionComponents[i])
      if (i === expressionComponents.length - 1) {
        "there is indeed trailing oparators"
        expressionComponents.splice(i, 1)
        break
      }
      // if oparator component has only one oparator
      if (expressionComponents[i].length === 1) {
        // if has only one but its the first then its a - and convert it to unary oparator
        if (i === 0 && expressionComponents[i][0] == "-"){
          expressionComponents[i+1] = "-" + expressionComponents[i+1] // add - to next(i+1)  number set
          expressionComponents.splice(0,1) // remove the first element
          i--; // Adjust index after splicing
        } else if (i !== 0 && expressionComponents[i][0] == "-") {
          continue 
        }
      // now check if its a bunch of oparators if it finishes in - like +-*/*-+-
      } else if (expressionComponents[i].length !== 1){
        console.log("found banch of operators ", expressionComponents[i])
        // checks the i-th componenents last oparator
        if (expressionComponents[i][expressionComponents[i].length - 1] === "-") {
          expressionComponents[i+1] = "-" + expressionComponents[i+1]
          // Remove the last character from the operator sequence
          expressionComponents[i] = expressionComponents[i].slice(0, -1);
          // expressionComponents[i] = expressionComponents[i].slice(0,expressionComponents[i].length - 1)
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

const operatorReducer = (unaryExpComponents) => {
  console.log("**reducer**")
  const isNumRegex = /^[0-9.]$/
  const isOperatorRegex = /^[+\-*/]+$/;
  for (let i = 0; i < unaryExpComponents.length; i++){
    // console.log(i)
    if (isOperatorRegex.test(unaryExpComponents[i])
      &&
      unaryExpComponents[i].length !== 1
    ) {
      console.log("starting oparator reducer for ", unaryExpComponents[i])
      unaryExpComponents[i] = unaryExpComponents[i].slice(-1);
      console.log("reduced ",unaryExpComponents[i])
    }
  }
  const finalExp = unaryExpComponents
  console.log(finalExp)

  serialiazeExp(finalExp)

  return serialiazeExp(finalExp)
}

const serialiazeExp = (finalExp) => {
  let final = finalExp.join("")
  console.log("final: ",final)
  // functionizerExp(final)

  return functionizerExp(final)
}

const functionizerExp = (final) => {
  // Replace double negative signs with positive
  final = final.replace(/--/g, '+');

  let result = new Function('return ' + final)();

  if (Number.isInteger(result)) {
    return result
  } else {
    return parseFloat(result.toFixed(4))
  }
};

/*
flow of state
there is a state in Displayer that acts as a parent
resulter has access to this state through:
        <Resulter testExpression={this.state.testExpression} />
and keypad has acces to the state and to the function updateTestExpression through
        <Keypad testExpression={this.state.testExpression} updateTestExpression={this.updateTestExpression} />
Update teste expression only take a (parameter) and just sets a new state.
Now both keypad and resulter can access the state as props.
keypad calls upadateTestExpression and passes it its result in the logicCaller as 
    this.props.updateTestExpression(result)
and resulter only renders it in
          {this.props.testExpression}
*/

class Keypad extends React.Component {
  constructor(props) {
    super(props)
  }

  logicCaller = (expression) => {
    const result = expressionComponentSpliter(expression)
    this.props.updateTestExpression(result)
  }

  buttonHandler = (button) => {
    if (button >= "0" && button <= "9") {
      this.inputer(button)
    }
    if (button === "+" || button === "-" || button === "*" || button === "/" || button === "."){
      console.log(button, " is pressed")
      this.inputer(button)
    }
    if (button === "AC") {
      this.inputer("AC")
    }
    if (button === "=") {
      this.inputer("=")
    }
  }

  keyboardHandler = (event) => {
    const key = event.key.toLowerCase();
    switch (event.key) {
      case "0": case "1": case "2": case "3": case "4": 
      case "5": case "6": case "7": case "8": case "9": 
      case "+": case "-": case "*": case "/": case ".": 
        this.inputer(event.key)
        break
      case "Escape":
        this.inputer("AC")
        break
      case "=":
        this.inputer("=")
        break
      case "Enter":
        this.inputer("=")
        break
      case "x":
        this.inputer("*")
        break
      case "Backspace":
        this.inputer("back")
      case "z":
        this.inputer("z")
        break
      default:
        if (event.shiftKey) {
          return; // Ignore Shift key events
        }
        console.log("ERROR: Unknown key");
        return;
    }
  }

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
  
  inputer = (value) => {
    if (value >= 0 && value <= 9 || value === ".") {
      if (!this.checker(this.props.expression, value)) return; 
      this.props.updateExpression(this.props.expression + value)
      console.log(this.props.expression)
    }
    if (value === "+" || value === "-" || value === "*" || value === "/" ){
      this.props.updateExpression(this.props.expression + value)
      console.log(this.props.expression)
    }
    if (value === "back") {
      this.props.updateExpression(this.props.expression.slice(0, -1)); // Removes the last character
    }
    if (value === "AC") {
      console.log("AC")
      this.props.updateExpression("")
      // this.props.updateResult("")
      this.logicCaller("")
    }
    if (value === "=") {
      this.logicCaller(this.props.expression)
      console.log("equals pressed")
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyboardHandler)
  }
  //this needs to be explained
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyboardHandler)
  }
  render() {
    return (
      <div
        className="container p-4 bg-dark"
        style={{
          border: '2px solid #333',
          maxWidth: '250px',   // Set a max width for the container
          width: '100%',       // Ensure the container takes up the full available space within the max width
        }}
      >
        {/* A -> 789/ */}
        <div className="row d-flex justify-content-between mb-2">
          <div onClick={() => this.buttonHandler("7")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="7">
            7
          </div>
          <div onClick={() => this.buttonHandler("8")}  className="btn col-3 bg-warning rounded-circle text-center p-3" id="8">
            8
          </div>
          <div onClick={() => this.buttonHandler("9")}  className="btn col-3 bg-warning rounded-circle text-center p-3" id="9">
            9
          </div>
          <div onClick={() => this.buttonHandler("/")} className="btn col-3 bg-info rounded-circle text-center p-3" id="/">
            /
          </div>
        </div>
  
        {/* B -> 456* */}
        <div className="row d-flex justify-content-between mb-2">
          <div onClick={() => this.buttonHandler("4")}  className="btn col-3 bg-warning rounded-circle text-center p-3" id="4">
            4
          </div>
          <div onClick={() => this.buttonHandler("5")}  className="btn col-3 bg-warning rounded-circle text-center p-3" id="5">
            5
          </div>
          <div onClick={() => this.buttonHandler("6")}  className="btn col-3 bg-warning rounded-circle text-center p-3" id="6">
            6
          </div>
          <div onClick={() => this.buttonHandler("*")} className="btn col-3 bg-info rounded-circle text-center p-3" id="*">
            *
          </div>
        </div>
  
        {/* C -> 123- */}
        <div className="row d-flex justify-content-between mb-2">
          <div onClick={() => this.buttonHandler("1")}  className="btn col-3 bg-warning rounded-circle text-center p-3" id="1">
            1
          </div>
          <div onClick={() => this.buttonHandler("2")}  className="btn col-3 bg-warning rounded-circle text-center p-3" id="2">
            2
          </div>
          <div onClick={() => this.buttonHandler("3")}  className="btn col-3 bg-warning rounded-circle text-center p-3" id="3">
            3
          </div>
          <div onClick={() => this.buttonHandler("-")}  className="btn col-3 bg-info rounded-circle text-center p-3" id="-">
            -
          </div>
        </div>
  
        {/* D -> 0.+= */}
        <div className="row d-flex justify-content-between mb-2">
          <div onClick={() => this.buttonHandler("0")} className="btn col-3 bg-warning rounded-circle text-center p-3" id="0">
            0
          </div>
          <div onClick={() => this.buttonHandler(".")}  className="btn col-3 bg-warning rounded-circle text-center p-3" id=".">
            .
          </div>
          <div onClick={() => this.buttonHandler("=")}  className="btn col-3 bg-success rounded-circle text-center p-3" id="=">
            =
          </div>
          <div onClick={() => this.buttonHandler("+")}  className="btn col-3 bg-info rounded-circle text-center p-3" id="+">
            +
          </div>
        </div>
  
        {/* AC button */}
        <div onClick={() => this.buttonHandler("AC")}  className="btn col-12 bg-danger text-center p-3 font-weight-bold rounded" id="AC">
          AC
        </div>
      </div>
    );
  }  
}  

class Resulter extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container ">
        <div className="card shadow-sm border-0 rounded-3 p-3 text-center bg-light ">
          <p>{this.props.expression}</p>
          <p>{this.props.testExpression}</p>
        </div>
      </div>
    )
  }
}

class Displayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testExpression: "",
      expression: "",
      result: "",
    }
  }
  updateExpression = (inputExpression) => {
    this.setState ({
      expression: inputExpression
    })
  }
  updateTestExpression = (newExpression) => {
    this.setState ({
      testExpression: newExpression
    })
  }
  updateResult = (result) => {
    this.setState ({
      result: result
    })
  }
  render() {
    return (
      <div className="container p-4 bg-dark" style={{ maxWidth: '250px', border: '2px solid #333' }}>
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
    )
  }
}

ReactDOM.render(
  <div>
    <Displayer />
  </div>,
  document.getElementById("calculator")
)

class BoilerPlate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleChange = (event) => {

  }
  render() {
    return (
      <div>

      </div>
    )
  }
}