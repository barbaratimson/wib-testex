import {Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {DisplayingDataT, ForeCastInfoT, ForeCastT} from "../Weather/Weather";
import React, {useEffect, useState} from "react";
import {theme} from "../../styles/theme";
import {Text1, Text2, Text3} from "../../styles/components";

interface GraphProps {
    data: ForeCastT[] | undefined
    getMouseValue: React.Dispatch<React.SetStateAction<any>>
    displayedValue: DisplayingDataT
}


export const Graph = ({data,displayedValue, getMouseValue}: GraphProps) => {
    const [displayingData, setDisplayingData] = useState<string>("temp")
    const handleMouseMove = (e: any) => {
            if (e.activePayload) {
                const payload = e.activePayload[0].payload;
                getMouseValue(payload)
            }
    };


    useEffect(() => {
        setDisplayingData(displayedValue)
    }, [displayedValue]);


    if (!data) return <Text2>No weather data :(</Text2>
    return (
        <ResponsiveContainer width="100%" height="100%" minWidth={650} minHeight={200}>
            <BarChart margin={{}} data={data} onMouseMove={handleMouseMove} onMouseLeave={()=>{getMouseValue(undefined)}}>
                <XAxis tick={{fill: theme.colors.text}} dataKey="dt_txt"/>
                <YAxis tick={{fill: theme.colors.text}} scale="linear"
                       domain={[(dataMin: number) => dataMin < 0 ? dataMin - 5 : dataMin, (dataMax: number) => dataMax < 0 ? dataMax + 10 : dataMax > 5 ? dataMax + 4 : dataMax+ 1]}
                />
                <CartesianGrid opacity={0.2} strokeDasharray="3 3"/>
                <Tooltip contentStyle={{display:"none"}}/>
                <Bar type="monotone" dataKey={`${displayingData}`} stroke="#8884d8" fill="#8884d8"
                     fillOpacity={1}/>
            </BarChart>
        </ResponsiveContainer>
    );
};
