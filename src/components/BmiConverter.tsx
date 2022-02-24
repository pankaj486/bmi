import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, addDate } from '../state/action-creator/BmiAction';
import Plot from 'react-plotly.js';
import "./BmiConverter.css";
import { useTypedSelector } from '../hooks/use-typed-selector';



debugger


interface Inputs {
    height: any;
    weight: any;
    date: string;
}


const BmiConverter: React.FC = () => {

    const name = useRef("");


    const [text, setText] = useState<Inputs>({
        weight: '',
        height: '',
        date: ""
    });

    const onChangeHandler = (event: any) => {
        const { name, value } = event.target
        setText((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const dispatch = useDispatch();
    // debugger
    const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const userHeight = text.height;
        if (!userHeight) { return }
        const userWeight = text.weight;
        if (!userWeight) { return }
        const heightInCm = userHeight / 100;
        // console.log(heightInCm, userWeight)
        const bmiConverter = Math.round(userWeight / heightInCm ** 2);
        const myDate = text.date;
        if (!myDate) { return }
        // console.log(bmiConverter);
        dispatch(addTask(bmiConverter));
        dispatch(addDate(myDate));
    }


    const myBmiData = useTypedSelector(({ bmiConverter }) => bmiConverter.bmiData)
    console.log(myBmiData);
    const myBmiDate = useTypedSelector(({ bmiConverter }) => bmiConverter.bmiDate)
    console.log(myBmiDate);


    const list1 = myBmiDate.map((date) => {
        return date;
    })

    const list2 = myBmiData.map((data) => {
        return data;
    })



    return (
        <div>
            {/* <Test /> */}

            <div>
                <h3 className="h3-text">BMI Tracker</h3>
                <div className="input">
                    <div className="input-inline">
                        <label className="text-color">Enter Weight(kg): </label>
                        <input required={true} name="weight" value={text.weight} onChange={onChangeHandler} />
                    </div>
                    <div className="input-inline">
                        <label className="text-color">Enter Height(cm): </label>
                        <input
                            required={true}
                            name="height"
                            value={text.height}
                            onChange={onChangeHandler}
                        />

                    </div>
                    <div className="input-inline">
                        <label className="text-color">Enter Date: </label>
                        <input required={true} type="date" name="date" value={text.date} onChange={onChangeHandler} />

                    </div>
                </div>
                <div className="button">
                    <button onClick={onClickHandler}>Convert</button>
                </div>

                {/* <button onClick={() => console.log(dispatch(BmiAction("pankaj")))}>Click Me</button> */}
                <div className='plot-container'>
                    <Plot

                        data={[
                            {
                                x: list1,
                                y: list2,
                                fill: 'tozeroy',
                                type: 'scatter',
                                name: 'BMI Tracker'
                            },
                            // { type: 'scatter', x: [list1], y: [list2] },

                        ]}
                        layout={
                            {
                                width: 500,
                                height: 500,
                                title: 'A Fancy Plot',
                                plot_bgcolor: '#495371',
                                paper_bgcolor: '#495371',
                                font: {
                                    // family: 'Courier New, monospace',
                                    // size: 18,
                                    color: '#fff'
                                },
                                xaxis: { title: "7 DAYS" }, yaxis: { title: "BMI" }
                            }
                        }
                    />
                </div>
            </div>

        </div>

    );
}

export default BmiConverter;
