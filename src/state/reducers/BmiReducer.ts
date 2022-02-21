interface AuthInitialState {
  bmiData: number[];
  bmiDate: string[];
}

export const INITIAL_STATE: AuthInitialState = {
  bmiData: [],
  bmiDate: []
};



export default (tasks: AuthInitialState = INITIAL_STATE, action: any) => {

  if (action.type === 'ADD_BMI') {
    return { ...tasks, bmiData: [...tasks.bmiData, action.payload] };
  }
  if (action.type === 'ADD_DATE') {
    return { ...tasks, bmiDate: [...tasks.bmiDate, action.payload] };
  }
  return tasks;
}