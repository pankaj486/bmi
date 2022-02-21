



export const addTask = (data: number) => {

  return {
    type: 'ADD_BMI',
    payload: data
  }
}


export const addDate = (data: string) => {

  return {
    type: 'ADD_DATE',
    payload: data
  }
}