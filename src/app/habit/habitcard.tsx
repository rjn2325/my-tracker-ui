'use client'

type Habit ={id:number,name:string};
export const HabitCard = ({habit}:{habit:Habit}) => {

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const today=new Date().getDay();
const dayNames=days[today]

let renderDays = days.slice(0, today + 1);


return (
        <>
            <table>
                <thead>
                    
                </thead>
                
                <tbody>
                    <tr>
                        <th>
                            Habits
                        </th>

                      {
                        renderDays.map(me=>(
                            <th>
                                {me}
                            </th>
                        ))
                      }
                        
                    </tr>
                    <tr>
                        <td>
                            {habit?.name}
                        </td>
                        <td>
                            <input type="checkbox"/>
                        </td>
                        
                    </tr>
                    
                </tbody>
            </table>
        </>
    )
}

export default HabitCard;