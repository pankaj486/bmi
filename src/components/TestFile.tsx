import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask, addDate } from '../state/action-creator/BmiAction';
import Plot from 'react-plotly.js';
import "./BmiConverter.css";
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useForm, SubmitHandler } from "react-hook-form";






interface Inputs {
    height: number;
    weight: number;
    date: string;
}


const TestFile: React.FC = () => {

    const dispatch = useDispatch();

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



    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onFormSubmit: SubmitHandler<Inputs> = (text) => {

        const userHeight = text.height;
        const userWeight = text.weight;
        const heightInCm = userHeight / 100;
        const bmiConverter = Math.round(userWeight / heightInCm ** 2);
        const myDate = text.date;
        dispatch(addTask(bmiConverter));
        dispatch(addDate(myDate));
    };


    return (
        <div>
            {/* <Test /> */}

            <div >
                <h3 className="h3-text">BMI Tracker</h3>
                <form className='input' onSubmit={handleSubmit(onFormSubmit)}>
                    <div className='input-inline'>
                        <label className='text-color'>Weight(kg): </label>
                        <input placeholder='Enter Weight' type="number"  {...register("weight", { required: true })} />
                        <br />
                        <br />
                        {errors.weight && errors.weight.type === 'required' && <span style={{ color: 'white' }}>{"*Plesse Enter Your Weight"}</span>}
                    </div>
                    <div className='input-inline'>
                        <label className='text-color'>Height(cm): </label>
                        <input placeholder='Enter Height' type="number"  {...register("height", { required: true })} />
                        <br />
                        <br />
                        {errors.height && errors.height.type === 'required' && <span style={{ color: 'white' }}>{"*Please Enter your Height"}</span>}
                    </div>
                    <div className='input-inline'>
                        <label className='text-color'>Date: </label>
                        <input type="date"  {...register("date", { required: true })} />
                        <br />
                        <br />
                        {errors.date && errors.date.type === 'required' && <span style={{ color: 'white' }}>{"*Please Enter Date"}</span>}
                    </div>
                    <div className="button">
                        <button>Convert</button>
                    </div>
                </form>

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
                                xaxis: { title: "7 DAYS", tickformat: '%b,%d, %Y' }, yaxis: { title: "BMI" },
                            }
                        }
                    />
                </div>
            </div>
        </div>

    );
}

export default TestFile;
