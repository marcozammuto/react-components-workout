import React from "react";
import { useState } from "react";
import calculator from "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState(0);
  const [output, setOutput] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [decimalClicked, setDecimalClicked] = useState(false);
  const [equalsClicked, setEqualsClicked] = useState(false);
  const [operatorClicked, setOperatorClicked] = useState(false);
  const [rightBegin, setRightBegin] = useState(false);
  const [zeroReset, setZeroReset] = useState(false);
  const [sameSymbolClicked, setSameSymbolClicked] = useState("");
  const [symbolClicked, setSymbolClicked] = useState(false);

  const addNum = (num) => {
    if (num && zeroReset) {
      console.log("Zero error");
    } else {
      let arr = [input];
      if (arr[0] === 0) {
        arr.shift();
      }
      arr.push(num);
      let result = arr.join("");
      if (result.includes("=")) {
        result = result[result.length - 1];
      }
      const lastNumRegex = /\d+$/;
      let lastNum = result.match(lastNumRegex);
      if (decimalClicked) {
        const lastNumRegex = /[+\-*/]?(\d+\.?\d*)$/;
        let lastNumMatch = result.match(lastNumRegex);
        if (lastNumMatch) {
          let lastNum = lastNumMatch[1];
          setInput(result);
          setOutput(lastNum);
          setCurrentNumber(lastNum);
          setRightBegin(true);
          setDecimalClicked(true);
          setEqualsClicked(false);
          setSameSymbolClicked("");
          setZeroReset(false);
        } else {
          setInput(result);
          setOutput(result);
          setCurrentNumber(`${currentNumber}${lastNum}`);
          setRightBegin(true);
          setDecimalClicked(true);
          setEqualsClicked(false);
          setSameSymbolClicked("");
          setZeroReset(false);
        }
      } else {
        setInput(result);
        setOutput(lastNum);
        setCurrentNumber(lastNum);
        setRightBegin(true);
        setDecimalClicked(true);
        setEqualsClicked(false);
        setSameSymbolClicked("");
        setZeroReset(false);
      }
    }
  };
  const decimal = () => {
    if (decimalClicked && sameSymbolClicked) {
      setInput(`${input}.`);
      setOutput(`${output}.`);
      setCurrentNumber(`${currentNumber}.`);
      setDecimalClicked(true);
      setZeroReset(false);
    }
    if (equalsClicked) {
      setInput(0 + ".");
      setOutput(0 + "."), setCurrentNumber(0 + ".");
      setDecimalClicked(true);
      setZeroReset(false);
    } else {
      console.log("Decimal error");
    }
  };

  const addOperator = (symb) => {
    if (rightBegin && symb !== sameSymbolClicked && !equalsClicked) {
      setInput(`${input}${symb}`);
      setOutput(symb);
      setCurrentNumber("0");
      setDecimalClicked(false);
      setZeroReset(false);
      setSameSymbolClicked(symb);
      setEqualsClicked(false);
      setSymbolClicked(true);
    } else if (rightBegin && symb !== sameSymbolClicked && equalsClicked) {
      const resultAfterEquals = /(?<==)\d*/.exec(input);
      console.log(resultAfterEquals);
      setInput(`${resultAfterEquals}${symb}`);
      setOutput(symb);
      setCurrentNumber(resultAfterEquals);
      setDecimalClicked(true);
      setZeroReset(true);
      setSameSymbolClicked(symb);
      setEqualsClicked(false);
      setSymbolClicked(true);
    } else {
      console.log("Symbol error");
    }
  };

  const clear = () => {
    setInput(0);
    setOutput(0);
    setCurrentNumber(0);
    setDecimalClicked(false);
    setEqualsClicked(false);
    setOperatorClicked(false);
    setRightBegin(false);
    setZeroReset(false);
    setSameSymbolClicked("");
    setSymbolClicked(false);
  };

  const equals = () => {
    let amount = input;
    let pointFilter = "";
    if (amount.includes("=")) {
      amount = amount.replace("=", "");
    }
    const dotRegex = /\.{2,}/g;
    if (amount.match(dotRegex)) {
      pointFilter = amount.replace(dotRegex, ".");
    } else {
      pointFilter = amount;
    }
    const multipleDotsRegex = /(?<=\d\.\d)\.(?=\d)/g;
    if (pointFilter.match(multipleDotsRegex)) {
      pointFilter = pointFilter.replace(multipleDotsRegex, "");
    }
    const commaZeroRegex = /\.0/g;
    if (pointFilter.match(commaZeroRegex)) {
      let result = `${eval(pointFilter)}.0`;
      setOutput(result);
      setZeroReset(true);
    }
    const multipleOperatorsRegex = /(?<=\d)[+*-\/]{2,}(?=\d)/g;
    let match = pointFilter.match(multipleOperatorsRegex);
    if (match) {
      let stringer = match.toString();
      if (stringer.endsWith("+")) {
        pointFilter = pointFilter.replace(multipleOperatorsRegex, "+");
      } else if (stringer.endsWith("*")) {
        pointFilter = pointFilter.replace(multipleOperatorsRegex, "*");
      } else if (stringer.endsWith("/")) {
        pointFilter = pointFilter.replace(multipleOperatorsRegex, "/");
      }
    }
    let result = eval(pointFilter);

    const zeroCommaRegex = /^0\./;
    if (pointFilter.match(zeroCommaRegex)) {
      let result = `0${pointFilter}`;
      setState({
        input: result,
      });
    }

    setState({
      input: `${pointFilter}=${result}`,
      output: result,
      currentNumber: result,
      decimalClicked: true,
      rightBegin: true,
      zeroReset: true,
      sameSymbolClicked: "",
      equalsClicked: true,
    });
  };

  return (
    <div id="calculator">
      <div id="display-wrap">
        <p id="input">{input}</p>
        <p id="display">{output}</p>
      </div>
      <div id="keyboard">
        <button id="clear" className="jumbo" onClick={() => clear()}>
          AC
        </button>
        <button id="decimal" className="operator" onClick={() => decimal()}>
          .
        </button>
        <button id="add" className="operator" onClick={() => addOperator("+")}>
          +
        </button>
        <button id="seven" className="unit">
          7
        </button>
        <button id="eight" className="unit">
          8
        </button>
        <button id="nine" className="unit">
          9
        </button>
        <button
          id="subtract"
          className="operator"
          onClick={() => addOperator("-")}
        >
          -
        </button>
        <button id="four" className="unit" onClick={() => addNum(4)}>
          4
        </button>
        <button id="five" className="unit" onClick={() => addNum(5)}>
          5
        </button>
        <button id="six" className="unit" onClick={() => addNum(6)}>
          6
        </button>
        <button
          id="multiply"
          className="operator"
          onClick={() => addOperator("*")}
        >
          x
        </button>
        <button id="one" className="unit" onClick={() => addNum(1)}>
          1
        </button>
        <button id="two" className="unit" onClick={() => addNum(2)}>
          2
        </button>
        <button id="three" className="unit" onClick={() => addNum(3)}>
          3
        </button>
        <button
          id="divide"
          className="operator"
          onClick={() => addOperator("/")}
        >
          /
        </button>
        <button id="zero" className="unit" onClick={() => addNum(0)}>
          0
        </button>

        <button id="equals" className="jumbo" onClick={() => equals()}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
